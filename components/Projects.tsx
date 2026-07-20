"use client";

import { useActiveSectionView } from '@/hooks/hooks';
import { projectsData } from '@/lib/data';
import { motion, MotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';
import { FiArrowUpRight } from "react-icons/fi";
import { SectionHeading } from './section-heading';

type Project = (typeof projectsData)[number];

const EASE = [0.22, 1, 0.36, 1] as const;
const SCALE_STEP = 0.035; // how much buried cards shrink
const STAGGER = 18; // px each card peeks above the next (capped at 3 deep)

const Card = ({
    project,
    i,
    total,
    progress,
}: {
    project: Project;
    i: number;
    total: number;
    progress: MotionValue<number>;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // inner image gently settles as the card scrolls into view
    const { scrollYProgress: entry } = useScroll({
        target: cardRef,
        offset: ["start end", "start start"],
    });
    const imageScale = useTransform(entry, [0, 1], [1.2, 1]);

    // once the next cards pile on top, this one scales back and fades into the page
    const targetScale = 1 - (total - 1 - i) * SCALE_STEP;
    const range: [number, number] = [i / total, 1];
    const scale = useTransform(progress, range, [1, targetScale]);
    const fade = useTransform(progress, range, [0, 0.6]);

    return (
        <div
            ref={cardRef}
            className="sticky top-0 flex h-screen items-start justify-center pt-[8vh]"
        >
            <motion.a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                style={{ scale, marginTop: Math.min(i, 3) * STAGGER }}
                className="group relative flex h-[78vh] max-h-[720px] w-full origin-top overflow-hidden rounded-[2rem] border border-ink/10 bg-surface shadow-[0_24px_70px_-24px_rgb(var(--ink)/0.45)] will-change-transform"
            >
                {/* image — fills the left half edge to edge */}
                <div className="relative h-full w-[52%] shrink-0 overflow-hidden border-r border-ink/10">
                    <motion.div style={{ scale: imageScale }} className="absolute inset-0 will-change-transform">
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            quality={95}
                            sizes="600px"
                            className="object-cover object-top"
                        />
                    </motion.div>
                    <span className="absolute left-5 top-5 rounded-full bg-ink/85 px-3.5 py-1.5 text-xs font-bold tracking-[0.25em] text-surface backdrop-blur-sm">
                        {String(i + 1).padStart(2, "0")}
                    </span>
                </div>

                {/* content */}
                <div className="relative flex flex-1 flex-col justify-center p-10 xl:p-14">
                    {/* ghost index */}
                    <span className="pointer-events-none absolute -bottom-6 right-4 select-none text-[9rem] font-black leading-none text-ink/[0.05] xl:text-[11rem]">
                        {String(i + 1).padStart(2, "0")}
                    </span>

                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gold">
                        {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} — featured work
                    </p>
                    <h3 className="text-4xl font-black tracking-tight text-ink xl:text-5xl">
                        {project.title}
                    </h3>
                    <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink/65 xl:text-base">
                        {project.description}
                    </p>
                    <div className="mt-6 flex max-w-md flex-wrap gap-2">
                        {project.tags.map((t, ti) => (
                            <span
                                key={ti}
                                className="rounded-full border border-ink/10 bg-ink/[0.04] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-ink/60"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                    <span className="mt-9 inline-flex w-fit items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-bold text-ink transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-[#1c1c1c]">
                        View project
                        <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                </div>

                {/* fade buried cards toward the page background */}
                <motion.div
                    style={{ opacity: fade }}
                    className="pointer-events-none absolute inset-0 z-10 bg-surface"
                />
            </motion.a>
        </div>
    );
};

const Projects = () => {
    const { ref } = useActiveSectionView("Projects", 0.1);
    const stackRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: stackRef,
        offset: ["start start", "end end"],
    });
    // spring-smoothed scrub so the stack feels fluid, not 1:1 raw
    const progress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <section ref={ref} id="projects" className="w-full max-w-[1100px] scroll-mt-28 px-4">
            <SectionHeading index="02" kicker="work">projects</SectionHeading>

            {/* ---------- Desktop: scroll-pinned stacked cards ---------- */}
            <div ref={stackRef} className="relative hidden lg:block">
                {projectsData.map((project, i) => (
                    <Card
                        key={i}
                        project={project}
                        i={i}
                        total={projectsData.length}
                        progress={progress}
                    />
                ))}
            </div>

            {/* ---------- Mobile: simple full-color cards ---------- */}
            <div className="flex flex-col gap-6 lg:hidden">
                {projectsData.map((project, i) => (
                    <motion.a
                        key={i}
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
                            <Image src={project.imageUrl} alt={project.title} fill quality={95} sizes="(max-width: 1024px) calc(100vw - 2rem), 600px" className="object-cover" />
                        </div>
                        <div className="p-6">
                            <div className="mb-2 flex items-center gap-3">
                                <span className="text-xs font-bold tracking-[0.2em] text-gold">{String(i + 1).padStart(2, "0")}</span>
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
        </section>
    );
};

export default Projects;
