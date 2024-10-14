import Image from "next/image";
import Link from "next/link";
import React from "react";
import blogPic from "@/public/blog_site_pic.png";

const Blogs = () => {
  return (
    <div className="w-full px-2 md:max-w-[1240px] my-16 sm:mt-4 flex flex-col items-center justify-center gap-2 md:gap-8 mx-auto py-5">
      <Image
        src={blogPic}
        alt="blog site"
        className="rounded-lg w-[100%] md:w-[90%] lg:w-[70%] h-[100%] sm:h-[20%] object-cover"
      />
      <div className="flex flex-col md:flex-row items-center justify-center text-center sm:text-left text-base sm:text-xl tracking-tight">
        <h1 className="w-full sm:max-w-[50%] sm:first-letter:text-3xl  sm:border-r-4 sm:mr-12">
          Hey, if you want to see some more cool stuff regarding coding?{" "}
          <span>Check out my Blog site for more coding...</span>
        </h1>
        <Link
          href="https://blog-site-theta-sooty.vercel.app"
          target="_blank"
          className="translate-y-4 btn-base w-full md:max-w-[30%] lg:max-w-[20%] lg:animate-wiggle"
        >
          Let's see
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
