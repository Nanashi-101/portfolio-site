"use client";

import ArrowButton from "@/components/common/ArrowButton";
import { usePageTransition } from "@/components/transition/PageTransition";
import logo from "@/public/logo.png";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";

const socials = [
    { href: "https://www.linkedin.com/in/soumyadip-sanyalxxiii/", label: "LinkedIn", Icon: BsLinkedin },
    { href: "https://github.com/Nanashi-101", label: "GitHub", Icon: BsGithub },
    { href: "https://www.instagram.com/ign._.kratos", label: "Instagram", Icon: BsInstagram },
];

export function useWarsawTime() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const fmt = new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "Europe/Warsaw",
            timeZoneName: "shortOffset",
        });
        const tick = () => setTime(fmt.format(new Date()));
        tick();
        const i = setInterval(tick, 10_000);
        return () => clearInterval(i);
    }, []);
    return time;
}

export default function FooterCTA() {
    const { navigate } = usePageTransition();
    const time = useWarsawTime();
    const container = useRef<HTMLDivElement>(null);

    // sticky-reveal: footer slides up from "under" the page
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [-260, 0]);
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

    return (
        <footer ref={container} className="relative w-full overflow-hidden bg-[#0f0f0e] text-white">
            <motion.div style={{ y }} className="mx-auto flex max-w-[1240px] flex-col px-5 pb-10 pt-28 sm:px-8 sm:pt-40">
                {/* Heading */}
                <div className="relative border-b border-white/15 pb-12 sm:pb-16">
                    <h2 className="text-[13vw] font-medium leading-[1.05] tracking-tight sm:text-[6.5vw]">
                        <span className="mr-4 inline-flex items-center align-middle">
                            <span className="relative inline-flex h-[12vw] w-[12vw] items-center justify-center overflow-hidden rounded-full bg-[#1c1c1c] shadow-[0_0_0_3px_#0f0f0e] sm:h-[6vw] sm:w-[6vw]">
                                <Image src={logo} alt="Soumyadip Sanyal logo" fill sizes="120px" className="object-contain p-2" />
                            </span>
                        </span>
                        let&apos;s work
                        <br />
                        together
                        <span className="text-gold">.</span>
                    </h2>

                    <motion.svg
                        style={{ rotate, scale: 2 }}
                        className="absolute right-[2%] top-[10%] hidden sm:block"
                        width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                            fill="white"
                        />
                    </motion.svg>
                </div>

                {/* CTA row */}
                <div className="mt-12 flex flex-col items-start gap-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
                    <a
                        href="mailto:soumyadipsanyal2017@gmail.com"
                        className="break-all rounded-full border border-white/25 px-7 py-4 text-sm transition-colors hover:border-gold hover:text-gold sm:px-9 sm:py-5 sm:text-base"
                    >
                        soumyadipsanyal2017@gmail.com
                    </a>
                    <ArrowButton
                        tone="dark"
                        size="lg"
                        onClick={() => navigate("/contact", "contact")}
                        role="link"
                        aria-label="Get in touch"
                    >
                        get in touch
                    </ArrowButton>
                </div>

                {/* Bottom meta row */}
                <div className="mt-20 flex flex-col gap-8 sm:mt-28 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex gap-12">
                        <div>
                            <p className="mb-1 text-[0.65rem] uppercase tracking-[0.25em] text-white/40">version</p>
                            <p className="text-sm text-white/80">2026 © Edition</p>
                        </div>
                        <div>
                            <p className="mb-1 text-[0.65rem] uppercase tracking-[0.25em] text-white/40">local time</p>
                            <p className="text-sm text-white/80" suppressHydrationWarning>{time || "—"}</p>
                        </div>
                    </div>

                    <div>
                        <p className="mb-2 text-[0.65rem] uppercase tracking-[0.25em] text-white/40 sm:text-right">socials</p>
                        <div className="flex gap-6">
                            {socials.map(({ href, label, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-gold"
                                >
                                    <Icon size={16} />
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="mt-14 text-center text-[0.7rem] leading-relaxed text-white/35">
                    © 2026 Soumyadip Sanyal · Built with Next.js, TypeScript, Tailwind CSS, Framer Motion &amp; GSAP
                </p>
            </motion.div>
        </footer>
    );
}
