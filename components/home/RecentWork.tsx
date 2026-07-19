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
import { useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

type Project = (typeof projectsData)[number];

const previewColors = [
    "#e3e5e7", "#d6d7dc", "#e3e3e3", "#21242b", "#d4e3ec",
    "#e5e0e1", "#d7d4cf", "#e1dad6", "#dce4d7", "#e0d8c9",
];

const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
    closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } },
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
    const container = useRef<HTMLDivElement>(null);

    // cursor-follow springs — modal is slower/heavier, cursor label snappier
    const modalX = useSpring(useMotionValue(0), { stiffness: 220, damping: 32, mass: 0.6 });
    const modalY = useSpring(useMotionValue(0), { stiffness: 220, damping: 32, mass: 0.6 });
    const cursorX = useSpring(useMotionValue(0), { stiffness: 300, damping: 25, mass: 0.4 });
    const cursorY = useSpring(useMotionValue(0), { stiffness: 300, damping: 25, mass: 0.4 });

    const onMove = (e: React.MouseEvent) => {
        const rect = container.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        modalX.set(x);
        modalY.set(y);
        cursorX.set(x);
        cursorY.set(y);
    };

    return (
        <section ref={ref} id={id} className="w-full max-w-[1240px] scroll-mt-28 px-4 py-16 sm:py-24">
            <div className="mb-10 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-gold sm:mb-14">
                <span className="h-px w-10 bg-gold/50" />
                {kicker}
            </div>
            {heading}

            {/* ---------- Desktop: hover list with floating preview ---------- */}
            <div
                ref={container}
                onMouseMove={onMove}
                className="relative hidden lg:block"
            >
                {projects.map((project, index) => (
                    <a
                        key={project.title}
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover
                        onMouseEnter={() => setModal({ active: true, index })}
                        onMouseLeave={() => setModal((m) => ({ ...m, active: false }))}
                        className={`group flex w-full items-center justify-between border-t border-ink/15 px-6 py-[2.6vw] transition-all duration-300 last:border-b hover:opacity-100 ${
                            modal.active && modal.index !== index ? "opacity-30" : "opacity-100"
                        }`}
                    >
                        <h3 className="text-5xl font-medium tracking-tight text-ink transition-transform duration-300 group-hover:-translate-x-2 xl:text-6xl">
                            {project.title}
                        </h3>
                        <p className="text-right text-sm font-light text-ink/60 transition-transform duration-300 group-hover:translate-x-2">
                            {project.tags.slice(0, 2).join(" & ")}
                        </p>
                    </a>
                ))}

                {/* floating preview window */}
                <AnimatePresence>
                    {modal.active && (
                        <motion.div
                            variants={scaleAnimation}
                            initial="initial"
                            animate="enter"
                            exit="closed"
                            style={{ left: modalX, top: modalY }}
                            className="pointer-events-none absolute z-30 h-[320px] w-[380px] overflow-hidden xl:h-[350px] xl:w-[420px]"
                        >
                            <div
                                style={{ top: `${modal.index * -100}%` }}
                                className="relative h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
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
                                            width={340}
                                            height={260}
                                            className="h-auto w-[82%] shadow-xl"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* trailing "view" cursor label */}
                <AnimatePresence>
                    {modal.active && (
                        <motion.div
                            variants={scaleAnimation}
                            initial="initial"
                            animate="enter"
                            exit="closed"
                            style={{ left: cursorX, top: cursorY }}
                            className="pointer-events-none absolute z-40 flex h-20 w-20 items-center justify-center rounded-full bg-gold text-sm font-medium text-[#1c1c1c]"
                        >
                            view
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

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
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden rounded-2xl border border-ink/10 bg-white/55 dark:bg-white/[0.04]"
                    >
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image src={project.imageUrl} alt={`${project.title} project screenshot`} fill sizes="(max-width: 1024px) calc(100vw - 2rem), 580px" className="object-cover object-top" />
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
