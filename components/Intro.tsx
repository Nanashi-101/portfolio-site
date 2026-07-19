"use client";

import HeroMarquee from '@/components/home/HeroMarquee';
import { usePageTransition } from '@/components/transition/PageTransition';
import { useActiveSectionView } from '@/hooks/hooks';
import profile from "@/public/hero-round.png";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BsArrowRight, BsGithub, BsGlobeAmericas, BsInstagram, BsLinkedin } from 'react-icons/bs';

const EASE = [0.22, 1, 0.36, 1] as const;

const socials = [
    { href: "https://www.linkedin.com/in/soumyadip-sanyalxxiii/", label: "LinkedIn", Icon: BsLinkedin },
    { href: "https://github.com/Nanashi-101", label: "GitHub", Icon: BsGithub },
    { href: "https://www.instagram.com/ign._.kratos", label: "Instagram", Icon: BsInstagram },
];

const Intro = () => {
    const { navigate } = usePageTransition();
    const { ref } = useActiveSectionView("Home");

    return (
        <section
            ref={ref}
            id="home"
            className="relative w-full max-w-[1240px] scroll-mt-28"
        >
            <div className="relative flex flex-col items-center gap-10 py-10 text-center lg:min-h-[calc(100vh-6rem)] lg:items-stretch lg:py-0 lg:text-left">

                {/* PHOTO — centered, gentle motion */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: EASE }}
                    className="order-1 flex justify-center lg:absolute lg:inset-0 lg:items-center"
                >
                    <motion.div
                        animate={{ y: [0, -16, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Image
                            src={profile}
                            alt="Soumyadip Sanyal"
                            priority
                            quality={100}
                            sizes="(max-width: 1024px) 80vw, 700px"
                            className="w-[80%] max-w-[340px] mx-auto lg:mx-0 lg:w-auto lg:max-w-none lg:h-[80vh] lg:max-h-[760px]"
                        />
                    </motion.div>
                </motion.div>

                {/* HEADLINE — right, vertically centered on desktop */}
                <motion.h1
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
                    className="order-2 z-20 text-6xl font-black lowercase leading-[0.9] tracking-tighter text-ink sm:text-7xl lg:absolute lg:right-[0%] lg:top-[36%] lg:-translate-y-1/2 lg:text-8xl"
                >
                    web<br />developer<span className="text-gold">.</span>
                </motion.h1>

                {/* INTRO PARAGRAPH & LOCATION — top-left on desktop */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
                    className="order-3 z-20 flex flex-col items-center text-center lg:absolute lg:left-[3%] lg:top-[16%] lg:max-w-[18rem] lg:items-start lg:text-left"
                >
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-ink">
                        Soumyadip Sanyal
                    </p>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/65">
                        A full-stack developer crafting clean, minimal, and high-performance
                        web experiences with React, Next.js &amp; TypeScript.
                    </p>
                    <a
                        href="/about"
                        onClick={(e) => { e.preventDefault(); navigate("/about", "about"); }}
                        className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-ink transition-colors hover:text-gold"
                    >
                        Read more
                        <BsArrowRight className="transition-transform group-hover:translate-x-1" />
                    </a>

                    {/* LOCATION PILL — aligned cleanly with intro */}
                    <div className="mt-8 flex items-center gap-4 rounded-full bg-ink py-3.5 px-6 text-left text-surface shadow-lg">
                        <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            className="grid h-9 w-9 shrink-0 place-items-center"
                        >
                            <BsGlobeAmericas size={24} />
                        </motion.span>
                        <span className="text-[0.75rem] font-semibold uppercase leading-relaxed tracking-[0.16em]">
                            located in<br />Warsaw, Poland
                        </span>
                    </div>
                </motion.div>

                {/* SOCIALS — bottom-left on desktop */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
                    className="order-4 z-20 flex items-center gap-5 lg:absolute lg:bottom-[7%] lg:left-[3%]"
                >
                    {socials.map(({ href, label, Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="text-ink transition-all hover:-translate-y-1 hover:text-gold"
                        >
                            <Icon size={20} />
                        </a>
                    ))}
                </motion.div>

                {/* NAME MARQUEE — sits in the mid-hero band (the red-circled zone).
                    z-[5] keeps it behind the photo (z-20) and headline (z-20).
                    The calc on left breaks out of the max-w-[1240px] parent:
                    (100vw - 100%) / 2 = the auto-margin on each side of the section. */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7, ease: EASE }}
                    className="order-6 z-[5] -mx-4 w-screen overflow-hidden lg:absolute lg:bottom-[22%] lg:mx-0"
                    style={{ left: 'calc(-1 * ((100vw - 100%) / 2))', width: '100vw' }}
                >
                    <HeroMarquee textClass="text-[16vw] lg:text-[12vw]" />
                </motion.div>
            </div>
        </section>
    );
};

export default Intro;
