"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HeadingProps {
    children: React.ReactNode;
    index?: string;
    kicker?: string;
}

const SectionHeading = ({ children, index, kicker }: HeadingProps) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.from(el.children, {
                opacity: 0,
                y: 26,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            });
        }, el);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={ref} className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-gold">
                {index && <span>{index}</span>}
                <span className="h-px w-10 bg-gold/50" />
                {kicker && <span>{kicker}</span>}
            </div>
            <h2 className="text-4xl font-black lowercase tracking-tight text-ink sm:text-5xl">
                {children}
            </h2>
        </div>
    );
};

const AboutHeading = ({ children, kicker }: HeadingProps) => (
    <div className="mb-8">
        <div className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-10 bg-gold/50" />
            {kicker && <span>{kicker}</span>}
        </div>
        <h2 className="text-3xl font-black lowercase tracking-tight text-ink sm:text-4xl">{children}</h2>
    </div>
);

export { SectionHeading, AboutHeading };
