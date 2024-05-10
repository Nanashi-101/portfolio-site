"use client";

import { useActiveSectionView } from "@/hooks/hooks";
import { motion } from "framer-motion";
import { AboutHeading } from "./section-heading";
import Image from "next/image";
import myimg from "@/public/Me_croped.jpg";
import { IoLogoWhatsapp } from "react-icons/io";
import {
  BsDiscord,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";

const About = () => {
  const { ref, inView } = useActiveSectionView("About");
  return (
    <motion.section
      className="mb-[9rem] mt-[2rem] max-w-[1240px] flex flex-col lg:flex-row gap-8 lg:gap-0 items-center justify-center text-justify leading-8 p-8 sm:mb-28 sm:mt-10 scroll-mt-[6.5rem] sm:scroll-mt-[12.2rem]"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175, duration: 0.3 }}
      id="about"
      ref={ref}
    >
      <div className="w-full lg:w-[45%] mx-auto flex items-center">
        <Image
          src={myimg}
          alt="my-pfp"
          className="w-full lg:w-[90%] rounded-lg shadow-xl"
        />
      </div>
      <div className="w-full lg:w-[55%] flex flex-col justify-center">
        <AboutHeading>about me</AboutHeading>
        <div className="flex flex-col gap-5">
          <p className="mb-3 tracking-tighter">
            After graduating from highschool back in{" "}
            <span className="font-medium">India</span>, I decided to pursue my
            dream of moving abroad. So, I enrolled in{" "}
            <span className="font-medium">Vistula University</span> in Poland
            and started learning{" "}
            <span className="font-medium">full-stack web development</span>along
            with my college course.{" "}
            <span className="italic">The thing I love about programming</span>{" "}
            is the problem-solving aspect. I{" "}
            <span className="font-medium uppercase underline">love</span> the
            feeling of finally figuring out a solution to a problem. My core
            stack is{" "}
            <span className="font-medium">
              React, Next.js, Node.js, and MongoDB
            </span>
            . I am also familiar with TypeScript and recently I have started
            taking interest in the field of{" "}
            <span className="font-medium italic">Web-designing</span>. I am
            always looking to learn new technologies related to{" "}
            <span className="font-medium ">scalability & performance</span> to
            improve more'n more everyday. I am currently looking for a{" "}
            <span className="font-medium">full-time position</span> as a
            software developer.
          </p>
          <p>
            <span className="italic">When I'm not coding</span>, I enjoy playing
            video games, watching movies, and playing with my dog. I also enjoy
            reading books on{" "}
            <span className="font-medium italic">Sci-fi & Adventure</span>.
            Also, I am a huge fan of{" "}
            <span className="font-medium underline">Music</span>.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <h1 className="text-xl font-medium tracking-tight mr-10">
              Follow me on:
            </h1>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/Soumyadip.2024"
                className="flex bg-white text-black p-4 rounded-full gap-2 items-center justify-center duration-300 hover:scale-110 focus:scale-110 active:scale-100 cursor-pointer shadow-lg border border-black/10 dark:bg-white/10 dark:text-white/80"
                target="_main"
              >
                <BsFacebook
                  size={20}
                  className="text-[#1877F2] dark:text-white"
                />
              </a>
              <a
                href="https://www.instagram.com/ign._.kratos"
                className="flex bg-white text-black p-4 rounded-full gap-2 items-center justify-center duration-300 hover:scale-110 focus:scale-110 active:scale-100 cursor-pointer shadow-lg border border-black/10 dark:bg-white/10 dark:text-white/80"
                target="_main"
              >
                <BsInstagram
                  size={20}
                  className="text-[#E1306C] dark:text-white"
                />
              </a>
              <a
                href="https://discord.com/channels/@me"
                className="flex bg-white text-black p-4 rounded-full gap-2 items-center justify-center duration-300 hover:scale-110 focus:scale-110 active:scale-100 cursor-pointer shadow-lg border border-black/10 dark:bg-white/10 dark:text-white/80"
                target="_main"
              >
                <BsDiscord
                  size={20}
                  className="text-[#9656CE] dark:text-white"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
