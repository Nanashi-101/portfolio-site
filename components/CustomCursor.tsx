"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [enabled, setEnabled] = useState(false);

    // Enable only on large screens with a precise pointer (no touch / mobile view)
    useEffect(() => {
        if (typeof window === "undefined") return;
        const mql = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
        const update = () => setEnabled(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (!enabled) {
            document.documentElement.classList.remove("cursor-none");
            return;
        }
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        document.documentElement.classList.add("cursor-none");
        gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

        const dx = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
        const dy = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
        const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
        const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

        let shownState = false;
        let hovering = false;

        const move = (e: MouseEvent) => {
            if (!shownState) { gsap.to([dot, ring], { opacity: 1, duration: 0.25 }); shownState = true; }
            dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
            const interactive = !!(e.target as HTMLElement)?.closest?.(
                "a, button, input, textarea, [data-cursor-hover]"
            );
            if (interactive !== hovering) {
                hovering = interactive;
                gsap.to(ring, { scale: interactive ? 1.9 : 1, duration: 0.3, ease: "power3" });
                gsap.to(dot, { scale: interactive ? 0.4 : 1, duration: 0.3, ease: "power3" });
            }
        };
        const leave = () => { gsap.to([dot, ring], { opacity: 0, duration: 0.2 }); shownState = false; };
        const down = () => gsap.to(ring, { scale: hovering ? 1.5 : 0.8, duration: 0.2 });
        const up = () => gsap.to(ring, { scale: hovering ? 1.9 : 1, duration: 0.2 });

        window.addEventListener("mousemove", move);
        document.addEventListener("mouseleave", leave);
        window.addEventListener("mousedown", down);
        window.addEventListener("mouseup", up);

        return () => {
            window.removeEventListener("mousemove", move);
            document.removeEventListener("mouseleave", leave);
            window.removeEventListener("mousedown", down);
            window.removeEventListener("mouseup", up);
            document.documentElement.classList.remove("cursor-none");
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <>
            <div ref={ringRef} className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border border-gold" />
            <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-gold" />
        </>
    );
}
