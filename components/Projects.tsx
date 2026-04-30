"use client";
//Try to not use it here because it's not necessary other than projectCard component. Maybe make a new file for it.

import { useActiveSectionView } from '@/hooks/hooks';
import { projectsData } from '@/lib/data';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import { AiOutlineLink } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
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

const ProjectCard = ({ title, description, tags, imageUrl, projectUrl }: ProjectCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["0 1", "1.1 1"]
    })

    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.85, 1])
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1])

    const { ref } = useActiveSectionView("Projects", 0.5);

    return (
        <motion.div 
            style={{
                scale: scaleProgress,
                opacity: opacityProgress,
            }}
            className='group mb-12 last:mb-0 max-w-[55rem] mx-auto'
        >
            <section 
                ref={cardRef} 
                className='relative bg-white/80 backdrop-blur-md dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500'
            >
                <div className='flex flex-col sm:flex-row h-full'>
                    <div className='flex flex-col p-6 sm:p-12 sm:w-[50%] h-full group-even:sm:order-2'>
                        <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4'>{title}</h3>
                        <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6'>{description}</p>
                        
                        <ul className='flex flex-wrap gap-2 mb-8'>
                            {tags.map((tag, index) => (
                                <li key={index} className='bg-primary-500/10 text-primary-600 dark:text-primary-400 text-[0.65rem] sm:text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider'>
                                    {tag}
                                </li>
                            ))}
                        </ul>

                        <div className='mt-auto flex items-center gap-3 sm:gap-4'>
                            <Link 
                                href={projectUrl} 
                                target='_blank'
                                className='flex items-center gap-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg'
                            >
                                Live Demo <AiOutlineLink className="text-lg sm:text-xl" />
                            </Link>
                            <Link 
                                href={projectUrl} 
                                target='_blank'
                                className='p-2.5 sm:p-3 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all active:scale-90'
                            >
                                <BsGithub size={22} className="text-gray-700 dark:text-gray-300 sm:size-[24px]" />
                            </Link>
                        </div>
                    </div>

                    <div className='relative sm:w-[50%] h-[240px] sm:h-auto overflow-hidden group-even:sm:order-1'>
                        <Image 
                            src={imageUrl} 
                            alt={title} 
                            quality={95} 
                            className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 sm:hidden'>
                             <span className="text-white font-bold text-base">View Project</span>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}


export default Projects
