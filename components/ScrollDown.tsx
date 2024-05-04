"use client";

import React from 'react'
import { IoIosArrowRoundDown } from "react-icons/io";
import { motion } from 'framer-motion'
import Link from 'next/link';

const ScrollDown = () => {
  return (
    <motion.div className='mb-10 sm:my-[5.4rem] h-16 flex items-center justify-center'
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{delay:0.225, duration: 0.3 }}>
      <Link href={"#skills"}><IoIosArrowRoundDown size={70} className='bg-gray-100/50 dark:bg-gray-100/20 rounded-full p-2 animate-bounce dark:text-gray-100 font-semibold cursor-pointer scroll-mt-10 shadow-md'/></Link>
    </motion.div>
  )
}

export default ScrollDown
