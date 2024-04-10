"use client";

import { useActiveSection } from '@/context/active-section-context';
import { links } from '@/lib/data';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';


const Header = () => {
    const { activeSection, setActiveSection, setTimeLastClick } = useActiveSection();
    const [pageScrolled, setPageScrolled] = useState(false);
    if(typeof window !== 'undefined'){
        window.onscroll = () => {
            console.log(window.scrollY)
            if (window.scrollY >= 777.7777709960938) {
                setPageScrolled(true);
            }
            else {
                setPageScrolled(false);
            }
        }
    }
    return (
        <header className='z-[999] relative flex '>
            <motion.div className={
                !pageScrolled 
                ?
                 `fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-80 bg-white bg-opacity-[0.75] backdrop-blur-[0.5rem] shadow-lg shadow-black/[0.03] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75 dark:border-opacity-80 dark:shadow-slate-500/[0.03]`
                : 
                `fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-80 bg-white bg-opacity-[0.75] backdrop-blur-[0.5rem] shadow-lg shadow-black/[0.03] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full
                dark:bg-gray-800 dark:border-black/40 dark:bg-opacity-75 dark:border-opacity-80 dark:shadow-slate-500/[0.03]`}
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.3 }}
            />
            <nav className="flex fixed top-[0.15rem] left-1/2 -translate-x-1/2 h-12 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
                <ul className='flex flex-wrap w-[22rem] items-center justify-center gap-y-1 text-gray-500 font-medium text-[0.9rem] sm:w-[initial] sm:flex-nowrap sm:gap-5'>
                    {
                        links.map(link => {
                            return (
                                <motion.li key={link.hash} className='relative flex h-3/4 items-center justify-center'
                                    initial={{ y: -100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.05, duration: 0.3 }}>
                                    <Link href={link.hash} className={clsx('flex items-center justify-center w-full p-3 hover:text-gray-950 transition dark:text-gray-200 dark:hover:text-gray-300', {
                                        'text-gray-950 dark:text-gray-200': activeSection === link.name
                                    })}
                                        onClick={() => {
                                            setActiveSection(link.name);
                                            setTimeLastClick(Date.now());
                                        }}
                                    >
                                        {link.name}
                                        {(link.name === activeSection) && (
                                            <motion.span className={!pageScrolled?'bg-gray-200 rounded-full absolute inset-0 -z-10 dark:bg-gray-800':'bg-gray-200 rounded-full absolute inset-0 -z-10 dark:bg-gray-950'}
                                                layoutId='activeSection'
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 380,
                                                    damping: 40
                                                }}
                                            />
                                        )}
                                    </Link>
                                </motion.li>
                            )
                        })
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header
