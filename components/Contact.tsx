"use client";

import { sendEmail } from "@/actions/sendEmail";
import ArrowButton from "@/components/common/ArrowButton";
import { useWarsawTime } from "@/components/FooterCTA";
import logo from "@/public/logo.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";

const socials = [
  { href: "https://www.linkedin.com/in/soumyadip-sanyalxxiii/", label: "LinkedIn", Icon: BsLinkedin },
  { href: "https://github.com/Nanashi-101", label: "GitHub", Icon: BsGithub },
  { href: "https://www.instagram.com/ign._.kratos", label: "Instagram", Icon: BsInstagram },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function SendButton() {
  const { pending } = useFormStatus();
  return (
    <ArrowButton type="submit" size="lg" loading={pending} aria-label="Send message">
      send it!
    </ArrowButton>
  );
}

const Field = ({
  n,
  label,
  children,
}: {
  n: string;
  label: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, ease: EASE }}
    className="border-b border-ink/15 py-8 sm:py-10"
  >
    <div className="flex gap-6">
      <span className="pt-1 text-sm text-ink/30">{n}</span>
      <div className="flex-1">
        <label className="mb-3 block text-lg text-ink/80 sm:text-xl">{label}</label>
        {children}
      </div>
    </div>
  </motion.div>
);

const inputClass =
  "w-full bg-transparent text-base text-ink placeholder:text-ink/30 focus:outline-none sm:text-lg";

const Contact = () => {
  const time = useWarsawTime();
  const [formKey, setFormKey] = useState(0);

  return (
    <section className="w-full text-ink">
      <div className="mx-auto max-w-[1240px] px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
        {/* heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-4xl text-[11vw] font-medium leading-[1.08] tracking-tight sm:text-[4.5rem]"
        >
          <span className="mr-4 inline-flex items-center align-middle">
            <span className="relative inline-flex h-[10vw] w-[10vw] max-h-20 max-w-20 items-center justify-center overflow-hidden rounded-full bg-[#f0ede8] shadow-[0_0_0_2px_rgba(28,28,28,0.08)] dark:bg-[#1c1c1c] dark:shadow-[0_0_0_2px_rgba(255,255,255,0.06)]">
              <Image src={logo} alt="Soumyadip Sanyal logo" fill sizes="96px" className="object-contain p-2" priority />
            </span>
          </span>
          let&apos;s work
          <br />
          together<span className="text-gold">.</span>
        </motion.h1>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_320px] lg:gap-24">
          {/* form */}
          <form
            key={formKey}
            action={async (formData) => {
              const { error } = await sendEmail(formData);
              if (error) {
                toast.error(typeof error === "string" ? error : "Something went wrong.");
                return;
              }
              toast.success("Message sent successfully!");
              setFormKey((k) => k + 1); // reset fields
            }}
            className="border-t border-ink/15"
          >
            <Field n="01" label="What's your name?">
              <input
                className={inputClass}
                type="text"
                name="senderName"
                placeholder="John Doe *"
                maxLength={50}
                required
              />
            </Field>
            <Field n="02" label="What's your email?">
              <input
                className={inputClass}
                type="email"
                name="senderEmail"
                placeholder="john@doe.com *"
                required
              />
            </Field>
            <Field n="03" label="What can I help you with?">
              <textarea
                className={`${inputClass} h-36 resize-none`}
                name="senderMsg"
                placeholder="Hello Soumyadip, I have an idea for a project…*"
                maxLength={5000}
                required
              />
            </Field>

            <div className="flex justify-end pt-10">
              <SendButton />
            </div>
          </form>

          {/* details column */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            className="flex flex-col gap-10"
          >
            <div>
              <h2 className="mb-4 text-[0.65rem] uppercase tracking-[0.25em] text-ink/40">contact details</h2>
              <a
                href="mailto:soumyadipsanyal2017@gmail.com"
                className="inline-block break-all text-sm text-ink/85 transition-colors hover:text-gold sm:text-base"
              >
                soumyadipsanyal2017@gmail.com
              </a>
            </div>

            <div>
              <h2 className="mb-4 text-[0.65rem] uppercase tracking-[0.25em] text-ink/40">location</h2>
              <p className="text-sm text-ink/85 sm:text-base">Warsaw, Poland</p>
              <p className="mt-1 text-sm text-ink/50" suppressHydrationWarning>{time || "—"} local</p>
            </div>

            <div>
              <h2 className="mb-4 text-[0.65rem] uppercase tracking-[0.25em] text-ink/40">socials</h2>
              <div className="flex flex-col gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-fit items-center gap-2 text-sm text-ink/85 transition-colors hover:text-gold sm:text-base"
                  >
                    <Icon size={15} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        <p className="mt-20 border-t border-ink/10 pt-8 text-center text-[0.7rem] text-ink/35">
          © 2026 Soumyadip Sanyal · Built with Next.js, TypeScript, Tailwind CSS, Framer Motion &amp; GSAP
        </p>
      </div>
    </section>
  );
};

export default Contact;
