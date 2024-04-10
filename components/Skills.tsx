"use client";


import React from 'react'
import SectionHeading from './section-heading'
import { skillsData } from '@/lib/data'
import { useActiveSectionView } from '@/hooks/hooks'
import { animate, motion } from 'framer-motion'

const Skills = () => {
  const {ref, inView}  = useActiveSectionView("Skills", 0.2);

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
    hover:{
        scale: 1.1,
        transition: {
            duration: 0.2
        }
    }
  }
  return (
    <section ref={ref} className='mt-[10rem] mb-28 max-w-[45rem] text-center sm:mb-40 sm:mt-28 scroll-mt-[15.5rem]' id='skills'>
      <SectionHeading>my skills</SectionHeading>
      <ul className='flex flex-wrap items-center justify-center gap-2 gap-y-2 text-lg'>
        {skillsData.map((skill, index) => (
            <motion.li key={index} className='mb-3 text-gray-600 bg-gray-200 font-medium px-4 py-2 rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-800 transition-colors duration-300 ease-in-out dark:bg-white/10 dark:hover:bg-white/20 dark:text-white/70 dark:hover:text-white/80'
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
  )
}

export default Skills
