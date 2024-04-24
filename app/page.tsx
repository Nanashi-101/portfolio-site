import About from "@/components/About";
import Experience from "@/components/Experience";
import Intro from "@/components/Intro";
import Projects from "@/components/Projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-4">
      <Intro />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Experience/>
      <SectionDivider />
      <About/>
      <SectionDivider />
      <Contact />
      <Footer />
    </main>
  );
}
