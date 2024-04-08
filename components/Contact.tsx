"use client";

import React from 'react'
import SectionHeading from './section-heading'
import { FaPaperPlane } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useActiveSectionView } from '@/hooks/hooks';

const Contact = () => {
    const {ref, inView} = useActiveSectionView("Contact");
  return (
    <motion.section className='mb-28 mt-28 sm:mb-28 sm:mt-32 w-[min(100%, 38rem)]' id="contact"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    ref={ref}
    >
        <SectionHeading>Let's connect</SectionHeading>
        <p className='text-center text-black font-normal -mt-6'>You contact me at{" "}<a className='underline font-medium text-md hover:text-blue-900 transition-all' href="mailto:soumyadipsanyal2017@gmail.com">Soumyadipsanyal2017@gmail.com</a>{" "}or fill in this form:</p>
        <form action="" className='flex flex-col mt-8 gap-5'>
            <input className='h-14 px-5 py-3 bg-gray-200 rounded-xl border border-black/10 text-gray-900 text-lg font-medium placeholder:text-gray-500 focus:placeholder:text-gray-900' type="text" placeholder='Your Name' />
            <input className='h-14 px-5 py-3 bg-gray-200 rounded-xl border border-black/10 text-gray-900 text-lg font-medium placeholder:text-gray-500 focus:placeholder:text-gray-900' type="email" placeholder="Your email" id="" />
            <textarea className='h-52 px-5 py-3 bg-gray-200 rounded-xl border border-black/10 text-gray-900 text-lg font-medium placeholder:text-gray-500 focus:placeholder:text-gray-900' name="" placeholder='Your message'></textarea>
            <button className='group bg-gray-700 text-white text-lg font-medium flex items-center justify-center gap-2 w-[180px] outline-none px-3 py-3 rounded-full text-center hover:tracking-wider hover:bg-gray-900 hover:scale-110 focus:scale-110 active:scale-105 transition-all' type='submit'>Send<FaPaperPlane className='text-base opacity-75 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all'/></button>
        </form>
    </motion.section>
  )
}

export default Contact
