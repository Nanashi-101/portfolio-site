"use client";


import React from 'react'
import {SectionHeading} from './section-heading'
import { skillsData } from '@/lib/data'
import { useActiveSectionView } from '@/hooks/hooks'
import { animate, motion } from 'framer-motion'

const Skills = () => {
  const { ref, inView } = useActiveSectionView("Skills", 0.2);

  const fadeAnimation = {
    initial: { opacity: 0, y: 100 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        delay: 0.05 * index,
      }
    }),
  }
  return (
    <div className="relative max-w-[45rem]">
      {/* <div className="bg-[#717fffda] absolute top-[8rem] left-1/2 -translate-x-1/2 h-[15.25rem] -z-10  max-w-[45rem] rounded-full blur-[30rem] sm:w-[68.75rem]"/> */}
      <section ref={ref} className='mt-[10rem] mb-28 w-full text-center sm:my-40 scroll-mt-[15.5rem]' id='skills'>
        <SectionHeading>my skills</SectionHeading>
        <ul className='flex flex-wrap items-center justify-center gap-2 gap-y-2 text-[0.725rem] md:text-md sm:text-xl'>
          {skillsData.map((skill, index) => (
            <motion.li key={index} className='mb-3 text-gray-600 bg-white font-medium px-4 py-2 rounded-full cursor-text h transition-colors duration-300 ease-in-out dark:bg-white/10 dark:text-white/70'
              variants={fadeAnimation}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{
                once: true
              }}
              custom={index}
            >
              {skill}
            </motion.li>

          ))}
        </ul>
      </section>
    </div>
  )
}

export default Skills
