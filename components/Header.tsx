"use client";

import { usePageTransition } from '@/components/transition/PageTransition';
import { useThemeContext } from '@/context/theme-context';
import { navLinks } from '@/lib/data';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';
import { BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { HiMenuAlt4 } from 'react-icons/hi';

const EASE = [0.76, 0, 0.24, 1] as const;

const socials = [
    { href: "https://www.linkedin.com/in/soumyadip-sanyalxxiii/", label: "LinkedIn", Icon: BsLinkedin },
    { href: "https://github.com/Nanashi-101", label: "GitHub", Icon: BsGithub },
    { href: "https://www.instagram.com/ign._.kratos", label: "Instagram", Icon: BsInstagram },
];

/* ---------------- Curved side menu (desktop) ---------------- */

function SideMenu({ onClose }: { onClose: () => void }) {
    const { navigate } = usePageTransition();
    const pathname = usePathname();
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    const initialPath = `M100 0 L100 ${height} Q-100 ${height / 2} 100 0`;
    const targetPath = `M100 0 L100 ${height} Q100 ${height / 2} 100 0`;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onClose}
                className="fixed inset-0 z-[1003] bg-black/40"
            />
            <motion.aside
                initial={{ x: "calc(100% + 100px)" }}
                animate={{ x: 0, transition: { duration: 0.8, ease: EASE } }}
                exit={{ x: "calc(100% + 100px)", transition: { duration: 0.8, ease: EASE } }}
                className="fixed right-0 top-0 z-[1004] flex h-screen w-[min(90vw,26rem)] flex-col justify-between bg-[#0f0f0e] px-14 pb-12 pt-24 text-white"
                aria-label="Site menu"
            >
                {/* curved left edge */}
                {height > 0 && (
                    <svg className="absolute left-[-99px] top-0 h-full w-[100px] fill-[#0f0f0e]" style={{ pointerEvents: "none" }}>
                        <motion.path
                            initial={{ d: initialPath }}
                            animate={{ d: targetPath, transition: { duration: 0.8, ease: EASE } }}
                            exit={{ d: initialPath, transition: { duration: 0.8, ease: EASE } }}
                        />
                    </svg>
                )}

                <div>
                    <p className="mb-10 border-b border-white/20 pb-4 text-[0.65rem] uppercase tracking-[0.35em] text-white/40">
                        navigation
                    </p>
                    <ul className="flex flex-col gap-2">
                        {navLinks.map((link, i) => {
                            const isActive = pathname === link.href;
                            return (
                                <motion.li
                                    key={link.href}
                                    initial={{ x: 90, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1, transition: { duration: 0.7, ease: EASE, delay: 0.06 * i + 0.2 } }}
                                    exit={{ x: 90, opacity: 0, transition: { duration: 0.4, ease: EASE } }}
                                >
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onClose();
                                            navigate(link.href, link.name);
                                        }}
                                        className={clsx(
                                            'group flex items-center gap-4 py-1 text-5xl font-medium lowercase tracking-tight transition-colors',
                                            isActive ? 'text-white' : 'text-white/50 hover:text-white'
                                        )}
                                    >
                                        <span
                                            className={clsx(
                                                'h-2.5 w-2.5 rounded-full bg-gold transition-transform duration-300',
                                                isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'
                                            )}
                                        />
                                        {link.name}
                                    </a>
                                </motion.li>
                            );
                        })}
                    </ul>
                </div>

                <div>
                    <p className="mb-4 text-[0.65rem] uppercase tracking-[0.35em] text-white/40">socials</p>
                    <div className="flex flex-wrap gap-5">
                        {socials.map(({ href, label, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-gold"
                            >
                                <Icon size={15} />
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            </motion.aside>
        </>
    );
}

/* ---------------- Header ---------------- */

const Header = () => {
    const { theme, toggleTheme } = useThemeContext();
    const { navigate } = usePageTransition();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [pastHero, setPastHero] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // mobile bottom sheet
    const [sideOpen, setSideOpen] = useState(false); // desktop side menu

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 24);
            setPastHero(window.scrollY > window.innerHeight * 0.8);
        };
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen || sideOpen ? 'hidden' : 'auto';
    }, [menuOpen, sideOpen]);

    // close menus whenever the route changes
    useEffect(() => {
        setMenuOpen(false);
        setSideOpen(false);
    }, [pathname]);

    const go = (e: React.MouseEvent, href: string, name: string) => {
        e.preventDefault();
        setMenuOpen(false);
        setSideOpen(false);
        navigate(href, name);
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
                    {/* logo with hover swap */}
                    <a
                        href="/"
                        onClick={(e) => go(e, '/', 'home')}
                        className="group flex items-center gap-1.5 text-lg font-black lowercase tracking-tight text-ink"
                        aria-label="Home"
                    >
                        <span className="font-normal">©</span>
                        <span className="relative block overflow-hidden">
                            <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                                soumyadip<span className="text-gold">.</span>
                            </span>
                            <span className="absolute left-0 top-full block whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                                code by sam<span className="text-gold">.</span>
                            </span>
                        </span>
                    </a>

                    <div className="hidden items-center gap-2 sm:flex">
                        <nav aria-label="Primary">
                            <ul className="flex items-center gap-1">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <li key={link.href} className="relative">
                                            <a
                                                href={link.href}
                                                onClick={(e) => go(e, link.href, link.name)}
                                                className={clsx(
                                                    'relative block px-4 py-2 text-sm font-medium lowercase transition-colors',
                                                    isActive ? 'text-ink' : 'text-ink/50 hover:text-ink'
                                                )}
                                            >
                                                {link.name}
                                                {isActive && (
                                                    <motion.span
                                                        layoutId="nav-dot"
                                                        className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold"
                                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                                    />
                                                )}
                                            </a>
                                        </li>
                                    );
                                })}
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

                    <button
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-surface transition-transform active:scale-95 sm:hidden"
                    >
                        <HiMenuAlt4 size={19} />
                    </button>
                </div>
            </header>

            {/* Floating burger — appears after scrolling past the hero (desktop) */}
            <AnimatePresence>
                {(pastHero || sideOpen) && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={() => setSideOpen((o) => !o)}
                        aria-label={sideOpen ? "Close menu" : "Open menu"}
                        aria-expanded={sideOpen}
                        className="fixed right-6 top-5 z-[1005] hidden h-14 w-14 items-center justify-center rounded-full bg-ink text-surface shadow-xl sm:flex lg:hidden"
                    >
                        <span className="relative block h-4 w-6">
                            <span
                                className={clsx(
                                    'absolute left-0 top-0 block h-[2px] w-full bg-current transition-transform duration-300',
                                    sideOpen && 'top-1/2 -translate-y-1/2 rotate-45'
                                )}
                            />
                            <span
                                className={clsx(
                                    'absolute bottom-0 left-0 block h-[2px] w-full bg-current transition-transform duration-300',
                                    sideOpen && 'bottom-1/2 translate-y-1/2 -rotate-45'
                                )}
                            />
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Desktop curved side menu */}
            <AnimatePresence>
                {sideOpen && <SideMenu onClose={() => setSideOpen(false)} />}
            </AnimatePresence>

            {/* Mobile bottom sheet */}
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
                            className="fixed inset-x-0 bottom-0 z-[1001] flex max-h-[90vh] flex-col rounded-t-[2rem] bg-[#0f0f0e] px-8 pb-14 pt-5 text-white shadow-2xl"
                            aria-label="Mobile"
                        >
                            {/* drag handle */}
                            <span className="mx-auto mb-8 h-1.5 w-12 rounded-full bg-white/20" />

                            <p className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-white/40">
                                navigation
                            </p>

                            <ul className="flex flex-col">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <li key={link.href}>
                                            <a
                                                href={link.href}
                                                onClick={(e) => go(e, link.href, link.name)}
                                                className={clsx(
                                                    'flex items-center gap-4 py-4 text-4xl font-black lowercase tracking-tight border-b border-white/5 transition-colors',
                                                    isActive ? 'text-white' : 'text-white/35 hover:text-white'
                                                )}
                                            >
                                                {isActive && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gold" />}
                                                {link.name}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>

                            {/* socials — matching the desktop side menu */}
                            <div className="mt-auto border-t border-white/10 pt-6">
                                <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-white/40">socials</p>
                                <div className="mb-6 flex flex-wrap gap-6">
                                    {socials.map(({ href, label, Icon }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
                                        >
                                            <Icon size={16} />
                                            {label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={toggleTheme}
                                className="flex items-center justify-center gap-2 rounded-full border border-white/15 py-4 text-sm font-semibold text-white/80 transition-colors hover:border-gold hover:text-gold"
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
