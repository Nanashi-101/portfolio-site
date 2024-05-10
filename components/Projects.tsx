"use client";
//Try to not use it here because it's not necessary other than projectCard component. Maybe make a new file for it.

import { useActiveSectionView } from '@/hooks/hooks';
import { projectsData } from '@/lib/data';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import { AiOutlineLink } from "react-icons/ai";
import {SectionHeading} from './section-heading';

const Projects = () => {
    return (
        <div className='scroll-mt-[7.5rem] sm:scroll-mt-[13.5rem]' id='projects'>
            <SectionHeading>my projects</SectionHeading>
            <div className=''>
                {
                    projectsData.map
                        (
                            (project, index) =>
                            (
                                <React.Fragment key={index}>
                                    <ProjectCard {...project}/>
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

const ProjectCard = ({ title, description, tags, imageUrl, projectUrl }: ProjectCardProps, id: ProjectCardIndex) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["0 1", "1.33 1"]
        //! So, this is the offset value that we need to pass to the useScroll hook from framer-motion. The two number inside the quotes represents viewport and target positions. The firs-value:("0 1": 0->bottom-of-viewport, 1->start-of-target).
    })

    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1])
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1])

    const {ref, inView} = useActiveSectionView("Projects", 0.5);

    return (
        <motion.div style={{
            scale: scaleProgress,
            opacity: opacityProgress,
        }}
            className='group mb-8 sm:mb-10 last:mb-0 '
            ref={ref}
        >
            <section ref={cardRef} className='relative bg-gray-100 max-w-[25rem] sm:max-w-[42rem] overflow-hidden border border-black/5 rounded-lg shadow-lg sm:pr-8 sm:h-[22rem] hover:bg-gray-200 transition-all group-even:sm:pl-4 dark:bg-white/10 dark:hover:bg-white/20 '>
                <div className='flex flex-col pt-4 pb-6 px-5 sm:pl-10 sm:pr-2 sm:pt-10 h-full sm:max-w-[50%] group-even:sm:ml-[18rem] gap-3'>
                    <Link href={projectUrl} className='flex items-center gap-1 text-2xl font-semibold hover:text-blue-500 hover:underline hover:tracking-wide transition-all ' target='_blank'>{title}<AiOutlineLink/></Link>
                    <p className='mt-2 leading-relaxed text-gray-700 dark:text-white/70 w-full'>{description}</p>
                    <ul className='flex gap-3 flex-wrap items-center mt-4 sm:mt-auto'>
                        {
                            tags.map((tag, index) => <li key={index} className='bg-black/[0.7] text-white text-[0.7rem] px-3 py-1 uppercase rounded-full tracking-wide'>{tag}</li>)
                        }
                    </ul>
                </div>
                <Image onClick={() =>{
                    window.open(projectUrl, "_blank");
                }} src={imageUrl} alt={title} quality={95} className=' hidden sm:block sm:absolute top-[5.7rem] sm:top-[5rem] -right-40 sm:w-[29.95rem] mx-auto sm:mx-0 w-[97.56%] h-[15rem] sm:h-[17rem] rounded-t-xl shadow-slate-950 shadow-2xl object-cover 
                group-even:sm:right-[initial] group-even:sm:-left-[12rem] 
                group-hover:sm:-translate-x-40 
                group-hover:sm:w-full  
                group-hover:sm:top-0 
                group-hover:sm:h-full 
                
                group-even:group-hover:sm:-translate-x-40 
                group-even:group-hover:sm:w-full  
                group-even:group-hover:sm:top-0 
                group-even:group-hover:sm:h-full
                group-even:group-hover:sm:left-40
                transition-all
                duration-500
                cursor-pointer
                '/>
            </section>
        </motion.div>
    )
}


export default Projects
