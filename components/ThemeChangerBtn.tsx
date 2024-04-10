"use client";

import React, { use, useEffect, useState } from 'react'
import { BiSun, BiMoon } from 'react-icons/bi';

type ThemeType = 'light' | 'dark';

const ThemeChangerBtn = () => {
    const [theme, setTheme] = useState<ThemeType>('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
            window.localStorage.setItem('theme', 'dark')
            document.documentElement.classList.add('dark')
        } else {
            setTheme('light')
            window.localStorage.setItem('theme', 'light')
            document.documentElement.classList.remove('dark')
        }
    }

    useEffect(() => {
        const userTheme = localStorage.getItem('theme') as ThemeType | null;
        if(userTheme){
            setTheme(userTheme);
            userTheme === 'dark' && document.documentElement.classList.add('dark');
        }else if(window.matchMedia("(prefers-color-scheme: dark)").matches){
            setTheme('dark');
            document.documentElement.classList.add('dark');
        }

        // userTheme ? setTheme(userTheme) : (window.matchMedia("(prefers-color-scheme: dark)").matches)? setTheme('dark') : setTheme('light');
    }, [])
    return (
        <button onClick={toggleTheme} className='fixed text-gray-500 text-2xl top-3 left-5 z-[999]  sm:top-[90%] w-[3rem] h-[3rem] flex items-center justify-center border border-white/[0.05] dark:border-white/[0.3] bg-white/80 shadow-slate-500 shadow-inner rounded-full backdrop-blur-[0.15] hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950'>
            {theme === 'light' ? <BiSun className='' /> : <BiMoon className='' />}
        </button>
    )
}

export default ThemeChangerBtn
