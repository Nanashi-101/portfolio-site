"use client";

import React, { useContext, useEffect, useState } from 'react';

type ThemeType = 'light' | 'dark';

type ThemeContextChildrenType = {
    children: React.ReactNode;
};

type ThemeContextType = {
    theme: ThemeType;
    toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

const ThemeContextProvider = ({children}: ThemeContextChildrenType) => {
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
        if (userTheme) {
            setTheme(userTheme);
            userTheme === 'dark' && document.documentElement.classList.add('dark');
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        }

        // userTheme ? setTheme(userTheme) : (window.matchMedia("(prefers-color-scheme: dark)").matches)? setTheme('dark') : setTheme('light');
    }, [])

    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme,
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => { 
    const context = useContext(ThemeContext)
    if (context === null) {
        throw new Error('useActiveSection must be used within an ActiveSectionProvider')
    }

    return context;
}

export default ThemeContextProvider
