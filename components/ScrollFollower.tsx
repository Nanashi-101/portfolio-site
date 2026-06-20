"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollFollower() {
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
    const top = useTransform(progress, [0, 1], ["0%", "100%"]);
    const fill = useTransform(progress, [0, 1], ["0%", "100%"]);

    return (
        <div className="pointer-events-none fixed right-6 top-1/2 z-40 hidden h-[40vh] -translate-y-1/2 lg:block">
            <div className="relative h-full w-px bg-ink/15">
                <motion.div style={{ height: fill }} className="absolute left-0 top-0 w-px bg-gold" />
                <motion.div style={{ top }} className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="block h-3 w-3 rounded-full bg-gold shadow-[0_0_0_5px_rgba(208,160,58,0.22)]" />
                </motion.div>
            </div>
        </div>
    );
}
