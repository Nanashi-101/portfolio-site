"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { BsStar, BsStarFill, BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { FaMugHot } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { SectionHeading } from "./section-heading";
import { sendFeedback, notifyCoffee } from "@/actions/sendFeedback";

// Donation link (PayPal.Me)
const PAYPAL_URL = "https://www.paypal.me/sany4l";

const EASE = [0.22, 1, 0.36, 1] as const;

type StepId = "overall" | "design" | "performance" | "liked" | "suggestion";
const steps: { id: StepId; type: "stars" | "text"; q: string; hint?: string; optional?: boolean }[] = [
    { id: "overall", type: "stars", q: "Overall, how would you rate this portfolio?" },
    { id: "design", type: "stars", q: "How would you rate the design & visuals?" },
    { id: "performance", type: "stars", q: "How smooth and fast did it feel?" },
    { id: "liked", type: "text", q: "Which part did you enjoy most — and why?", hint: "A sentence or two is plenty." },
    { id: "suggestion", type: "text", q: "Anything I could improve?", hint: "Optional — be honest!", optional: true },
];

function Stars({ value, onChange }: { value: number; onChange: (n: number) => void }) {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex items-center gap-2.5" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
                <button
                    key={n}
                    type="button"
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    onMouseEnter={() => setHover(n)}
                    onClick={() => onChange(n)}
                    className="text-4xl transition-transform duration-150 hover:scale-110 active:scale-95"
                >
                    {(hover || value) >= n ? <BsStarFill className="text-gold" /> : <BsStar className="text-ink/25" />}
                </button>
            ))}
        </div>
    );
}

