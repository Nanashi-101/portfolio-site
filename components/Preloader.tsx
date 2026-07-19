"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["Hello", "নমস্কার", "Cześć", "Bonjour", "Hola", "こんにちは", "Hallo", "Ciao", "Hello"];

const EASE = [0.76, 0, 0.24, 1] as const;

function Curtain({ onDone }: { onDone: () => void }) {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    useEffect(() => {
        if (index === words.length - 1) {
            const t = setTimeout(onDone, 350);
            return () => clearTimeout(t);
        }
        const t = setTimeout(() => setIndex(index + 1), index === 0 ? 800 : 150);
        return () => clearTimeout(t);
    }, [index, onDone]);

    const { width, height } = dimension;
    const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`;
    const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;

    return (
        <motion.div
            initial={{ top: 0 }}
            exit={{ top: "-100vh", transition: { duration: 0.8, ease: EASE, delay: 0.2 } }}
            className="fixed left-0 z-[10000] flex h-screen w-screen items-center justify-center bg-[#0f0f0e]"
            aria-hidden
        >
            {width > 0 && (
                <>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.85, transition: { duration: 0.8, delay: 0.15 } }}
                        className="absolute z-[2] flex items-center gap-3 text-4xl font-medium text-white sm:text-5xl"
                    >
                        <span className="block h-2.5 w-2.5 rounded-full bg-white" />
                        {words[index]}
                    </motion.p>
                    <svg className="absolute top-0 h-[calc(100%+300px)] w-full" style={{ pointerEvents: "none" }}>
                        <motion.path
                            initial={{ d: initialPath }}
                            exit={{ d: targetPath, transition: { duration: 0.7, ease: EASE, delay: 0.2 } }}
                            fill="#0f0f0e"
                        />
                    </svg>
                </>
            )}
        </motion.div>
    );
}

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Lock scroll while the preloader is visible.
        // Overflow is only RESTORED in the onExitComplete callback below
        // so it stays locked through the entire exit animation.
        if (isLoading) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflowX = "hidden";
            const lenis = (window as unknown as { __lenis?: { stop: () => void } }).__lenis;
            lenis?.stop();
        }
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflowX = "";
        };
    }, [isLoading]);

    return (
        <AnimatePresence
            mode="wait"
            onExitComplete={() => {
                // Restore scroll only after the curtain is fully off-screen
                document.body.style.overflow = "";
                document.documentElement.style.overflowX = "";
                const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
                lenis?.start();
                window.scrollTo(0, 0);
            }}
        >
            {isLoading && <Curtain onDone={() => setIsLoading(false)} />}
        </AnimatePresence>
    );
}
