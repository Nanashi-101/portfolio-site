"use client";
//Try to not use it here because it's not necessary other than projectCard component. Maybe make a new file for it.

import React, { useRef } from 'react'
import SectionHeading from './section-heading'
import { projectsData } from '@/lib/data'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

const Projects = () => {
    return (
        <div id='projects'>
            <SectionHeading>my projects</SectionHeading>
            <div className=''>
                {
                    projectsData.map
                        (
                            (project, index) =>
                            (
                                <React.Fragment key={index}>
                                    <ProjectCard {...project} id={index} />
                                </React.Fragment>
                            )
                        )
                }
            </div>
        </div>
    )
}

type ProjectCardProps = typeof projectsData[number];
type ProjectCardIndex = number;

const ProjectCard = ({ title, description, tags, imageUrl }: ProjectCardProps, id: ProjectCardIndex) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["0 1", "1.33 1"]
        //! So, this is the offset value that we need to pass to the useScroll hook from framer-motion. The two number inside the quotes represents viewport and target positions. The firs-value:("0 1": 0->bottom-of-viewport, 1->start-of-target).
    })

    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1])
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1])

    return (
        <motion.div style={{
            scale: scaleProgress,
            opacity: opacityProgress,
        }}
            className='group mb-5 sm:mb-8 last:mb-0'
        >
            <section ref={cardRef} className='relative bg-gray-100 max-w-[42rem] overflow-hidden border border-black/5 rounded-lg shadow-lg sm:pr-8 sm:h-[20rem] hover:bg-gray-200 transition-all '>
                <div className='flex flex-col pt-4 pb-6 px-5 sm:pl-10 sm:pr-2 sm:pt-10 h-full sm:max-w-[50%] group-even:sm:ml-[20rem]'>
                    <h3 className='text-2xl font-semibold'>{title}</h3>
                    <p className='mt-2 leading-relaxed text-gray-700 w-full'>{description}</p>
                    <ul className='flex gap-3 flex-wrap items-center mt-4 sm:mt-auto'>
                        {
                            tags.map((tag, index) => <li key={index} className='bg-black/[0.7] text-white text-[0.7rem] px-3 py-1 uppercase rounded-full tracking-wide'>{tag}</li>)
                        }
                    </ul>
                </div>
                <Image src={imageUrl} alt={title} quality={95} className='sm:absolute top-12 -right-40 w-[29.45rem] h-[17rem] rounded-t-xl shadow-2xl object-fill 
                group-even:sm:right-[initial] group-even:sm:-left-40
                group-hover:sm:scale-105 
                group-hover:sm:-translate-x-3 group-hover:sm:translate-y-3 group-hover:sm:-rotate-3 
                
                group-even:group-hover:sm:translate-x-3 
                group-even:group-hover:sm:translate-y-3 
                group-even:group-hover:sm:rotate-3
                transition-all'/>
            </section>
        </motion.div>
    )
}


/*
group-even:sm:right-[initial] group-even:sm:-left-40

group-even:sm:ml-[20rem]

group-even:group-hover:sm:translate-x-3 
group-even:group-hover:sm:translate-y-3 
group-even:group-hover:sm:rotate-3
*/

export default Projects
