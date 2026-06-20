"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoIosArrowRoundDown } from "react-icons/io";

const ScrollDown = () => {
  return (
    <motion.div
      className="my-12 flex items-center justify-center sm:my-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      <Link
        href="#skills"
        aria-label="Scroll to content"
        className="group flex flex-col items-center gap-1 text-ink transition-colors hover:text-gold"
      >
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ink/50 transition-colors group-hover:text-gold">
          scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <IoIosArrowRoundDown size={34} />
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default ScrollDown;
