"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorGlow() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const fine = window.matchMedia("(pointer: fine)").matches;
        gsap.set(el, { xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3" });

        let pastHero = false;
        let mx = window.innerWidth / 2;
        let my = window.innerHeight * 0.16;

        const staticTarget = () => ({ x: window.innerWidth / 2, y: window.innerHeight * 0.16 });

        const apply = () => {
            if (pastHero && fine) { xTo(mx); yTo(my); }
            else { const s = staticTarget(); xTo(s.x); yTo(s.y); }
        };

        const onMove = (e: MouseEvent) => {
            mx = e.clientX; my = e.clientY;
            if (pastHero && fine) apply();
        };
        const onScroll = () => {
            const home = document.getElementById("home");
            const past = home
                ? home.getBoundingClientRect().bottom < window.innerHeight * 0.5
                : window.scrollY > window.innerHeight * 0.6;
            if (past !== pastHero) { pastHero = past; apply(); }
        };

        apply();
        onScroll();
        window.addEventListener("mousemove", onMove);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", apply);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", apply);
        };
    }, []);

    return (
        <div
            ref={ref}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 -z-10 h-[58vh] w-[58vh] rounded-full bg-gold/[0.13] blur-[120px]"
        />
    );
}
