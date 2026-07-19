import FooterCTA from "@/components/FooterCTA";
import Blogs from "@/components/blog";
import RecentWork from "@/components/home/RecentWork";
import { projectsData } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by Soumyadip Sanyal — full-stack web apps, platforms and front-end experiences built with React, Next.js and TypeScript.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work · Soumyadip Sanyal",
    description: "Selected projects — full-stack web apps built with React, Next.js and TypeScript.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center px-4 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <header className="w-full max-w-[1240px] px-4">
          <h1 className="max-w-3xl text-5xl font-medium leading-[1.1] tracking-tight text-ink sm:text-7xl">
            creating next level
            <br />
            digital products<span className="text-gold">.</span>
          </h1>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-ink/50">
            {projectsData.length} projects — and counting
          </p>
        </header>

        <RecentWork
          projects={[...projectsData]}
          kicker="all work"
          showMore={false}
          id="all-work"
        />
        <Blogs />
      </main>
      <FooterCTA />
    </>
  );
}
