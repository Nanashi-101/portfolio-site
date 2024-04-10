"use client";

import { useThemeContext } from '@/context/theme-context';
import { BiMoon, BiSun } from 'react-icons/bi';


const ThemeChangerBtn = () => {
    const { theme, toggleTheme } = useThemeContext();
    return (
        <button onClick={toggleTheme} className='fixed text-gray-500 text-md bottom-[4.5rem] sm:bottom-5 left-5 z-[999] w-[3rem] h-[3rem] flex items-center justify-center border border-white/[0.05] dark:border-white/[0.3] bg-white/80 shadow-slate-500 shadow-inner rounded-full backdrop-blur-[0.15] hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950'>
            {theme === 'light' ? <BiSun className='' /> : <BiMoon className='' />}
        </button>
    )
}

export default ThemeChangerBtn
