import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import React from "react";

interface skillCardProps {
  children: React.ReactNode;
  img: StaticImageData;
}

const SkillCard = ({ children, img }: skillCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="group flex items-center justify-center p-1"
    >
      <div className="flex flex-col justify-center items-center text-center gap-6 bg-white/70 backdrop-blur-xl dark:bg-white/5 border border-white/20 dark:border-white/10 w-full min-h-[180px] p-6 rounded-3xl shadow-xl shadow-black/5 hover:shadow-primary-500/10 transition-all duration-300">
        <div className="relative">
          <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <Image src={img} alt="Skill" className="w-14 h-14 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110" />
        </div>
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{children}</h3>
      </div>
    </motion.div>
  );
};

export default SkillCard;
