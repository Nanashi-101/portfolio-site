"use client";

import { useActiveSectionView } from "@/hooks/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight, BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import toast from "react-hot-toast";
import aboutImg from "@/public/about-pic.jpeg";

const EASE = [0.22, 1, 0.36, 1] as const;

const facts = [
    { label: "Based in", value: "Warsaw, Poland" },
    { label: "Focus", value: "Full-stack web" },
    { label: "Core stack", value: "React · Next · Node" },
    { label: "Status", value: "Open to work" },
];

const socials = [
    { href: "https://www.linkedin.com/in/soumyadip-sanyalxxiii/", label: "LinkedIn", Icon: BsLinkedin },
    { href: "https://github.com/Nanashi-101", label: "GitHub", Icon: BsGithub },
    { href: "https://www.instagram.com/ign._.kratos", label: "Instagram", Icon: BsInstagram },
];

const About = () => {
    const { ref } = useActiveSectionView("About");

    return (
        <section ref={ref} id="about" className="w-full max-w-[1180px] scroll-mt-28 px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
                className="grid overflow-hidden shadow-2xl lg:grid-cols-2"
            >
                {/* TEXT half — white (light) / gold (dark); dark text in both */}
                <div className="bg-white p-8 text-neutral-900 dark:bg-gold sm:p-10 lg:p-14">
                    <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-neutral-900/65">
                        <span>04</span>
                        <span className="h-px w-10 bg-neutral-900/40" />
                        <span>about</span>
                    </div>

                    <h2 className="text-4xl font-black lowercase leading-[0.95] tracking-tight sm:text-5xl">
                        full-stack developer<br />
                        <span className="text-neutral-900/55">based in warsaw.</span>
                    </h2>

                    <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-neutral-900/80">
                        <p>
                            After finishing high school in <span className="font-semibold text-neutral-900">India</span>, I moved abroad to study at{" "}
                            <span className="font-semibold text-neutral-900">Vistula University</span> in Poland, teaching myself{" "}
                            <span className="font-semibold text-neutral-900">full-stack web development</span> alongside my degree. What I love most
                            is the problem-solving — that moment a stubborn bug finally gives way.
                        </p>
                        <p>
                            My core stack is <span className="font-semibold text-neutral-900">React, Next.js, Node.js and MongoDB</span>, with TypeScript
                            and a growing focus on performance, accessibility and clean design.
                        </p>
                    </div>

                    <dl className="mt-8 grid max-w-md grid-cols-2 gap-x-8 gap-y-5">
                        {facts.map((f) => (
                            <div key={f.label} className="border-t border-neutral-900/20 pt-3">
                                <dt className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-neutral-900/60">{f.label}</dt>
                                <dd className="mt-1 break-words text-sm font-semibold text-neutral-900">{f.value}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="mt-9 flex flex-wrap items-center gap-5">
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
                        >
                            Get in touch
                            <BsArrowRight className="transition-transform group-hover:translate-x-1" />
                        </Link>
                        <a
                            href="/My_Resume.pdf"
                            download
                            onClick={() => toast.success("Downloading CV…")}
                            className="group inline-flex items-center gap-2 rounded-full border border-neutral-900/30 px-7 py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
                        >
                            Download CV
                            <HiDownload className="transition-transform group-hover:translate-y-0.5" />
                        </a>
                        <div className="flex items-center gap-3">
                            {socials.map(({ href, label, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="grid h-11 w-11 place-items-center rounded-full border border-neutral-900/30 text-neutral-900 transition-all hover:-translate-y-1 hover:bg-neutral-900 hover:text-white"
                                >
                                    <Icon size={17} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PIC half — gold (light) / white (dark); image centered, medium */}
                <div className="flex items-center justify-center bg-gold p-8 dark:bg-white sm:p-12">
                    <div className="w-full max-w-[300px]">
                        <div className="relative aspect-[4/5] w-full overflow-hidden">
                            <Image
                                src={aboutImg}
                                alt="Soumyadip Sanyal — full-stack developer based in Warsaw, Poland"
                                fill
                                sizes="300px"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
