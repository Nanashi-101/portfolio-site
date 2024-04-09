import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ActiveSectionProvider from "@/context/active-section-context";
import { Toaster } from "react-hot-toast";

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
      <body className={`${inter.className} bg-slate-50 relative pt-28 sm:pt-36`}>
        <div className="bg-[#fa2b3c] absolute top-[-1rem] left-[-35rem] h-[31.25rem]  w-[50rem] -z-10 rounded-full blur-[25rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>
        <div className="bg-[#6271f8] absolute top-[-6rem] right-[11rem] h-[31.25rem] -z-10  w-[31.25rem] rounded-full blur-[25rem] sm:w-[68.75rem]"></div>

        <ActiveSectionProvider>
          <Header />
          {children}
          <Toaster position="bottom-right"/>
        </ActiveSectionProvider>
      </body>
    </html >
  );
}
