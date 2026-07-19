import AnimatedBackground from "@/components/AnimatedBackground";
import CursorGlow from "@/components/CursorGlow";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import ScrollFollower from "@/components/ScrollFollower";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransitionProvider from "@/components/transition/PageTransition";
import ActiveSectionProvider from "@/context/active-section-context";
import ThemeContextProvider from "@/context/theme-context";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

const SITE_URL = "https://sany4l.dev";
const DESCRIPTION =
  "Soumyadip Sanyal — a full-stack web developer crafting clean, minimal, and high-performance web experiences with React, Next.js & TypeScript.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Soumyadip Sanyal — Web Developer",
    template: "%s · Soumyadip Sanyal",
  },
  description: DESCRIPTION,
  keywords: [
    "Soumyadip Sanyal", "web developer", "full-stack developer",
    "React", "Next.js", "TypeScript", "Node.js", "portfolio", "Warsaw",
  ],
  authors: [{ name: "Soumyadip Sanyal", url: SITE_URL }],
  creator: "Soumyadip Sanyal",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Soumyadip Sanyal — Web Developer",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Soumyadip Sanyal",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Soumyadip Sanyal — Web Developer" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soumyadip Sanyal — Web Developer",
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  other: {
    "theme-color": "#d0a03a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} relative pt-[4.5rem] text-ink transition-colors duration-500 overflow-x-hidden`}>
        <AnimatedBackground />
        <CursorGlow />

        <ThemeContextProvider>
          <ActiveSectionProvider>
            <PageTransitionProvider>
            <Preloader />
            <ScrollProgress />
            <ScrollFollower />
            <CustomCursor />
            <Header />
            <SmoothScroll>{children}</SmoothScroll>
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: { borderRadius: "9999px", background: "#1c1c1c", color: "#fff", fontSize: "0.85rem", fontWeight: 600, padding: "10px 18px" },
                success: { iconTheme: { primary: "#d0a03a", secondary: "#fff" } },
                error: { iconTheme: { primary: "#e24b4a", secondary: "#fff" } },
              }}
            />
            </PageTransitionProvider>
          </ActiveSectionProvider>
        </ThemeContextProvider>

        {/* Structured data for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${SITE_URL}/#person`,
                  name: "Soumyadip Sanyal",
                  url: SITE_URL,
                  email: "mailto:soumyadipsanyal2017@gmail.com",
                  jobTitle: "Full-Stack Web Developer",
                  address: { "@type": "PostalAddress", addressLocality: "Warsaw", addressCountry: "PL" },
                  sameAs: [
                    "https://www.linkedin.com/in/soumyadip-sanyalxxiii/",
                    "https://github.com/Nanashi-101",
                    "https://www.instagram.com/ign._.kratos",
                  ],
                  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Framer Motion", "GSAP"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "Soumyadip Sanyal — Web Developer",
                  publisher: { "@id": `${SITE_URL}/#person` },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
