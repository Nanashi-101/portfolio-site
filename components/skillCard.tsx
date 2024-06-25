import Image, { StaticImageData } from "next/image";
import React from "react";

interface skillCardProps {
  children: React.ReactNode;
  img: StaticImageData;
}

const SkillCard = ({ children, img }: skillCardProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col justify-center items-center text-center gap-8 md:gap-12 backdrop-blur-md dark:bg-white/20 bg-white/70 w-[185px] md:w-[240px] md:h-80 p-3 md:px-10 md:py-6 rounded-lg my-6 drop-shadow-lg">
        <Image src={img} alt="Skill" className="w-[70px] sm:w-[300px]" />
        <h1 className="font-medium text-sm md:text-xl">{children}</h1>
      </div>
    </div>
  );
};

export default SkillCard;
