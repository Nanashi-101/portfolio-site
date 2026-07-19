"use client";

import ArrowButton from "@/components/common/ArrowButton";
import { usePageTransition } from "@/components/transition/PageTransition";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const phrase =
    "I build clean, minimal and high-performance web experiences — combining design sensibility with full-stack engineering to help ideas stand out on the web.";

const slideUp = {
    initial: { y: "100%" },
    open: (i: number) => ({
        y: "0%",
        transition: { duration: 0.5, delay: 0.012 * i, ease: [0.33, 1, 0.68, 1] },
    }),
    closed: { y: "100%", transition: { duration: 0.4 } },
};

const opacity = {
    initial: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
    closed: { opacity: 0, transition: { duration: 0.4 } },
};

export default function Description() {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-15% 0px" });
    const { navigate } = usePageTransition();

    return (
        <section
            id="description"
            ref={ref}
            className="w-full max-w-[1240px] scroll-mt-28 px-4 py-16 sm:py-24"
        >
            <div className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
                <p className="flex flex-wrap justify-center text-[1.6rem] font-medium leading-[1.3] text-ink sm:text-[2.2rem]">
                    {phrase.split(" ").map((word, index) => (
                        <span key={index} className="relative mr-2 inline-flex overflow-hidden">
                            <motion.span
                                variants={slideUp}
                                custom={index}
                                initial="initial"
                                animate={isInView ? "open" : "closed"}
                                className="inline-block"
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </p>

                <motion.div
                    variants={opacity}
                    initial="initial"
                    animate={isInView ? "open" : "closed"}
                    className="mt-10 flex flex-col items-center gap-8"
                >
                    <p className="max-w-md text-[0.95rem] leading-relaxed text-ink/60">
                        The mix of my passion for design, code &amp; interaction puts me in a
                        unique place in the web world.
                    </p>
                    <ArrowButton onClick={() => navigate("/about", "about")} aria-label="About me">
                        about me
                    </ArrowButton>
                </motion.div>
            </div>
        </section>
    );
}
