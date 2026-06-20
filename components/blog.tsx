"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import blogPic from "@/public/blog_site_pic.png";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";

const Blogs = () => {
  return (
    <section className="w-full max-w-[1100px] scroll-mt-28 px-4 py-10">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-10 bg-gold/50" />
            journal
          </div>
          <h2 className="text-4xl font-black lowercase tracking-tight text-ink sm:text-5xl">
            i write about<br />what i build<span className="text-gold">.</span>
          </h2>
          <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink/65">
            Notes, deep-dives and tutorials on Next.js, React and modern web
            development — straight from the projects I&apos;m shipping.
          </p>
          <Link
            href="https://blog-site-theta-sooty.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-gold"
          >
            Read the blog
            <BsArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="group overflow-hidden rounded-2xl border border-ink/10"
        >
          <Image
            src={blogPic}
            alt="Soumyadip's blog"
            className="h-auto w-full object-cover transition-all duration-700 ease-out lg:grayscale lg:group-hover:scale-[1.03] lg:group-hover:grayscale-0"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Blogs;
