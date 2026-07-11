"use client";

import { useActiveSectionView } from '@/hooks/hooks';
import { projectsData } from '@/lib/data';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';
import { FiArrowUpRight } from "react-icons/fi";
import { SectionHeading } from './section-heading';

type Project = (typeof projectsData)[number];

const CARD_STAGGER = 28; // px each card peeks above the next one
const SCALE_STEP = 0.045; // how much buried cards shrink

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

    // inner image zooms out as the card scrolls into view
    const { scrollYProgress: entry } = useScroll({
        target: cardRef,
        offset: ["start end", "start start"],
    });
    const imageScale = useTransform(entry, [0, 1], [1.35, 1]);

    // once the next cards pile on top, this one scales back and dims
    const targetScale = 1 - (total - 1 - i) * SCALE_STEP;
    const range: [number, number] = [i / total, 1];
    const scale = useTransform(progress, range, [1, targetScale]);
    const dim = useTransform(progress, range, [0, 0.35]);

    return (
        <div
            ref={cardRef}
            className="sticky flex h-screen items-center justify-center"
            style={{ top: 0 }}
        >
            <motion.div
                style={{ scale, top: `calc(-6vh + ${i * CARD_STAGGER}px)` }}
                className="relative flex h-[min(620px,78vh)] w-full max-w-[1000px] origin-top flex-col overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-2xl md:h-[500px] md:flex-row"
            >
                {/* image */}
                <div className="relative h-[42%] w-full shrink-0 overflow-hidden md:h-full md:w-[48%]">
                    <motion.div style={{ scale: imageScale }} className="absolute inset-0">
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 480px"
                            className="object-cover"
                        />
                    </motion.div>
                    <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold tracking-[0.2em] text-surface">
                        {String(i + 1).padStart(2, "0")}
                    </span>
                </div>

                {/* content */}
                <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 md:p-10">
                    <h3 className="text-2xl font-black tracking-tight text-ink sm:text-3xl md:text-4xl">
                        {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/65 sm:mt-4 sm:text-base">
                        {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 sm:mt-6">
                        {project.tags.map((t, ti) => (
                            <span
                                key={ti}
                                className="rounded-md border border-ink/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-ink/55"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                    <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover
                        className="group mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-gold sm:mt-8"
                    >
                        View project
                        <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:rotate-45" />
                    </a>
                </div>

                {/* dim overlay while buried under the next card */}
                <motion.div
                    style={{ opacity: dim }}
                    className="pointer-events-none absolute inset-0 bg-ink/60"
                />
            </motion.div>
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

    return (
        <section ref={ref} id="projects" className="w-full max-w-[1100px] scroll-mt-28 px-4">
            <SectionHeading index="02" kicker="work">projects</SectionHeading>

            <div ref={stackRef} className="relative">
                {projectsData.map((project, i) => (
                    <Card
                        key={i}
                        project={project}
                        i={i}
                        total={projectsData.length}
                        progress={scrollYProgress}
                    />
                ))}
            </div>
        </section>
    );
};

export default Projects;
