"use client";

import { useState } from 'react';
import { sendEmail } from '@/actions/sendEmail';
import { useActiveSectionView } from '@/hooks/hooks';
import { MdOutlineDelete } from "react-icons/md";
import { motion } from 'framer-motion';
import SectionHeading from './section-heading';
import SubmitButton from './submit-btn';
import toast from 'react-hot-toast';
import { BsRecycle } from 'react-icons/bs';


const Contact = () => {
  const { ref, inView } = useActiveSectionView("Contact");
  const [name, setName] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  return (
    <div className="relative w-[min(100%, 38rem)]">
      {/* <div className="bg-[#ff6d79d7] absolute top-[8rem] left-1/2 -translate-x-1/2 h-[15.25rem] -z-10  max-w-[38rem] rounded-full blur-[30rem] sm:w-[68.75rem]"/> */}
      <motion.section className='mb-28 mt-32 sm:mb-28 sm:mt-32 scroll-mt-[7rem] sm:scroll-mt-[10rem]' id="contact"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{
          once: true
        }}
        ref={ref}
      >
        <SectionHeading>Let's connect</SectionHeading>
        <p className='text-center font-normal -mt-6'>You contact me at{" "}<a className='underline font-medium text-md hover:text-blue-900 dark:hover:text-purple-700 transition-all' href="mailto:soumyadipsanyal2017@gmail.com">Soumyadipsanyal2017@gmail.com</a>{" "}or fill in this form:</p>
        <form action={async FormData => {
          setName('');
          setMail('');
          setMessage('');
          const { data, error } = await sendEmail(FormData);
          toast.success("Email sent successfully!");
        }}
          className='flex flex-col mt-8 gap-5'>
          <input className='h-14 px-5 py-3 bg-gray-200 sm:bg-white/60 dark:bg-white/20 dark:placeholder:text-white/80 rounded-xl border border-black/10 text-gray-900 text-lg font-medium placeholder:text-gray-500 focus:placeholder:text-gray-900 dark:text-gray-200' type="text" placeholder='Your Name' maxLength={50} name='senderName' required value={name} onChange={name => setName(name.target.value)} />
          <input className='h-14 px-5 py-3 bg-gray-200 sm:bg-white/60 dark:bg-white/20 dark:placeholder:text-white/80 rounded-xl border border-black/10 text-gray-900 text-lg font-medium placeholder:text-gray-500 focus:placeholder:text-gray-900 dark:text-gray-200' type="email" placeholder="Your email" id="" name='senderEmail' required value={mail} onChange={mail => setMail(mail.target.value)} />
          <textarea className='h-52 px-5 py-3 bg-gray-200 sm:bg-white/60 dark:bg-white/20 dark:placeholder:text-white/80 rounded-xl border border-black/10 text-gray-900 dark:text-gray-200  text-lg font-medium placeholder:text-gray-500 focus:placeholder:text-gray-900 ' name="senderMsg" placeholder='Your message' value={message} maxLength={5000} onChange={message => setMessage(message.target.value)}></textarea>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-4'>
            <SubmitButton />
            <button className='bg-gray-100 border border-black/[0.05] text-lg font-medium flex items-center justify-center gap-2 w-[200px] outline-none px-3 py-3 rounded-full text-center hover:tracking-wider hover:scale-110 focus:scale-110 active:scale-105 transition-all dark:bg-gray-200 dark:hover:bg-gray-100 dark:text-black' onClick={() => {
              if (name.length === 0 && mail.length === 0 && message.length === 0) {
                toast.error("Form is already empty!");
              }
              else {
                setName('');
                setMail('');
                setMessage('');
                toast.success("Form cleared successfully!");
              }
            }}>Clear form<MdOutlineDelete /></button>
          </div>
        </form>
      </motion.section>
    </div>
  )
}

export default Contact