const Feedback = () => {
    const [started, setStarted] = useState(false);
    const [step, setStep] = useState(0);
    const [dir, setDir] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [answers, setAnswers] = useState({
        overall: 0, design: 0, performance: 0, liked: "", suggestion: "", name: "",
    });
    const [coffeeClicked, setCoffeeClicked] = useState(false);
    const coffeeFired = useRef(false);

    const handleCoffee = () => {
        if (coffeeFired.current) return;
        coffeeFired.current = true;
        setCoffeeClicked(true);
        void notifyCoffee({ ...answers, coffee: true });
    };

    const total = steps.length;
    const current = steps[step];
    const isLast = step === total - 1;
    const value = (answers as Record<string, number | string>)[current.id];
    const canProceed = current.type === "stars" ? Number(value) > 0 : current.optional ? true : String(value).trim().length > 0;

    const set = (id: string, v: number | string) => setAnswers((a) => ({ ...a, [id]: v }));
    const next = () => { setDir(1); setStep((s) => Math.min(total - 1, s + 1)); };
    const back = () => { setDir(-1); setStep((s) => Math.max(0, s - 1)); };

    const submit = async () => {
        setSubmitting(true);
        const { error } = await sendFeedback({ ...answers, coffee: coffeeClicked });
        setSubmitting(false);
        if (error) { toast.error(error); return; }
        toast.success("Thanks for the feedback! 🙏");
        setDone(true);
    };

    const CoffeeButton = ({ className = "" }: { className?: string }) => (
        <a
            href={PAYPAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCoffee}
            className={`group inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-gold hover:bg-gold hover:text-white ${className}`}
        >
            <FaMugHot className="text-base transition-transform group-hover:-translate-y-0.5" />
            Buy me a coffee
        </a>
    );

    return (
        <section id="feedback" className="w-full max-w-[760px] scroll-mt-28 px-4 pb-10">
            <SectionHeading index="06" kicker="feedback">your thoughts</SectionHeading>

            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white/55 p-8 dark:bg-white/[0.04] sm:p-12">
                <AnimatePresence mode="wait" initial={false}>
                    {/* ---------- Intro ---------- */}
                    {!started && !done && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="text-center"
                        >
                            <h3 className="text-3xl font-black lowercase tracking-tight text-ink sm:text-4xl">
                                enjoyed the site<span className="text-gold">?</span>
                            </h3>
                            <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink/65">
                                Drop a quick rating — five short questions, under a minute, and it genuinely helps me
                                make this better. Or fuel the next late-night build. ☕
                            </p>
                            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <button
                                    onClick={() => setStarted(true)}
                                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-surface transition-colors hover:bg-gold sm:w-auto"
                                >
                                    Give me feedback
                                    <BsArrowRight className="transition-transform group-hover:translate-x-1" />
                                </button>
                                <CoffeeButton className="w-full sm:w-auto" />
                            </div>
                        </motion.div>
                    )}

                    {/* ---------- Thank you ---------- */}
                    {done && (
                        <motion.div
                            key="done"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="text-center"
                        >
                            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-2xl">🙏</div>
                            <h3 className="text-3xl font-black lowercase tracking-tight text-ink">thank you<span className="text-gold">.</span></h3>
                            <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink/65">
                                Your feedback just landed in my inbox — I really appreciate you taking the time.
                            </p>
                            <div className="mt-8 flex justify-center">
                                <CoffeeButton />
                            </div>
                        </motion.div>
                    )}

                    {/* ---------- Questionnaire ---------- */}
                    {started && !done && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            {/* progress */}
                            <div className="mb-8 flex items-center gap-4">
                                <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
                                    <motion.div
                                        className="h-full rounded-full bg-gold"
                                        initial={false}
                                        animate={{ width: `${((step + 1) / total) * 100}%` }}
                                        transition={{ duration: 0.4, ease: EASE }}
                                    />
                                </div>
                                <span className="text-xs font-bold tracking-[0.2em] text-ink/45">
                                    {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                                </span>
                            </div>

                            <div className="min-h-[180px]">
                                <AnimatePresence mode="wait" custom={dir}>
                                    <motion.div
                                        key={step}
                                        custom={dir}
                                        initial={{ opacity: 0, x: dir * 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: dir * -40 }}
                                        transition={{ duration: 0.28, ease: EASE }}
                                    >
                                        <h3 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">{current.q}</h3>
                                        {current.hint && <p className="mt-1 text-sm text-ink/50">{current.hint}</p>}

                                        <div className="mt-6">
                                            {current.type === "stars" ? (
                                                <Stars value={Number(value)} onChange={(n) => set(current.id, n)} />
                                            ) : (
                                                <textarea
                                                    value={String(value)}
                                                    onChange={(e) => set(current.id, e.target.value)}
                                                    placeholder="Type your answer…"
                                                    maxLength={2000}
                                                    className="h-28 w-full resize-none border-0 border-b border-ink/20 bg-transparent py-2 text-ink placeholder:text-ink/40 transition-colors focus:border-gold focus:outline-none"
                                                />
                                            )}
                                        </div>

                                        {isLast && (
                                            <input
                                                type="text"
                                                value={answers.name}
                                                onChange={(e) => set("name", e.target.value)}
                                                placeholder="Your name (optional)"
                                                maxLength={120}
                                                className="mt-6 w-full border-0 border-b border-ink/20 bg-transparent py-2 text-ink placeholder:text-ink/40 transition-colors focus:border-gold focus:outline-none"
                                            />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* nav */}
                            <div className="mt-8 flex items-center justify-between">
                                <button
                                    onClick={back}
                                    disabled={step === 0}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60 transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                    <BsArrowLeft /> Back
                                </button>

                                {isLast ? (
                                    <button
                                        onClick={submit}
                                        disabled={submitting}
                                        className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-surface transition-colors hover:bg-gold disabled:opacity-60"
                                    >
                                        {submitting ? (
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-surface/40 border-t-surface" />
                                        ) : (
                                            <>Submit <FiSend /></>
                                        )}
                                    </button>
                                ) : (
                                    <button
                                        onClick={next}
                                        disabled={!canProceed}
                                        className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-surface transition-colors hover:bg-gold disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Next <BsArrowRight />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Feedback;
