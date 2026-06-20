"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollProgress = () => {
    const barRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const bar = barRef.current;
        if (!bar) return;
        const tween = gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
                scaleX: 1,
                ease: "none",
                scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
            }
        );
        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, []);
    return (
        <div
            ref={barRef}
            className="fixed left-0 top-0 z-[1000] h-[3px] w-full origin-left bg-gold"
            style={{ transform: "scaleX(0)" }}
            aria-hidden
        />
    );
};

export default ScrollProgress;
