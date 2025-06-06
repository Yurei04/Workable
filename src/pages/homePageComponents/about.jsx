"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="About"
      className="w-full min-h-screen flex flex-col justify-center items-center px-6 lg:px-20 py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.2, delay: 0.1 }}
        viewport={{ once: true, amount: 0.6 }}
        className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl w-full"
      >
        <div className="flex-1 text-left space-y-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-purple-500">
            Who Are We?
          </h2>

          <div className="bg-transparent shadow-none p-0">
            <div className="px-0">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-100">
                  Workable is a 501(c)(3) non-profit organization founded by
                  teenagers with a passion for programming and technology. Our
                  mission is to inspire and educate the next generation of
                  innovators through hackathons and workshops.
                </span>
                <br />
                <br />
                <span className="text-gray-400">
                  We address often-overlooked challenges by equipping high
                  school and college students with essential soft skills for
                  thriving in the tech industry — through hands-on experiences
                  like our free-to-enter hackathons. Our initiatives are built
                  to empower, connect, and elevate future tech leaders.
                </span>
              </p>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative w-full lg:w-[40%] h-72 sm:h-96 rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/images/image2.jpg"
            alt="About Hack United"
            fill
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
