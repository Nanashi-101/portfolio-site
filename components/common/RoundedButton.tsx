"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import Magnetic from "./Magnetic";

/**
 * Pill button with a liquid circle-fill hover (a colored circle rises from the
 * bottom and exits through the top) — wrapped in a Magnetic field.
 */
export default function RoundedButton({
    children,
    fillColor = "rgb(var(--gold))",
    className = "",
    magnetic = true,
    ...attributes
}: {
    children: React.ReactNode;
    fillColor?: string;
    className?: string;
    magnetic?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
    const circle = useRef<HTMLDivElement>(null);
    const timeline = useRef<gsap.core.Timeline | null>(null);
    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        timeline.current = gsap.timeline({ paused: true });
        timeline.current
            .to(circle.current, { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" }, "enter")
            .to(circle.current, { top: "-150%", width: "125%", duration: 0.25 }, "exit");
        return () => {
            timeline.current?.kill();
        };
    }, []);

    const onEnter = () => {
        if (timeoutId.current) clearTimeout(timeoutId.current);
        timeline.current?.tweenFromTo("enter", "exit");
    };
    const onLeave = () => {
        timeoutId.current = setTimeout(() => timeline.current?.play(), 300);
    };

    const button = (
        <div
            className={`group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full ${className}`}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            {...attributes}
        >
            <div className="relative z-10">{children}</div>
            <div
                ref={circle}
                style={{ backgroundColor: fillColor }}
                className="absolute top-full h-[150%] w-full rounded-[50%]"
            />
        </div>
    );

    return magnetic ? <Magnetic>{button}</Magnetic> : button;
}
