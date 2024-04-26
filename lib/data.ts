import React from "react";
import { MdOutlineWork } from "react-icons/md";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { FaUserGraduate } from "react-icons/fa";
import krypto from "@/public/Krypto.png";
import nexcapstudio from "@/public/nexcapstudio.png";
import ImageGallery from "@/public/image gallery.png";
import WillBeThere from "@/public/willbethere.png";
import { FaLaptopCode } from "react-icons/fa6";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Graduated Highschool",
    location: "West Bengal, India",
    description:
      "I graduated from highschool. I immediately decided to start working to become a front-end developer.",
    icon: React.createElement(FaUserGraduate),
    date: "2023",
  },
  {
    title: "Front-End Developer",
    location: "Warsaw, Poland",
    description:
      "I worked as a front-end developer for 1 month for some of my friends who were starting a new project. I used HTML, CSS and JavaScript(React) to build the websites for them.",
    icon: React.createElement(MdOutlineWork),
    date: "2023 - 2024",
  },
  {
    title: "Front-end Developer",
    location: "Warsaw, Poland",
    description:
      "I joined a hackathon hosted by AritDeveloper, from Nigeria, where I worked as a Front-end developer. I used React, Tailwind and Framer Motion to build the projects and served as an acting QA, near the end of the contest for my team.",
    icon: React.createElement(FaLaptopCode),
    date: "03/2024 - 04/2024",
  },
  {
    title: "Full-Stack Developer",
    location: "Warsaw, Poland",
    description:
      "I'm now upgrading my skills to become a full-stack developer. I'm learning Node.js, Express and MongoDB to become a full-stack developer. I'm also learning TypeScript to improve my JavaScript skills.",
    icon: React.createElement(FaReact),
    date: "2024 - present",
  },
] as const;

export const projectsData = [
  {
    title: "€rypto",
    description:
      "I worked on this front-end project as my first react project. It's just a one page prototype for a crypto website.",
    tags: ["React", "JavaScript", "Tailwind", "Framer"],
    imageUrl: krypto,
    projectUrl: "https://responsive-site-inky.vercel.app",
  },
  {
    title: "NeXCap Studio",
    description:
      "This is a front-end project that I made for one of friend, who wants to pursue a career in photography. It's a portfolio website for him to attract clients.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind"],
    imageUrl: nexcapstudio,
    projectUrl: "https://photography-site-gilt.vercel.app",
  },
  {
    title: "Image Gallery",
    description:
      "This is very basic Image Gallery project that I made to learn how to use tailwind to make creative designs. I also used framer motion to add some animations.",
    tags: ["React", "Tailwind", "Framer"],
    imageUrl: ImageGallery,
    projectUrl: "https://github.com/Nanashi-101/image_gallery.git",
  },
  {
    title: "Will be there",
    description:
      "This is a hackathon project that I made with my friends. It's a RSVP website that helps people to host and join events. I worked as the lead frontend dev in this project. ",
    tags: ["React", "Tailwind", "Framer"],
    imageUrl: WillBeThere,
    projectUrl: "https://github.com/Nanashi-101/AritDeveloperHackathon-group19-starred",
  },
] as const;

export const skillsData = [
  "HTML",
  "SCSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "MongoDB",
  "Express",
  "Redux",
  "Framer Motion",
] as const;