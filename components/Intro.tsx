"use client";

import { useActiveSection } from '@/context/active-section-context';
import { useActiveSectionView } from '@/hooks/hooks';
import myimg from "@/public/Intro_me.png";
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
        <section 
            ref={ref} 
            className='mb-28 pt-[6rem] sm:pt-[10rem] max-w-[75rem] text-center sm:mb-0 scroll-mt-[13.5rem] relative' 
            id='home'
        >
            {/* Background Decorative Elements - Constrained to prevent overflow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[100vw] h-full -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[80px] sm:blur-[120px] animate-pulse" />
                <div className="absolute bottom-[5%] right-[-5%] w-[40%] h-[40%] bg-accent-500/10 rounded-full blur-[80px] sm:blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className='flex flex-col items-center justify-center '>
                <div className="relative group mb-8 sm:mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 10, duration: 0.6 }}
                        className="relative z-10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-accent-500 rounded-[2rem] sm:rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 animate-pulse" />
                        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border-[3px] border-white dark:border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] group-hover:rotate-2">
                            <Image 
                                src={myimg} 
                                alt='Soumyadip Sanyal' 
                                width={180} 
                                height={180}
                                quality="100" 
                                priority={true} 
                                className='h-36 w-36 sm:h-44 sm:w-44 object-cover' 
                            />
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 125, delay: 0.4, duration: 0.7 }}
                        className='absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-white dark:bg-gray-900 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl z-20 border border-black/5 dark:border-white/10'
                    >
                        <span className='text-3xl sm:text-4xl animate-bounce inline-block'>🚀</span>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="px-4"
            >
                <h1 className='text-4xl sm:text-7xl font-extrabold tracking-tight mb-6 sm:mb-8 dark:text-white'>
                    <span className="block text-lg sm:text-3xl font-semibold text-primary-600 dark:text-primary-400 mb-2 sm:mb-4 opacity-80 uppercase tracking-[0.2em]">Creative Developer</span>
                    <span className="inline-block bg-gradient-to-r from-primary-600 via-primary-400 to-accent-500 bg-clip-text text-transparent pb-2">
                        Soumyadip Sanyal
                    </span>
                </h1>

                <div className='text-lg sm:text-3xl text-gray-600 dark:text-gray-400 max-w-[45rem] mx-auto leading-relaxed mb-10 sm:mb-12 font-medium'>
                    Crafting <span className="text-gray-900 dark:text-white font-bold italic underline decoration-primary-500/30">exceptional</span> digital experiences with 
                    <span className="block mt-4 text-gray-900 dark:text-white">
                        <ReactTyped
                            className='font-bold bg-gray-100 dark:bg-white/5 px-4 py-1 rounded-xl border border-black/5 dark:border-white/10'
                            strings={["Next.js", "Modern UI/UX", "TypeScript", "Performance Architecture"]}
                            typeSpeed={60}
                            backSpeed={40}
                            loop
                        />
                    </span>
                </div>
            </motion.div>

            <motion.div 
                className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center px-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
            >
                <Link 
                    href="#contact" 
                    className='group relative bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl flex items-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-2xl overflow-hidden w-full sm:w-auto justify-center'
                    onClick={() => {
                        setActiveSection("Contact");
                        setTimeLastClick(Date.now());
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                    <span className="font-bold text-lg">Work with me</span>
                    <BsArrowRight className='group-hover:translate-x-2 transition-transform text-xl' />
                </Link>

                <div className="flex gap-4 w-full sm:w-auto">
                    <a 
                        href="/My_Resume.pdf" 
                        className='flex-1 sm:flex-none bg-white/80 backdrop-blur-xl dark:bg-white/5 dark:text-white/80 p-4 sm:p-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-white dark:hover:bg-white/10 border border-black/5 dark:border-white/10 shadow-xl active:scale-95'
                        download={true} 
                        onClick={() => toast.success("Downloading Resume...")}
                    >
                        <span className="font-semibold">Resume</span>
                        <HiDownload className="opacity-70 text-xl" />
                    </a>

                    <div className="flex gap-2">
                        <a href="https://www.linkedin.com/in/soumyadip-sanyalxxiii/" 
                            className='p-4 sm:p-5 bg-white/80 backdrop-blur-xl dark:bg-white/5 text-gray-700 dark:text-white/80 rounded-2xl hover:text-primary-600 dark:hover:text-primary-400 transition-all border border-black/5 dark:border-white/10 shadow-xl active:scale-90'
                            target='_blank'><BsLinkedin size={22} /></a>
                        
                        <a href="https://github.com/Nanashi-101" 
                            className='p-4 sm:p-5 bg-white/80 backdrop-blur-xl dark:bg-white/5 text-gray-700 dark:text-white/80 rounded-2xl hover:text-black dark:hover:text-white transition-all border border-black/5 dark:border-white/10 shadow-xl active:scale-90'
                            target='_blank'><BsGithub size={22} /></a>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Intro
