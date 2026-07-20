import React from "react";
import { MdOutlineWork } from "react-icons/md";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { FaUserGraduate } from "react-icons/fa";
import krypto from "@/public/Krypto.png";
import nexcapstudio from "@/public/nexcapstudio.png";
import ImageGallery from "@/public/image gallery.png";
import WillBeThere from "@/public/willbethere.png";
import ChromaUI from "@/public/ChromaUi.png"
import Todo from "@/public/Todo.png"
import Lumiere from "@/public/lumiere.jpeg"
import Wanderlust from "@/public/wanderlust.jpeg"
import UniInternship from "@/public/UniInternship.png"
import Viddly from "@/public/Viddly.png"
import { FaLaptopCode } from "react-icons/fa6";

// Route-based navigation (multi-page)
export const navLinks = [
  { name: "home", href: "/" },
  { name: "work", href: "/work" },
  { name: "about", href: "/about" },
  { name: "contact", href: "/contact" },
] as const;

// Legacy in-page sections (kept for the active-section observers)
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
    title: "UniInternship Portal",
    description:
      "A University Internship Management Platform built for students. Connect with top companies, manage applications, and track your internship journey—all in one beautiful, modern platform.",
    tags: ["React", "TypeScript", "Tailwind", "Vite", "Vercel"],
    imageUrl: UniInternship,
    projectUrl: "https://uni-internship-sand.vercel.app",
  },
  {
    title: "Viddly",
    description:
      "A powerful, self-hosted video downloader with user authentication, download history, an in-app player, and support for 1000+ sites including YouTube, Vimeo, Twitter, and TikTok. Powered by yt-dlp.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Kinde Auth", "Railway"],
    imageUrl: Viddly,
    projectUrl: "https://videodownloader-production-1dd2.up.railway.app",
  },
  {
    title: "Wanderlust Journeys",
    description:
      "A dynamic travel platform that helps users discover and compare the best deals across flights, stays, and rentals. Built with a focus on usability, speed, and intuitive navigation.",
    tags: ["NextJs", "Tailwind", "Vercel", "Resend", "Supabase"],
    imageUrl: Wanderlust,
    projectUrl: "https://wonderlust-jet-delta.vercel.app/en",
  },
  {
    title: "Lumiere",
    description:
      "An elegant front-end project focused on clean UI, responsiveness, and user engagement.Combines modern design principles with fast, scalable deployment.",
    tags: ["NextJs", "Tailwind", "Cloudflare", "Vercel"],
    imageUrl: Lumiere,
    projectUrl: "https://lumiere-jet-one.vercel.app",
  },
  {
    title: "ChromaUI",
    description:
      "ChromaUI is a Digital marketplace built with React, Next.js, Tailwind CSS and Supabase. It's a full-stack project to connect marketing with innovation",
    tags: ["NextJs", "Tailwind", "Supabase", "Vercel"],
    imageUrl: ChromaUI,
    projectUrl: "https://chroma-ui-ecru.vercel.app",
  },
  {
    title: "TaskFlow",
    description:
      "This project demonstrates core frontend development skills including state management, user interaction handling, and responsive UI design.",
    tags: ["HTML", "CSS", "SQLite", "JavaScript"],
    imageUrl: Todo,
    projectUrl: "https://github.com/Nanashi-101/Todo_app.git",
  },
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
  }
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
  "Prisma",
  "MongoDB",
  "Redux",
  "Express",
  "Framer Motion",
] as const;