"use client";

import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from "framer-motion";
import { useRef } from "react";

/** Wraps a value between min and max (for the infinite loop). */
const wrap = (min: number, max: number, v: number) => {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
};

/**
 * Giant name marquee whose direction & speed react to scroll velocity —
 * scrolling down pushes the text left, scrolling up pushes it right.
 */
export default function HeroMarquee({
    text = "Soumyadip Sanyal",
    baseVelocity = -1.6,
    textClass = "text-[15vw] sm:text-[11vw]",
}: {
    text?: string;
    baseVelocity?: number;
    textClass?: string;
}) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
        const vf = velocityFactor.get();
        if (vf < 0) directionFactor.current = -1;
        else if (vf > 0) directionFactor.current = 1;
        moveBy += moveBy * Math.abs(vf);
        baseX.set(baseX.get() + moveBy);
    });

    // 4 copies → shift by 25% per copy
    const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

    return (
        <div className="pointer-events-none w-full overflow-hidden whitespace-nowrap">
            <motion.div style={{ x }} className="flex w-max">
                {[...Array(4)].map((_, i) => (
                    <span
                        key={i}
                        aria-hidden={i > 0}
                        className={`pr-10 font-black lowercase leading-[0.85] tracking-tighter text-ink opacity-[0.28] ${textClass}`}
                    >
                        {text}
                        <span className="text-gold"> — </span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
