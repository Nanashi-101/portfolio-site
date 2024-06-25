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
  const { ref, inView } = useActiveSectionView("Skills", 0.1);

  const fadeAnimation = {
    initial: { opacity: 0, y: 100 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        delay: 0.05 * index,
      },
    }),
  };

  return (
    <div className="relative max-w-[60rem]">
      <section
        ref={ref}
        className="mt-[10rem] mb-28 w-full text-center sm:my-40 scroll-mt-[15.5rem]"
        id="skills"
      >
        <SectionHeading>my skills</SectionHeading>
        <motion.div className="w-full mx-auto grid grid-cols-2 md:grid-cols-4 justify-center items-center gap-x-[0.369rem] gap-y-0 md:gap-6" variants={fadeAnimation} initial='initial' animate='animate'>
          <SkillCard img={nextImg}>Next.Js</SkillCard>
          <SkillCard img={typeImg}>Typescript</SkillCard>
          <SkillCard img={mongoImg}>MongoDB</SkillCard>
          <SkillCard img={nodeImg}>Node.Js</SkillCard>
        </motion.div>
        <ul className="max-w-[45rem] mx-auto flex flex-wrap items-center justify-center gap-2 gap-y-2 text-[0.725rem] md:text-md sm:text-xl">
          {skillsData.map((skill, index) => (
            <motion.li
              key={index}
              className="mb-3 text-gray-600 bg-white font-medium px-4 py-2 rounded-full cursor-text h transition-colors duration-300 ease-in-out dark:bg-white/10 dark:text-white/70"
              variants={fadeAnimation}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{
                once: true,
              }}
              custom={index}
            >
              {skill}
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Skills;
