"use client";

import { useActiveSectionView } from '@/hooks/hooks';
import myimg from "@/public/me.jpg";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRight, BsGithub, BsLinkedin } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import { useActiveSection } from '@/context/active-section-context';
import toast from 'react-hot-toast';
import { error } from 'console';

const Intro = () => {
    const { setActiveSection, setTimeLastClick } = useActiveSection();
    const { ref, inView } = useActiveSectionView("Home");


    return (
        <section ref={ref} className='mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[13.5rem]' id='home'>
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
                        whileHover={{ scale: 1.2, rotate: 360}}
                        className='absolute -bottom-1 -left-[0.02rem]  text-3xl'>🚀</motion.span>
                </div>
            </div>
            <motion.h1 className='mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-3xl'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <span className="font-bold ">Hello, I'm <span className="italic">Soumyadip</span>. </span>
                I am a{" "}
                <span className="font-bold">Software Developer.</span> I have{" "}
                <span className="font-bold">1 year</span> experience as a{" "}
                <span className='font-bold italic'>front-end developer. </span>I work in{" "}
                <span className="font-bold underline">{`React{NextJs}, tailwindcss, vercel`}</span>. I enjoy building{" "}
                <span className="font-bold italic">sites & Web-apps</span>
            </motion.h1>
            <motion.div className='flex flex-col sm:flex-row gap-4 items-center justify-center text-lg font-medium'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}>
                <Link href="#contact" className='group bg-gray-800 text-white px-8 py-3 rounded-full flex justify-center items-center gap-2 hover:tracking-wider duration-300  shadow-xl outline-none hover:scale-105 hover:bg-gray-900 focus:scale-105 active:scale-100' onClick={() => {
                    setActiveSection("Contact");
                    setTimeLastClick(Date.now());
                }}>Contact me <BsArrowRight className='translate-y-[1.2px] group-hover:translate-x-[0.28rem] transition' /></Link>
                <a href="/My_Resume.pdf" className='flex bg-white text-black px-6 py-3 rounded-full gap-2 items-center justify-center  hover:tracking-wider duration-300 hover:scale-105 focus:scale-105 active:scale-100 cursor-pointer shadow-lg border border-black/10'
                    download={true} onClick={()=>{
                        toast.loading("Downloading Resume", {
                        });
                        setInterval(() => {
                            toast.dismiss();
                        }, 3000);
                    }}>Download CV <HiDownload />{" "}</a>
                <div className="flex gap-4">
                    <a href="https://www.linkedin.com/in/soumyadip-sanyalxxiii/" className='flex bg-white text-black p-4 rounded-full gap-2 items-center justify-center duration-300 hover:scale-110 focus:scale-110 active:scale-100 cursor-pointer shadow-lg border border-black/10' target='_blank'><BsLinkedin size={20} /></a>
                    <a href="https://github.com/Nanashi-101" className='flex bg-white text-black p-4 rounded-full gap-2 items-center justify-center duration-300 hover:scale-110 focus:scale-110 active:scale-100 cursor-pointer shadow-lg border border-black/10' target='_blank'><BsGithub size={20} /></a>
                </div>
            </motion.div>
        </section>
    )
}

export default Intro
