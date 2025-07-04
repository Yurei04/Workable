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
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-blue-500">
            Who Are We?
          </h2>

          <div className="bg-transparent shadow-none p-0">
            <div className="px-0">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">
                  We are a team of passionate developers and researchers committed to building a more inclusive digital future. Our project, WorkAble, is a job-seeking platform designed to empower individuals with disabilities by breaking down barriers to employment through assistive technology and inclusive design.
                </span>
                <br />
                <br />
                <span className="text-gray-400">
                  At the core of our mission is the belief that everyone deserves equal access to opportunity. Whether you face visual, auditory, speech, or cognitive challenges, WorkAble is here to support your journey toward employment, independence, and self-fulfillment.
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
            alt="About workable"
            fill
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
