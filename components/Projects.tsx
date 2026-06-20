"use client";

import { useActiveSectionView } from '@/hooks/hooks';
import { projectsData } from '@/lib/data';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { FiArrowUpRight } from "react-icons/fi";
import { SectionHeading } from './section-heading';

const EASE = [0.22, 1, 0.36, 1] as const;

const Projects = () => {
    const { ref } = useActiveSectionView("Projects", 0.2);
    const [active, setActive] = useState<number | null>(null);
    const [shown, setShown] = useState(0);

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const x = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.4 });
    const y = useSpring(my, { stiffness: 220, damping: 26, mass: 0.4 });

    const handleMove = (e: React.MouseEvent) => {
        mx.set(e.clientX + 32);
        my.set(e.clientY - 190);
    };

    const preview = projectsData[shown];

    return (
        <section ref={ref} id="projects" className="w-full max-w-[1100px] scroll-mt-28 px-4">
            <SectionHeading index="02" kicker="work">projects</SectionHeading>

            {/* ---------- Desktop: editorial hover list + detailed preview ---------- */}
            <div className="relative hidden lg:block" onMouseMove={handleMove} onMouseLeave={() => setActive(null)}>
                {/* floating preview card */}
                <motion.div
                    style={{ x, y }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: active !== null ? 1 : 0, scale: active !== null ? 1 : 0.85 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="pointer-events-none fixed left-0 top-0 z-30 w-[27rem] overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-2xl"
                >
                    <div className="relative h-52 w-full overflow-hidden">
                        {projectsData.map((p, i) => (
                            <Image
                                key={i}
                                src={p.imageUrl}
                                alt={p.title}
                                fill
                                sizes="432px"
                                className={`object-cover transition-opacity duration-300 ${shown === i ? "opacity-100" : "opacity-0"}`}
                            />
                        ))}
                        <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold tracking-[0.2em] text-surface">
                            {String(shown + 1).padStart(2, "0")}
                        </span>
                    </div>
                    <div className="p-6">
                        <h4 className="text-xl font-bold tracking-tight text-ink">{preview.title}</h4>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/65">{preview.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {preview.tags.slice(0, 5).map((t, ti) => (
                                <span key={ti} className="rounded-md border border-ink/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-ink/55">
                                    {t}
                                </span>
                            ))}
                        </div>
                        <div className="mt-5 flex items-center gap-2 text-sm font-bold text-gold">
                            View project <FiArrowUpRight />
                        </div>
                    </div>
                </motion.div>

                <ul>
                    {projectsData.map((project, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                            onMouseEnter={() => { setActive(i); setShown(i); }}
                        >
                            <a
                                href={project.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor-hover
                                className="group flex items-center justify-between gap-8 border-b border-ink/10 py-7"
                            >
                                <div className="flex items-baseline gap-6">
                                    <span className="text-sm font-bold tracking-[0.2em] text-gold">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="text-4xl font-black tracking-tight text-ink/75 transition-all duration-300 group-hover:translate-x-3 group-hover:text-gold">
                                        {project.title}
                                    </h3>
                                </div>
                                <div className="flex shrink-0 items-center gap-6">
                                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
                                        {project.tags.slice(0, 3).join(" · ")}
                                    </span>
                                    <FiArrowUpRight className="text-3xl text-ink/35 transition-all duration-300 group-hover:rotate-45 group-hover:text-gold" />
                                </div>
                            </a>
                        </motion.li>
                    ))}
                </ul>
            </div>

            {/* ---------- Mobile: full-color cards ---------- */}
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
                            <Image src={project.imageUrl} alt={project.title} fill sizes="100vw" className="object-cover" />
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
