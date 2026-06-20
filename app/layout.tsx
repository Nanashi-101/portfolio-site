import AnimatedBackground from "@/components/AnimatedBackground";
import CursorGlow from "@/components/CursorGlow";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import ScrollFollower from "@/components/ScrollFollower";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import ActiveSectionProvider from "@/context/active-section-context";
import ThemeContextProvider from "@/context/theme-context";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soumyadip | Personal Portfolio",
  description: "Welcome aboard! I am Soumyadip, a full-stack developer, and this is my personal portfolio.",
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
          </ActiveSectionProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
