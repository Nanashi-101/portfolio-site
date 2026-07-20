"use client";

import ArrowButton from "@/components/common/ArrowButton";
import { usePageTransition } from "@/components/transition/PageTransition";
import { useActiveSectionView } from "@/hooks/hooks";
import { projectsData } from "@/lib/data";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiGrid, FiList } from "react-icons/fi";

type Project = (typeof projectsData)[number];
type ViewMode = "list" | "grid";

const previewColors = [
    "#e3e5e7", "#d6d7dc", "#e3e3e3", "#21242b", "#d4e3ec",
    "#e5e0e1", "#d7d4cf", "#e1dad6", "#dce4d7", "#e0d8c9",
];

const PREVIEW_W = 420;
const PREVIEW_H = 340;
const CURSOR_SIZE = 104;

const EASE = [0.22, 1, 0.36, 1] as const;

const popIn = {
    initial: { scale: 0, opacity: 0 },
    enter: { scale: 1, opacity: 1, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
    closed: { scale: 0, opacity: 0, transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } },
};

export default function RecentWork({
    projects = projectsData.slice(0, 4) as unknown as Project[],
    kicker = "recent work",
    heading,
    showMore = false,
    id = "recent-work",
}: {
    projects?: Project[];
    kicker?: string;
    heading?: React.ReactNode;
    showMore?: boolean;
    id?: string;
}) {
    const { ref } = useActiveSectionView("Projects", 0.1);
    const { navigate } = usePageTransition();
    const [modal, setModal] = useState({ active: false, index: 0 });
    const [view, setView] = useState<ViewMode>("list");
    const container = useRef<HTMLDivElement>(null);
    const hasEntered = useRef(false);

    // restore the user's last-used view
    useEffect(() => {
        const saved = window.localStorage.getItem("work-view");
        if (saved === "list" || saved === "grid") setView(saved);
    }, []);

    const pickView = (v: ViewMode) => {
        setView(v);
        setModal({ active: false, index: 0 });
        hasEntered.current = false;
        window.localStorage.setItem("work-view", v);
    };

    // --- cursor tracking -------------------------------------------------
    // Raw viewport coords -> fixed positioning, so no getBoundingClientRect()
    // on every frame (that was forcing a layout reflow each mousemove).
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);

    // Heavier spring for the preview panel, snappier one for the label.
    const modalX = useSpring(rawX, { stiffness: 160, damping: 24, mass: 0.7, restDelta: 0.01 });
    const modalY = useSpring(rawY, { stiffness: 160, damping: 24, mass: 0.7, restDelta: 0.01 });
    const cursorX = useSpring(rawX, { stiffness: 340, damping: 30, mass: 0.45, restDelta: 0.01 });
    const cursorY = useSpring(rawY, { stiffness: 340, damping: 30, mass: 0.45, restDelta: 0.01 });

    // rAF-coalesced writes: multiple pointer events per frame collapse to one.
    const pending = useRef<{ x: number; y: number } | null>(null);
    const frame = useRef<number | null>(null);
    const lastPointer = useRef<{ x: number; y: number } | null>(null);

    const flush = useCallback(() => {
        frame.current = null;
        const p = pending.current;
        if (!p) return;
        rawX.set(p.x);
        rawY.set(p.y);
    }, [rawX, rawY]);

    const onMove = useCallback(
        (e: React.PointerEvent) => {
            lastPointer.current = { x: e.clientX, y: e.clientY };
            pending.current = { x: e.clientX, y: e.clientY };
            if (frame.current === null) frame.current = requestAnimationFrame(flush);
        },
        [flush]
    );

    useEffect(() => {
        return () => {
            if (frame.current !== null) cancelAnimationFrame(frame.current);
        };
    }, []);

    // Smooth scrolling moves the list out from under a stationary cursor without
    // ever firing pointerleave, and scroll events are unreliable to hook (native
    // vs. Lenis vs. wheel). So while the overlay is open, poll each frame and
    // drop it as soon as the cursor is no longer inside the list's bounds.
    useEffect(() => {
        if (!modal.active) return;

        let raf = 0;
        const tick = () => {
            raf = requestAnimationFrame(tick);
            const el = container.current;
            const p = lastPointer.current;
            if (!el || !p) {
                closeAll();
                return;
            }
            const r = el.getBoundingClientRect();
            const inside =
                p.x >= r.left && p.x <= r.right && p.y >= r.top && p.y <= r.bottom;
            if (!inside) closeAll();
        };
        raf = requestAnimationFrame(tick);

        window.addEventListener("blur", closeAll);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("blur", closeAll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal.active]);

    // Teleport the springs to the cursor the first time we enter, otherwise
    // the panel visibly flies in from wherever it was left last time.
    const snapTo = (x: number, y: number) => {
        rawX.set(x);
        rawY.set(y);
        if (!hasEntered.current) {
            modalX.jump(x);
            modalY.jump(y);
            cursorX.jump(x);
            cursorY.jump(y);
            hasEntered.current = true;
        }
    };

    const openAt = (e: React.PointerEvent, index: number) => {
        snapTo(e.clientX, e.clientY);
        setModal({ active: true, index });
    };

    const closeAll = () => {
        setModal((m) => ({ ...m, active: false }));
        hasEntered.current = false;
    };

    const showOverlay = modal.active;

    return (
        <section ref={ref} id={id} className="w-full max-w-[1240px] scroll-mt-28 px-4 py-16 sm:py-24">
            <div className="mb-10 flex flex-wrap items-center gap-4 sm:mb-14">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-gold">
                    <span className="h-px w-10 bg-gold/50" />
                    {kicker}
                </div>

                {/* view switcher — desktop only, mobile always uses cards */}
                <div className="ml-auto hidden lg:block">
                    <div className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-white/40 p-1 backdrop-blur-sm dark:bg-white/[0.04]">
                        {([
                            { key: "list" as const, label: "list", Icon: FiList },
                            { key: "grid" as const, label: "tiles", Icon: FiGrid },
                        ]).map(({ key, label, Icon }) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => pickView(key)}
                                aria-pressed={view === key}
                                data-cursor-hover
                                className="relative rounded-full px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-200"
                            >
                                {view === key && (
                                    <motion.span
                                        layoutId={`work-view-pill-${id}`}
                                        className="absolute inset-0 rounded-full bg-gold"
                                        transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.6 }}
                                    />
                                )}
                                <span
                                    className={`relative z-10 flex items-center gap-2 ${
                                        view === key ? "text-[#1c1c1c]" : "text-ink/55 hover:text-ink/80"
                                    }`}
                                >
                                    <Icon className="text-sm" />
                                    {label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {heading}

            {/* ---------- Desktop ---------- */}
            <div className="hidden lg:block">
                <AnimatePresence mode="wait" initial={false}>
                    {view === "list" ? (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            ref={container}
                            onPointerMove={onMove}
                            onPointerLeave={closeAll}
                            className="relative"
                        >
                            {projects.map((project, index) => {
                                const dimmed = modal.active && modal.index !== index;
                                return (
                                    <a
                                        key={project.title}
                                        href={project.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-cursor-hover
                                        onPointerEnter={(e) => openAt(e, index)}
                                        className="group flex w-full items-center justify-between border-t border-ink/15 px-6 py-[2.6vw] last:border-b"
                                        style={{
                                            opacity: dimmed ? 0.28 : 1,
                                            transition: "opacity 420ms cubic-bezier(0.22,1,0.36,1)",
                                        }}
                                    >
                                        <h3 className="text-5xl font-medium tracking-tight text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:-translate-x-2 xl:text-6xl">
                                            {project.title}
                                        </h3>
                                        <p className="text-right text-sm font-light text-ink/60 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:translate-x-2">
                                            {project.tags.slice(0, 2).join(" & ")}
                                        </p>
                                    </a>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="grid grid-cols-2 gap-6 xl:gap-8"
                        >
                            {projects.map((project, i) => (
                                <motion.a
                                    key={project.title}
                                    href={project.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cursor-hover
                                    initial={{ opacity: 0, y: 22 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
                                    className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white/50 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)] dark:bg-white/[0.04]"
                                >
                                    <div
                                        className="relative aspect-[16/10] w-full overflow-hidden"
                                        style={{ backgroundColor: previewColors[i % previewColors.length] }}
                                    >
                                        <Image
                                            src={project.imageUrl}
                                            alt={`${project.title} project screenshot`}
                                            fill
                                            quality={95}
                                            sizes="(max-width: 1280px) 46vw, 600px"
                                            className="object-cover object-top transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.04]"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-2 flex items-center gap-3">
                                            <span className="text-xs font-bold tracking-[0.2em] text-gold">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <h3 className="text-2xl font-medium tracking-tight text-ink">
                                                {project.title}
                                            </h3>
                                            <FiArrowUpRight className="ml-auto text-xl text-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        </div>
                                        <p className="line-clamp-2 text-sm leading-relaxed text-ink/65">
                                            {project.description}
                                        </p>
                                        <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink/45">
                                            {project.tags.slice(0, 4).join(" · ")}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ---------- Floating preview + cursor label (fixed => transform only) ---------- */}
            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        key="preview"
                        style={{
                            x: modalX,
                            y: modalY,
                            width: PREVIEW_W,
                            height: PREVIEW_H,
                            willChange: "transform",
                        }}
                        className="pointer-events-none fixed left-0 top-0 z-[60] hidden lg:block"
                    >
                        <motion.div
                            variants={popIn}
                            initial="initial"
                            animate="enter"
                            exit="closed"
                            style={{ x: "-50%", y: "-50%", willChange: "transform, opacity" }}
                            className="h-full w-full overflow-hidden rounded-lg shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)]"
                        >
                            <motion.div
                                animate={{ y: `${modal.index * -100}%` }}
                                transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                                style={{ willChange: "transform" }}
                                className="h-full w-full"
                            >
                                {projects.map((project, i) => (
                                    <div
                                        key={`preview-${i}`}
                                        style={{ backgroundColor: previewColors[i % previewColors.length] }}
                                        className="flex h-full w-full items-center justify-center"
                                    >
                                        <Image
                                            src={project.imageUrl}
                                            alt={`${project.title} project screenshot`}
                                            width={860}
                                            height={480}
                                            quality={95}
                                            sizes="420px"
                                            className="h-auto w-[82%] shadow-xl"
                                        />
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}

                {showOverlay && (
                    <motion.div
                        key="cursor"
                        style={{
                            x: cursorX,
                            y: cursorY,
                            width: CURSOR_SIZE,
                            height: CURSOR_SIZE,
                            willChange: "transform",
                        }}
                        className="pointer-events-none fixed left-0 top-0 z-[70] hidden lg:block"
                    >
                        <motion.div
                            variants={popIn}
                            initial="initial"
                            animate="enter"
                            exit="closed"
                            style={{ x: "-50%", y: "-50%", willChange: "transform, opacity" }}
                            className="flex h-full w-full items-center justify-center rounded-full bg-gold text-[0.95rem] font-medium tracking-wide text-[#1c1c1c]"
                        >
                            view
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ---------- Mobile / tablet: simple cards ---------- */}
            <div className="flex flex-col gap-6 lg:hidden">
                {projects.map((project, i) => (
                    <motion.a
                        key={project.title}
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden rounded-2xl border border-ink/10 bg-white/55 dark:bg-white/[0.04]"
                    >
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image src={project.imageUrl} alt={`${project.title} project screenshot`} fill quality={95} sizes="(max-width: 1024px) calc(100vw - 2rem), 580px" className="object-cover object-top" />
                        </div>
                        <div className="p-6">
                            <div className="mb-2 flex items-center gap-3">
                                <span className="text-xs font-bold tracking-[0.2em] text-gold">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="text-xl font-bold tracking-tight text-ink">{project.title}</h3>
                                <FiArrowUpRight className="ml-auto text-xl text-gold" />
                            </div>
                            <p className="text-sm leading-relaxed text-ink/65">{project.description}</p>
                            <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink/45">
                                {project.tags.slice(0, 4).join(" · ")}
                            </p>
                        </div>
                    </motion.a>
                ))}
            </div>

            {showMore && (
                <div className="mt-14 flex justify-center">
                    <ArrowButton
                        size="lg"
                        onClick={() => navigate("/work", "work")}
                        role="link"
                        aria-label="See all work"
                    >
                        more work <sup className="font-bold">{projectsData.length}</sup>
                    </ArrowButton>
                </div>
            )}
        </section>
    );
}
