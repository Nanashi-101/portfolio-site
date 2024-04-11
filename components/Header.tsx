"use client";

import { useActiveSection } from '@/context/active-section-context';
import { links } from '@/lib/data';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { ThemeChangerBtnMob } from './ThemeChangerBtn';
import iconMe from '@/public/Sam.png';


const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(true);
    const [mobileMenuScroll, setMobileMenuScroll] = useState(true);
    const { activeSection, setActiveSection, setTimeLastClick } = useActiveSection();
    const [pageScrolled, setPageScrolled] = useState(false);
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
            <motion.div className={
                !pageScrolled
                    ?
                    `hidden sm:block fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-80 bg-white bg-opacity-[0.75] backdrop-blur-[0.5rem] shadow-lg shadow-black/[0.03] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75 dark:border-opacity-80 dark:shadow-slate-500/[0.03]`
                    :
                    `hidden sm:block fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-80 bg-white bg-opacity-[0.75] backdrop-blur-[0.5rem] shadow-lg shadow-black/[0.03] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full
                dark:bg-gray-800 dark:border-black/40 dark:bg-opacity-75 dark:border-opacity-80 dark:shadow-slate-500/[0.03]`}
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
                                            <motion.span className={!pageScrolled ? 'bg-gray-200 rounded-full absolute inset-0 -z-10 dark:bg-gray-800' : 'bg-gray-200 rounded-full absolute inset-0 -z-10 dark:bg-gray-950'}
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
            <div className={mobileMenuScroll ? 'fixed w-full  sm:hidden cursor-pointer h-[4.5rem]' : 'fixed w-full sm:hidden cursor-pointer py-3 px-5 bg-gray-200/80 dark:bg-black/70 backdrop-blur-sm h-[4.5rem]'}>
                <AiOutlineMenu size={30} onClick={handleMenu} id='menu-btn' className='text-gray-700 dark:text-white/80 fixed top-5 right-5' />
            </div>
            <nav className={!mobileMenu ? "fixed top-0 left-0 bottom-0 right-0 flex sm:hidden h-screen w-full py-2 bg-gray-200/90 dark:bg-black/80 dark:text-white/70 backdrop-blur-[0.7rem] ease-in duration-300" : "fixed top-0 left-[-100%] flex sm:hidden h-screen w-full z-[999] py-2 bg-gray-200/90 backdrop-blur-2 ease-in duration-300"} id='mobile-nav'>
                <ul className='relative flex flex-col  w-full items-center justify-center font-medium text-xl uppercase sm:text-[0.9rem] sm:w-[initial] gap-5 sm:gap-5'>
                    <AiOutlineClose size={30} className='absolute top-5 right-5 cursor-pointer' onClick={handleMenu} />
                    {
                        links.map(link => {
                            return (
                                <motion.li key={link.hash} className='relative flex  items-center justify-center'
                                    initial={{ y: -100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.05, duration: 0.3 }}>
                                    <Link href={link.hash} className={clsx('flex items-center justify-center w-full p-3 hover:text-gray-950 hover:bg-gray-300  rounded-full transition dark:text-gray-200 dark:hover:text-gray-300 dark:hover:bg-gray-800', {
                                        'text-gray-950 dark:text-gray-200': activeSection === link.name
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
                    <ThemeChangerBtnMob />
                </ul>
            </nav>
        </header>
    )
}

export default Header
