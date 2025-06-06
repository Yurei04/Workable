"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full pt-28 overflow-x-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-black/60 via-black/40 to-black/60" />
        <Image
            src="/images/image1.jpg"
            alt="Background"
            fill
            className="object-cover opacity-50 -z-10 pointer-events-none"
            priority
        />


      <div className="container lg:p-15 sm:p-5 mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center justify-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
              Workable
            </span>
          </h1>

          <h2 className="mt-4 text-xl sm:text-2xl lg:text-3xl font-medium text-gray-200">
            Breaking Barriers, Building Futures
          </h2>

          <p className="mt-3 text-sm text-blue-300">
            Proudly a 501(c)(3) nonprofit organization dedicated to youth-led impact.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link href="#events">
              <Button size="lg" className="cursor-pointer">Find A Job Now!</Button>
            </Link>
            <Link href="/apply">
              <Button variant="outline" size="lg" className="cursor-pointer">Join Our Cause</Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full border-4 border-blue-700 bg-[#181818] shadow-lg overflow-hidden"
        >
          <Image
            src="/images/workableB.png"
            alt="HackUnited Logo"
            layout="fill"
            objectFit="cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
