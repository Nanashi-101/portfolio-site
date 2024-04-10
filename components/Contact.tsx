"use client";

import { useState } from 'react';
import { sendEmail } from '@/actions/sendEmail';
import { useActiveSectionView } from '@/hooks/hooks';
import { motion } from 'framer-motion';
import SectionHeading from './section-heading';
import SubmitButton from './submit-btn';
import toast from 'react-hot-toast';


const Contact = () => {
  const { ref, inView } = useActiveSectionView("Contact");
  const [name, setName] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  return (
    <motion.section className='mb-28 mt-28 sm:mb-28 sm:mt-32 w-[min(100%, 38rem)] scroll-mt-[10rem]' id="contact"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{
        once: true
      }}
      ref={ref}
    >
      <SectionHeading>Let's connect</SectionHeading>
      <p className='text-center font-normal -mt-6'>You contact me at{" "}<a className='underline font-medium text-md hover:text-blue-900 transition-all' href="mailto:soumyadipsanyal2017@gmail.com">Soumyadipsanyal2017@gmail.com</a>{" "}or fill in this form:</p>
      <form action={async FormData => {
        setName('');
        setMail('');
        setMessage('');
        const { data, error } = await sendEmail(FormData);
        toast.success("Email sent successfully!");
      }}
        className='flex flex-col mt-8 gap-5'>
        <input className='h-14 px-5 py-3 bg-gray-200 dark:bg-white/20 dark:placeholder:text-white/80 rounded-xl border border-black/10 text-gray-900 text-lg font-medium placeholder:text-gray-500 focus:placeholder:text-gray-900' type="text" placeholder='Your Name' maxLength={50} name='senderName' required value={name} onChange={name => setName(name.target.value)} />
        <input className='h-14 px-5 py-3 bg-gray-200 dark:bg-white/20 dark:placeholder:text-white/80 rounded-xl border border-black/10 text-gray-900 text-lg font-medium placeholder:text-gray-500 focus:placeholder:text-gray-900' type="email" placeholder="Your email" id="" name='senderEmail' required value={mail} onChange={mail => setMail(mail.target.value)} />
        <textarea className='h-52 px-5 py-3 bg-gray-200 dark:bg-white/20 dark:placeholder:text-white/80 rounded-xl border border-black/10 text-gray-900 text-lg font-medium placeholder:text-gray-500 focus:placeholder:text-gray-900' name="senderMsg" placeholder='Your message' value={message} maxLength={5000} onChange={message => setMessage(message.target.value)}></textarea>
        <div className='flex items-center justify-center'>
          <SubmitButton />
        </div>
      </form>
    </motion.section>
  )
}

export default Contact
