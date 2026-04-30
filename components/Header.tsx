"use client";

import { useActiveSection } from '@/context/active-section-context';
import { links } from '@/lib/data';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { ThemeChangerBtnMob } from './ThemeChangerBtn';



const Header = () => {
    const [mobileMenu, setMobileMenu] = useState<boolean>(true);
    const [mobileMenuScroll, setMobileMenuScroll] = useState<boolean>(true);
    const { activeSection, setActiveSection, setTimeLastClick } = useActiveSection();
    const [pageScrolled, setPageScrolled] = useState<boolean>(false);
    if (typeof window !== 'undefined') {
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
    useEffect(() => {
        const changeColor = () => {
            if (window.scrollY >= 100) {
                setMobileMenuScroll(false);
            }
            else{
                setMobileMenuScroll(true);
            }
          };
          window.addEventListener("scroll", changeColor);
        window.addEventListener("resize", () => {
            const mobile_Nav = document.getElementById("mobile-nav");
            mobile_Nav?.classList.add("hidden");
          });
        const bodyStyle = document.body.style;
        bodyStyle.overflow = !mobileMenu ? "hidden" : "auto";
    }, [mobileMenu]);
    const handleMenu = () => {
        setMobileMenu(!mobileMenu);
        let menuBtn = document.getElementById('menu-btn');
        menuBtn?.classList.toggle('hidden');
    }
    return (
        <header className='z-[999] relative flex '>
            <motion.div 
                className="hidden sm:block fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white/70 backdrop-blur-md shadow-lg shadow-black/[0.03] sm:top-6 sm:h-[3.25rem] sm:w-[38rem] sm:rounded-full dark:bg-gray-950/70 dark:border-white/10 dark:shadow-none"
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.3 }}
            />
            <nav className="hidden sm:flex fixed top-[0.15rem] left-1/2 -translate-x-1/2 h-12 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
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
                                            <motion.span 
                                                className="bg-primary-100 rounded-full absolute inset-0 -z-10 dark:bg-primary-900/30"
                                                layoutId='activeSection'
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 380,
                                                    damping: 30
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
            <div className={mobileMenuScroll ? 'fixed w-full sm:hidden cursor-pointer h-[4rem] z-[1000]' : 'fixed w-full sm:hidden cursor-pointer py-3 px-5 bg-white/70 dark:bg-gray-950/70 backdrop-blur-md border-b border-black/5 dark:border-white/10 h-[4rem] z-[1000]'}>
                <AiOutlineMenu size={28} onClick={handleMenu} id='menu-btn' className='text-gray-700 dark:text-white/80 absolute top-4 right-5' />
            </div>
            <nav className={clsx("fixed inset-0 z-[1001] flex sm:hidden h-screen w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl transition-all duration-300", {
                "translate-x-0 opacity-100": !mobileMenu,
                "translate-x-full opacity-0": mobileMenu
            })} id='mobile-nav'>
                <AiOutlineClose size={32} className='absolute top-6 right-6 cursor-pointer text-gray-700 dark:text-white/80' onClick={handleMenu} />
                
                <ul className='flex flex-col w-full h-full items-center justify-center gap-8 text-2xl font-bold uppercase tracking-widest'>
                    {
                        links.map((link, index) => {
                            return (
                                <motion.li 
                                    key={link.hash}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={!mobileMenu ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                >
                                    <Link href={link.hash} className={clsx('transition-all hover:text-primary-500', {
                                        'text-primary-600 dark:text-primary-400': activeSection === link.name,
                                        'text-gray-700 dark:text-white/70': activeSection !== link.name
                                    })}
                                        onClick={() => {
                                            handleMenu();
                                            setActiveSection(link.name);
                                            setTimeLastClick(Date.now());
                                        }}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.li>
                            )
                        })
                    }
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={!mobileMenu ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                        transition={{ delay: 0.4 }}
                    >
                        <ThemeChangerBtnMob />
                    </motion.div>
                </ul>
            </nav>
        </header>
    )
}

export default Header
