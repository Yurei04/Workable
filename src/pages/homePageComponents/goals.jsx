"use client";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { AppWindow, CodeXml, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function AnimatedCard({ children, direction = "left", rotate = "", justify = "start" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.17, 0.55, 0.55, 1],
      },
    },
  };

  return (
    <div className={`flex justify-${justify}`} ref={ref}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${rotate} shadow-lg rounded-xl`}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function AccessibilityFeatures() {
  return (
    <div className="flex flex-col w-full min-h-screen lg:mt-10 sm:my-10 px-4 sm:px-8 lg:px-16" id="Goals">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          bounce: 0.2,
          delay: 0.1,
        }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="m-5">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-blue-500">
              Accessibility Features
            </span>
          </h1>
          <p className="text-center text-blue-200 max-w-2xl mx-auto">
            Workable exists to empower young creators by providing inclusive access to education, collaboration, and career development. Our goal is to build a community where innovation thrives.
          </p>
        </div>


        <div className="flex flex-col sm:flex-col md:flex-row gap-12 max-w-7xl mx-auto items-center justify-center">
          <AnimatedCard direction="left" justify="start">
            <Card className="bg-black/60 backdrop-blur-md max-w-xl p-8">
              <CardContent>
                <h2 className="flex items-center gap-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-blue-500 mb-4">
                  <CodeXml className="w-7 h-7" />
                   Dyslexia-Friendly Fonts
                </h2>
                <Separator className="bg-blue-700 mb-6" />
                <p className="text-blue-300 leading-relaxed">
                  WorkAble uses specially designed fonts that improve readability for individuals with dyslexia. These fonts have distinct letterforms and consistent spacing, helping reduce letter confusion and visual distortion. This makes reading job descriptions, instructions, and navigation easier and more accessible.
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard direction="right" justify="end">
            <Card className="bg-black/60 backdrop-blur-md max-w-xl p-8">
              <CardContent>
                <h2 className="flex items-center gap-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-blue-500 mb-4">
                  <AppWindow className="w-7 h-7" />
                  Speech-to-Text (STT)
                </h2>
                <Separator className="bg-blue-700 mb-6" />
                <p className="text-blue-300 leading-relaxed">
                   Speech-to-Text allows users to speak into their device and convert their voice into written text. This is particularly helpful for individuals with motor impairments, limited mobility, or difficulty typing. It empowers users to fill out job applications, search for jobs, and communicate more easily.
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard direction="left" justify="start">
            <Card className="bg-black/60 backdrop-blur-md max-w-xl p-8">
              <CardContent>
                <h2 className="flex items-center gap-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-blue-500 mb-4">
                  <Users className="w-7 h-7" />
                  Text-to-Speech (TTS)
                </h2>
                <Separator className="bg-blue-700 mb-6" />
                <p className="text-blue-300 leading-relaxed">
                  Text-to-Speech reads out on-screen content aloud for users with visual impairments, dyslexia, or cognitive disabilities. It supports better information retention and allows hands-free navigation of the platform. TTS also enables users to listen to job postings, application steps, and system messages in real time.
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
      </motion.div>
    </div>
  );
}
