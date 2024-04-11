import Header from "@/components/Header";
import ThemeChangerBtn from "@/components/ThemeChangerBtn";
import ActiveSectionProvider from "@/context/active-section-context";
import ThemeContextProvider from "@/context/theme-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} bg-slate-50 relative  sm:pt-36 dark:bg-gray-950 dark:text-gray-50/90`}>
        <div className="bg-[#f83c4c] absolute top-[-1rem] left-[-35rem] h-[31.25rem]  w-[50rem] -z-10 rounded-full blur-[25rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"/>
        <div className="bg-[#6271f8] absolute top-[-6rem] right-[11rem] h-[31.25rem] -z-10  w-[31.25rem] rounded-full blur-[25rem] sm:w-[68.75rem]"/>

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
