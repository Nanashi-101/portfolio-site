"use client";

import React,{ useEffect, useState } from "react";
import { SectionHeading } from "./section-heading";
import { skillsData } from "@/lib/data";
import { useActiveSectionView } from "@/hooks/hooks";
import { animate, motion } from "framer-motion";
import SkillCard from "./skillCard";
import nextImg from "@/public/next_logo.png";;
import typeImg from "@/public/typescript.png";
import mongoImg from "@/public/mongodb.png";
import nodeImg from "@/public/node.png";
import { StaticImageData } from "next/image";

const Skills = () => {
  const { ref } = useActiveSectionView("Skills", 0.1);

  const categories = [
    {
      title: "Frontend",
      skills: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion", "SCSS", "JavaScript", "HTML"],
      icon: nextImg,
    },
    {
      title: "Backend & DB",
      skills: ["Node.js", "Express", "MongoDB", "Prisma"],
      icon: nodeImg,
    },
    {
      title: "Tools & Others",
      skills: ["Git", "Redux", "Vercel", "Cloudflare"],
      icon: mongoImg,
    }
  ];

  const fadeAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.05 * index,
      },
    }),
  };

  return (
    <section
      ref={ref}
      className="mt-[10rem] mb-28 w-full max-w-[65rem] text-center sm:my-40 scroll-mt-[15.5rem] relative"
      id="skills"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-500/5 blur-[120px] -z-10 rounded-full" />
      
      <SectionHeading>Technical Expertise</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-4">
        {categories.map((category, catIndex) => (
          <motion.div 
            key={category.title}
            custom={catIndex}
            variants={fadeAnimation}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <SkillCard img={category.icon}>{category.title}</SkillCard>
            
            <ul className="flex flex-wrap items-center justify-center gap-2">
              {category.skills.map((skill, index) => (
                <motion.li
                  key={skill}
                  className="bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/10 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:border-primary-500/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
