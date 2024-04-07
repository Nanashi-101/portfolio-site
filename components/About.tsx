"use client";

import { motion } from 'framer-motion'
import React from 'react'
import SectionHeading from './section-heading';


const About = () => {
    return (
        <motion.section className='mb-28 max-w-[50rem] text-center leading-8 sm:mb-40'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{delay: 0.175, duration: 0.3 }}
        >
            <SectionHeading>about me</SectionHeading>
            <p className='mb-3'>After graduating from highschool back in {" "}
                <span className="font-medium">India</span>, I decided to pursue my dream of moving abroad. So, I enrolled in{" "} <span className="font-medium">Vistula University</span> in Poland and started learning{" "}
                <span className="font-medium">full-stack web development</span>along with my college course.{" "}
                <span className="italic">The thing I love about programming</span> is the
                problem-solving aspect. I <span className="font-medium uppercase underline">love</span> the
                feeling of finally figuring out a solution to a problem. My core stack
                is{" "}
                <span className="font-medium">
                    React, Next.js, Node.js, and MongoDB
                </span>
                . I am also familiar with TypeScript and recently I have started taking interest in the field of{" "}
                <span className="font-medium italic">Web-designing</span>. I am always looking to
                learn new technologies related to{" "}
                <span className="font-medium ">scalability & performance</span> to improve more'n more everyday. I am currently looking for a{" "}
                <span className="font-medium">full-time position</span> as a software
                developer.</p>
            <p>
                <span className="italic">When I'm not coding</span>, I enjoy playing
                video games, watching movies, and playing with my dog. I also enjoy
            </p>
        </motion.section>
    )
}

export default About
