import FooterCTA from "@/components/FooterCTA";
import Description from "@/components/home/Description";
import RecentWork from "@/components/home/RecentWork";
import SlidingImages from "@/components/home/SlidingImages";
import Intro from "@/components/Intro";
import ScrollDown from "@/components/ScrollDown";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soumyadip Sanyal — Web Developer",
  description:
    "Full-stack web developer crafting clean, minimal, and high-performance web experiences with React, Next.js & TypeScript. Based in Warsaw, Poland.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center px-4">
        <Intro />
        <ScrollDown />
        <Description />
        <RecentWork showMore />
      </main>
      <SlidingImages />
      <FooterCTA />
    </>
  );
}
