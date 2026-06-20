"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

        // Always begin at the top on (re)load so scroll-triggered reveals fire in order
        if ("scrollRestoration" in history) history.scrollRestoration = "manual";
        lenis.scrollTo(0, { immediate: true });
        lenis.on("scroll", ScrollTrigger.update);

        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        // smooth in-page anchor navigation (for links outside the nav)
        const onClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
            if (!anchor || anchor.dataset.navHandled) return;
            const hash = anchor.getAttribute("href");
            if (!hash || hash.length < 2) return;
            const el = document.querySelector(hash);
            if (el) {
                e.preventDefault();
                lenis.scrollTo(el as HTMLElement, { offset: -72 });
            }
        };
        document.addEventListener("click", onClick);

        const refresh = setTimeout(() => ScrollTrigger.refresh(), 300);

        return () => {
            document.removeEventListener("click", onClick);
            gsap.ticker.remove(raf);
            clearTimeout(refresh);
            lenis.destroy();
            delete (window as unknown as { __lenis?: Lenis }).__lenis;
        };
    }, []);

    return <>{children}</>;
}
