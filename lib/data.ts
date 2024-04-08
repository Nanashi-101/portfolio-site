import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import krypto from "@/public/Krypto.png";
import nexcapstudio from "@/public/nexcapstudio.png";
import ImageGallery from "@/public/image gallery.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
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
    icon: React.createElement(LuGraduationCap),
    date: "2023",
  },
  {
    title: "Front-End Developer",
    location: "Warsaw, Poland",
    description:
      "I worked as a front-end developer for 1 month for some of my friends who were starting a new project. I used HTML, CSS and JavaScript(React) to build the websites for them.",
    icon: React.createElement(CgWorkAlt),
    date: "2023 - 2024",
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
] as const;

export const skillsData = [
  "HTML",
  "CSS",
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
  "Python",
  "Framer Motion",
] as const;