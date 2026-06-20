"use client";

import React from 'react';
import { motion } from 'framer-motion';

const SectionDivider = () => {
  return (
    <motion.div
      className="my-20 hidden h-px w-24 bg-ink/15 sm:block"
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    />
  );
};

export default SectionDivider;
