import About from "@/components/About";
import FooterCTA from "@/components/FooterCTA";
import dynamic from "next/dynamic";

// Below-the-fold, JS-heavy sections — split into their own chunks
const Experience = dynamic(() => import("@/components/Experience"));
const Feedback = dynamic(() => import("@/components/Feedback"));
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/Skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Soumyadip Sanyal — a full-stack developer in Warsaw, Poland. Skills, experience and the journey from front-end tinkerer to full-stack engineer.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · Soumyadip Sanyal",
    description: "Skills, experience and the journey of a full-stack developer based in Warsaw.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center gap-y-16 px-4 pt-16 pb-24 sm:pt-24 sm:pb-40">
        <header className="w-full max-w-[1240px] px-4">
          <h1 className="max-w-3xl text-5xl font-medium leading-[1.1] tracking-tight text-ink sm:text-7xl">
            design, code &amp;
            <br />
            interaction<span className="text-gold">.</span>
          </h1>
        </header>

        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Feedback />
      </main>
      <FooterCTA />
    </>
  );
}
