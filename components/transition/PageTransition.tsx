"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

type Phase = "idle" | "covering" | "covered" | "revealing";

type TransitionContextType = {
    /** Navigate to an internal route with the curtain transition. */
    navigate: (href: string, label: string) => void;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

export function usePageTransition() {
    const ctx = useContext(TransitionContext);
    if (!ctx) throw new Error("usePageTransition must be used within PageTransitionProvider");
    return ctx;
}

const EASE = [0.76, 0, 0.24, 1] as const;

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [phase, setPhase] = useState<Phase>("idle");
    const [label, setLabel] = useState("");
    const target = useRef<string | null>(null);

    const navigate = useCallback(
        (href: string, lbl: string) => {
            if (href === pathname || phase !== "idle") return;
            target.current = href;
            setLabel(lbl);
            setPhase("covering");
        },
        [pathname, phase]
    );

    // Once the curtain fully covers the screen, push the route.
    const onCoverComplete = () => {
        if (phase !== "covering") return;
        setPhase("covered");
        if (target.current) router.push(target.current);
    };

    // When the new route has rendered, scroll to top and reveal.
    useEffect(() => {
        if (phase === "covered" && pathname === target.current) {
            const lenis = (
                window as unknown as {
                    __lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void };
                }
            ).__lenis;
            lenis?.scrollTo(0, { immediate: true });
            window.scrollTo(0, 0);
            // Give the new page a frame to paint before lifting the curtain.
            const raf = requestAnimationFrame(() => setPhase("revealing"));
            return () => cancelAnimationFrame(raf);
        }
    }, [pathname, phase]);

    // Browser back/forward (no curtain): still reset scroll position.
    useEffect(() => {
        if (phase === "idle") {
            const lenis = (
                window as unknown as {
                    __lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void };
                }
            ).__lenis;
            lenis?.scrollTo(0, { immediate: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const active = phase !== "idle";

    return (
        <TransitionContext.Provider value={{ navigate }}>
            {children}

            {/* Curtain */}
            <div
                className={`fixed inset-0 z-[9950] ${active ? "pointer-events-auto" : "pointer-events-none"}`}
                aria-hidden
            >
                <motion.div
                    initial={false}
                    animate={
                        phase === "covering" || phase === "covered"
                            ? { y: "0vh" }
                            : phase === "revealing"
                              ? { y: "-120vh" }
                              : { y: "120vh" }
                    }
                    transition={
                        phase === "covering"
                            ? { duration: 0.65, ease: EASE }
                            : phase === "revealing"
                              ? { duration: 0.75, ease: EASE, delay: 0.15 }
                              : { duration: 0 }
                    }
                    onAnimationComplete={() => {
                        if (phase === "covering") onCoverComplete();
                        if (phase === "revealing") setPhase("idle");
                    }}
                    className="relative h-screen w-screen"
                >
                    {/* top curve cap */}
                    <svg
                        className="absolute -top-[99px] left-0 h-[100px] w-full"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                    >
                        <path d="M0 10 C 30 0 70 0 100 10 Z" fill="#0f0f0e" />
                    </svg>

                    <div className="flex h-full w-full items-center justify-center bg-[#0f0f0e]">
                        {active && (
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 0.9, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.25 }}
                                className="flex items-center gap-3 text-4xl font-medium lowercase text-white sm:text-5xl"
                            >
                                <span className="block h-2.5 w-2.5 rounded-full bg-white" />
                                {label}
                            </motion.p>
                        )}
                    </div>

                    {/* bottom curve cap */}
                    <svg
                        className="absolute -bottom-[99px] left-0 h-[100px] w-full"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                    >
                        <path d="M0 0 C 30 10 70 10 100 0 Z" fill="#0f0f0e" />
                    </svg>
                </motion.div>
            </div>
        </TransitionContext.Provider>
    );
}

/** Anchor that routes through the curtain transition. */
export function TransitionLink({
    href,
    label,
    children,
    className,
    onNavigate,
    ...rest
}: {
    href: string;
    label: string;
    children: React.ReactNode;
    className?: string;
    onNavigate?: () => void;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
    const { navigate } = usePageTransition();
    return (
        <a
            href={href}
            className={className}
            onClick={(e) => {
                e.preventDefault();
                onNavigate?.();
                navigate(href, label);
            }}
            {...rest}
        >
            {children}
        </a>
    );
}
