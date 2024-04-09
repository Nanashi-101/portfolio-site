"use client";

import React from 'react'
import SectionHeading from './section-heading'
import { FaPaperPlane } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useActiveSectionView } from '@/hooks/hooks';
import { sendEmail } from '@/actions/sendEmail';
import SubmitButton from './submit-btn';


const Contact = () => {
  const {ref, inView} = useActiveSectionView("Contact");
  return (
    <motion.section className='mb-28 mt-28 sm:mb-28 sm:mt-32 w-[min(100%, 38rem)]' id="contact"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{
      once: true
    }}
    ref={ref}
    >
        <SectionHeading>Let's connect</SectionHeading>
        <p className='text-center text-black font-normal -mt-6'>You contact me at{" "}<a className='underline font-medium text-md hover:text-blue-900 transition-all' href="mailto:soumyadipsanyal2017@gmail.com">Soumyadipsanyal2017@gmail.com</a>{" "}or fill in this form:</p>
        <form action={async FormData => {
          await sendEmail(FormData);
        }}
         className='flex flex-col mt-8 gap-5'>
            <input className='h-14 px-5 py-3 bg-gray-200 rounded-xl border border-black/10 text-gray-900 text-lg font-medium placeholder:text-gray-500 focus:placeholder:text-gray-900' type="text" placeholder='Your Name' maxLength={50} name='senderName' required/>
            <input className='h-14 px-5 py-3 bg-gray-200 rounded-xl border border-black/10 text-gray-900 text-lg font-medium placeholder:text-gray-500 focus:placeholder:text-gray-900' type="email" placeholder="Your email" id="" name='senderEmail' required />
            <textarea className='h-52 px-5 py-3 bg-gray-200 rounded-xl border border-black/10 text-gray-900 text-lg font-medium placeholder:text-gray-500 focus:placeholder:text-gray-900' name="senderMsg" placeholder='Your message' maxLength={5000}></textarea>
            <SubmitButton />
        </form>
    </motion.section>
  )
}

export default Contact
