"use client";

import { useActiveSection } from '@/context/active-section-context';
import { useActiveSectionView } from '@/hooks/hooks';
import myimg from "@/public/me.jpg";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { BsArrowRight, BsGithub, BsLinkedin } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import { IoLogoWhatsapp } from "react-icons/io";
import { ReactTyped } from 'react-typed';

const Intro = () => {
    const { setActiveSection, setTimeLastClick } = useActiveSection();
    const { ref, inView } = useActiveSectionView("Home");


    return (
        <section ref={ref} className='mb-28 pt-[1rem] max-w-[50rem] text-center sm:mb-0 scroll-mt-[13.5rem]' id='home'>
            <div className='flex flex-col items-center justify-center '>
                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "tween", duration: 0.2 }}
                    >
                        <Image src={myimg} alt='Me' width={150} height={150}
                            quality="95" priority={true} className='h-24 w-24 rounded-full border-[0.25rem] border-white/80 object-cover shadow-xl' />
                    </motion.div>
                    <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 125, delay: 0.1, duration: 0.7 }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        className='absolute -bottom-1 -left-[0.02rem]  text-3xl'>🚀</motion.span>
                </div>
            </div>
            <motion.h1 className='mb-8 mt-2 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl dark:text-gray-200/90'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <span className="">Hello, I'm <span className="font-bold">Soumyadip</span>. </span>{" "}
                I am a{" "} <span className="font-bold italic">{" "}Software Developer. </span>{" "}
            </motion.h1>
            <motion.p className='mb-[4rem] text-3xl sm:text-5xl my-4' initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}><span className=''><span className='font-semibold'>I</span> work in</span>{" "}
                <ReactTyped
                    className='font-extrabold'
                    strings={["React{NextJS}", "Tailwindcss", "NodeJs", "Git", "MongoDB", "ExpressJs", "TypeScript", "JavaScript", "HTML", "CSS", "SASS"]}
                    typeSpeed={100}
                    backSpeed={120}
                    loop
                /></motion.p>
            <motion.div className='flex flex-col sm:flex-row gap-4 items-center justify-center text-lg font-medium'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}>
                <Link href="#contact" className='group bg-gray-800 text-white px-8 py-3 rounded-full flex justify-center items-center gap-2 hover:tracking-wider duration-300  shadow-xl outline-none hover:scale-105 hover:bg-gray-900 focus:scale-105 active:scale-100' onClick={() => {
                    setActiveSection("Contact");
                    setTimeLastClick(Date.now());
                }}>Contact me <BsArrowRight className='translate-y-[1.2px] group-hover:translate-x-[0.28rem] transition' /></Link>
                <a href="/My_Resume.pdf" className='flex bg-white dark:bg-white/10 dark:text-white/80 px-6 py-3 rounded-full gap-2 items-center justify-center  hover:tracking-wider duration-300 hover:scale-105 focus:scale-105 active:scale-100 cursor-pointer shadow-lg border border-black/10'
                    download={true} onClick={() => {
                        toast.loading("Downloading Resume", {
                        });
                        setInterval(() => {
                            toast.dismiss();
                        }, 3000);
                    }}>Download CV <HiDownload />{" "}</a>
                <div className="flex gap-4">
                    <a href="https://www.linkedin.com/in/soumyadip-sanyalxxiii/" className='flex bg-white text-black p-4 rounded-full gap-2 items-center justify-center duration-300 hover:scale-110 focus:scale-110 active:scale-100 cursor-pointer shadow-lg border border-black/10 dark:bg-white/10 dark:text-white/80' target='_main'><BsLinkedin size={20} /></a>
                    <a href="https://github.com/Nanashi-101" className='flex bg-white text-black p-4 rounded-full gap-2 items-center justify-center duration-300 hover:scale-110 focus:scale-110 active:scale-100 cursor-pointer shadow-lg border border-black/10 dark:bg-white/10 dark:text-white/80' target='_main'><BsGithub size={20} /></a>
                    <a href="https://wa.me/48739685183" className='flex bg-white text-black p-4 rounded-full gap-2 items-center justify-center duration-300 hover:scale-110 focus:scale-110 active:scale-100 cursor-pointer shadow-lg border border-black/10 dark:bg-white/10 dark:text-white/80' target='_main'><IoLogoWhatsapp size={20} /></a>
                </div>
            </motion.div>
        </section>
    )
}

export default Intro
