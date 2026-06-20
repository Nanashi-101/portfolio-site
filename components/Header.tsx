"use client";

import { useActiveSection } from '@/context/active-section-context';
import { useThemeContext } from '@/context/theme-context';
import { links } from '@/lib/data';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { BiMoon, BiSun } from 'react-icons/bi';

type SectionName = (typeof links)[number]["name"];

const Header = () => {
    const { activeSection, setActiveSection, setTimeLastClick } = useActiveSection();
    const { theme, toggleTheme } = useThemeContext();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    }, [menuOpen]);

    const navigate = (e: React.MouseEvent, name: SectionName, hash: string) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveSection(name);
        setTimeLastClick(Date.now());
        const wasOpen = menuOpen;
        setMenuOpen(false);
        const doScroll = () => {
            const el = document.querySelector(hash) as HTMLElement | null;
            if (!el) return;
            const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: { offset?: number }) => void } }).__lenis;
            if (lenis?.scrollTo) lenis.scrollTo(el, { offset: -72 });
            else el.scrollIntoView({ behavior: "smooth" });
        };
        setTimeout(doScroll, wasOpen ? 130 : 20);
    };

    return (
        <>
            <header
                className={clsx(
                    'fixed inset-x-0 top-0 z-[999] transition-all duration-300',
                    scrolled ? 'border-b border-ink/10 bg-surface/80 backdrop-blur-md' : 'border-b border-transparent'
                )}
            >
                <div className="mx-auto flex h-[4.5rem] max-w-[1240px] items-center justify-between px-5 sm:px-8">
                    <Link href="#home" data-nav-handled onClick={(e) => navigate(e, 'Home', '#home')} className="text-xl font-black lowercase tracking-tight text-ink">
                        soumyadip<span className="text-gold">.</span>
                    </Link>

                    <div className="hidden items-center gap-2 sm:flex">
                        <nav>
                            <ul className="flex items-center gap-1">
                                {links.map((link) => (
                                    <li key={link.hash} className="relative">
                                        <Link
                                            href={link.hash}
                                            data-nav-handled
                                            onClick={(e) => navigate(e, link.name, link.hash)}
                                            className={clsx(
                                                'relative px-4 py-2 text-sm font-medium lowercase transition-colors',
                                                activeSection === link.name ? 'text-ink' : 'text-ink/50 hover:text-ink'
                                            )}
                                        >
                                            {link.name}
                                            {activeSection === link.name && (
                                                <motion.span
                                                    layoutId="nav-dot"
                                                    className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold"
                                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="ml-2 grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-gold hover:text-gold"
                        >
                            {theme === 'light' ? <BiSun size={18} /> : <BiMoon size={18} />}
                        </button>
                    </div>

                    <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="text-ink sm:hidden">
                        <HiMenuAlt4 size={26} />
                    </button>
                </div>
            </header>

            {/* Mobile bottom sheet — sibling of <header> so `fixed` anchors to the
                viewport (not a backdrop-filtered ancestor). */}
            <AnimatePresence>
                {menuOpen && (
                    <div className="sm:hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setMenuOpen(false)}
                            className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm"
                        />
                        <motion.nav
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 320, damping: 34 }}
                            className="fixed inset-x-0 bottom-0 z-[1001] flex max-h-[90vh] flex-col rounded-t-[2rem] bg-white px-7 pb-12 pt-4 text-neutral-900 shadow-2xl dark:bg-gold"
                        >
                            <span className="mx-auto mb-7 h-1.5 w-12 rounded-full bg-neutral-900/20" />

                            <ul className="flex flex-col gap-1">
                                {links.map((link) => (
                                    <li key={link.hash}>
                                        <Link
                                            href={link.hash}
                                            data-nav-handled
                                            onClick={(e) => navigate(e, link.name, link.hash)}
                                            className={clsx(
                                                'flex items-center gap-3 py-3 text-3xl font-black lowercase tracking-tight transition-colors',
                                                activeSection === link.name ? 'text-neutral-900' : 'text-neutral-900/45'
                                            )}
                                        >
                                            {activeSection === link.name && (
                                                <span className="h-2 w-2 rounded-full bg-neutral-900" />
                                            )}
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={toggleTheme}
                                className="mt-8 flex items-center justify-center gap-2 rounded-full border border-neutral-900/25 py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
                            >
                                {theme === 'light' ? <BiMoon size={18} /> : <BiSun size={18} />}
                                {theme === 'light' ? 'Dark mode' : 'Light mode'}
                            </button>
                        </motion.nav>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
