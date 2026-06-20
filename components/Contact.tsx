"use client";

import { useState } from "react";
import { sendEmail } from "@/actions/sendEmail";
import { useActiveSectionView } from "@/hooks/hooks";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import SubmitButton from "./submit-btn";
import toast from "react-hot-toast";

const Contact = () => {
  const { ref } = useActiveSectionView("Contact");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");

  const inputClass =
    "w-full border-0 border-b border-ink/20 bg-transparent py-3 text-ink placeholder:text-ink/40 transition-colors focus:border-gold focus:outline-none";

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="w-full max-w-[640px] scroll-mt-28 px-4 pb-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <SectionHeading index="05" kicker="contact">let&apos;s connect</SectionHeading>

      <p className="-mt-6 text-center text-ink/65">
        Have a project in mind or just want to say hi? Email me at{" "}
        <a
          className="font-semibold text-gold underline-offset-4 hover:underline"
          href="mailto:soumyadipsanyal2017@gmail.com"
        >
          soumyadipsanyal2017@gmail.com
        </a>{" "}
        or use the form below.
      </p>

      <form
        action={async (formData) => {
          const { error } = await sendEmail(formData);
          if (error) {
            toast.error(typeof error === "string" ? error : "Something went wrong.");
            return;
          }
          toast.success("Message sent successfully!");
          setName("");
          setMail("");
          setMessage("");
        }}
        className="mt-10 flex flex-col gap-7"
      >
        <input
          className={inputClass}
          type="text"
          name="senderName"
          placeholder="Your name"
          maxLength={50}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={inputClass}
          type="email"
          name="senderEmail"
          placeholder="Your email"
          required
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <textarea
          className={`${inputClass} h-32 resize-none`}
          name="senderMsg"
          placeholder="Your message"
          maxLength={5000}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <SubmitButton />
          <button
            type="button"
            onClick={() => {
              if (!name && !mail && !message) {
                toast.error("Form is already empty!");
              } else {
                setName(""); setMail(""); setMessage("");
                toast.success("Form cleared.");
              }
            }}
            className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-gold hover:text-gold"
          >
            Clear
          </button>
        </div>
      </form>
    </motion.section>
  );
};

export default Contact;
