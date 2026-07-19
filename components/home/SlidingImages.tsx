"use client";

import { projectsData } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const colors1 = ["#e3e5e7", "#d6d7dc", "#e3e3e3", "#21242b"];
const colors2 = ["#d4e3ec", "#e5e0e1", "#d7d4cf", "#e1dad6"];

/**
 * Two rows of project cards translating in opposite directions on scroll,
 * followed by a curve that flattens as it scrolls — bridging into the dark footer.
 */
export default function SlidingImages() {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"],
    });

    const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

    const row1 = projectsData.slice(0, 4);
    const row2 = projectsData.slice(4, 8);

    return (
        <section
            ref={container}
            aria-label="Project gallery"
            className="relative z-[1] flex w-full flex-col gap-[3vw] overflow-hidden bg-surface pt-10 sm:pt-16"
        >
            <motion.div style={{ x: x1 }} className="relative left-[-10vw] flex w-[120vw] gap-[3vw]">
                {row1.map((project, i) => (
                    <div
                        key={project.title}
                        style={{ backgroundColor: colors1[i] }}
                        className="flex h-[38vw] w-1/4 shrink-0 items-center justify-center sm:h-[17vw]"
                    >
                        <div className="relative h-[72%] w-[78%]">
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                sizes="25vw"
                                className="object-cover object-top shadow-lg"
                            />
                        </div>
                    </div>
                ))}
            </motion.div>

            <motion.div style={{ x: x2 }} className="relative left-[-10vw] flex w-[120vw] gap-[3vw]">
                {row2.map((project, i) => (
                    <div
                        key={project.title}
                        style={{ backgroundColor: colors2[i] }}
                        className="flex h-[38vw] w-1/4 shrink-0 items-center justify-center sm:h-[17vw]"
                    >
                        <div className="relative h-[72%] w-[78%]">
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                sizes="25vw"
                                className="object-cover object-top shadow-lg"
                            />
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* curve that flattens on scroll */}
            <motion.div style={{ height }} className="relative mt-16 sm:mt-24">
                <div className="absolute left-[-10%] z-[1] h-[1550%] w-[120%] rounded-b-[50%] bg-surface shadow-[0_60px_50px_rgba(0,0,0,0.35)]" />
            </motion.div>
        </section>
    );
}
