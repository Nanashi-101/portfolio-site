import Header from "@/components/Header";
import ThemeChangerBtn from "@/components/ThemeChangerBtn";
import ActiveSectionProvider from "@/context/active-section-context";
import ThemeContextProvider from "@/context/theme-context";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { BsArrowBarUp, BsArrowUp } from "react-icons/bs";
import Link from "next/link";

const outfit = Outfit({ subsets: ["latin"] });

//Required color code:
// bluish-hue: #6271f8
// some-red: #fa2b3c

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
      <body className={`${outfit.className} bg-slate-50 relative pt-28 sm:pt-36 dark:bg-gray-950 dark:text-gray-50/90 transition-colors duration-500 overflow-x-hidden`}>
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]" />
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]" />

        <ThemeContextProvider>
          <ActiveSectionProvider>
            <Header />
            {children}
            <Toaster position="top-left" />
            <ThemeChangerBtn />
          </ActiveSectionProvider>
        </ThemeContextProvider>
      </body>
    </html >
  );
}
