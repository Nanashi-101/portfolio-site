"use client";

import React from "react";
import { SectionHeading } from "./section-heading";
import { useActiveSectionView } from "@/hooks/hooks";
import { motion } from "framer-motion";
import { FiLayout, FiDatabase, FiTool } from "react-icons/fi";

const categories = [
  {
    title: "Frontend",
    icon: FiLayout,
    skills: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion", "SCSS", "JavaScript", "HTML"],
  },
  {
    title: "Backend & DB",
    icon: FiDatabase,
    skills: ["Node.js", "Express", "MongoDB", "Prisma"],
  },
  {
    title: "Tools & Others",
    icon: FiTool,
    skills: ["Git", "Redux", "Vercel", "Cloudflare"],
  },
];

const Skills = () => {
  const { ref } = useActiveSectionView("Skills", 0.1);

  return (
    <section
      ref={ref}
      id="skills"
      className="mb-28 mt-24 w-full max-w-[1100px] scroll-mt-28 px-4 sm:my-40"
    >
      <SectionHeading index="01" kicker="toolkit">skills</SectionHeading>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-ink/10 bg-white/55 dark:bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-gold/50"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink/5 text-gold">
                  <Icon size={20} />
                </span>
                <h3 className="text-lg font-bold lowercase tracking-tight text-ink">{cat.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <li
                    key={skill}
                    className="cursor-default rounded-lg border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink/70 transition-colors duration-200 hover:border-gold hover:text-gold"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
