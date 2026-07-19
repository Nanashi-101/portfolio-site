"use client";

import gsap from "gsap";
import React, { cloneElement, isValidElement, useEffect, useRef } from "react";

/**
 * Wraps a single child and makes it "magnetic": the element is gently pulled
 * toward the cursor and springs back elastically on mouse leave.
 * No-op on touch devices (pointer: coarse).
 */
export default function Magnetic({
    children,
    strength = 0.35,
}: {
    children: React.ReactElement;
    strength?: number;
}) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const onMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = el.getBoundingClientRect();
            xTo((clientX - (left + width / 2)) * strength);
            yTo((clientY - (top + height / 2)) * strength);
        };
        const onLeave = () => {
            xTo(0);
            yTo(0);
        };

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, [strength]);

    if (!isValidElement(children)) return children;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return cloneElement(children as React.ReactElement<any>, { ref });
}
