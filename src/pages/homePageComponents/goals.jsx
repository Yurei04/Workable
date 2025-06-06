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

export default function Goals() {
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
              Our Mission & Goals
            </span>
          </h1>
          <p className="text-center text-blue-200 max-w-2xl mx-auto">
            Hack United exists to empower young creators by providing inclusive access to education, collaboration, and career development. Our goal is to build a community where innovation thrives.
          </p>
        </div>


        <div className="flex flex-col sm:flex-col md:flex-row gap-12 max-w-7xl mx-auto items-center justify-center">
          <AnimatedCard direction="left" justify="start">
            <Card className="bg-black/60 backdrop-blur-md max-w-xl p-8">
              <CardContent>
                <h2 className="flex items-center gap-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-blue-500 mb-4">
                  <CodeXml className="w-7 h-7" />
                  Accelerating Soft Skills
                </h2>
                <Separator className="bg-blue-700 mb-6" />
                <p className="text-blue-300 leading-relaxed">
                  We teach more than just mechanical coding skills. As the world rapidly evolves,
                  we envision an inclusive platform where everyone can learn about the exciting
                  advancements in the tech field and gain knowledge to continue their programming journey.
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard direction="right" justify="end">
            <Card className="bg-black/60 backdrop-blur-md max-w-xl p-8">
              <CardContent>
                <h2 className="flex items-center gap-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-blue-500 mb-4">
                  <AppWindow className="w-7 h-7" />
                  Practical Applications
                </h2>
                <Separator className="bg-blue-700 mb-6" />
                <p className="text-blue-300 leading-relaxed">
                  We emphasize practical applications of programming and technology to prepare
                  community members for the rapidly changing future. Our hackathons exemplify
                  these goals by using real-world problems as development themes.
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>

          <AnimatedCard direction="left" justify="start">
            <Card className="bg-black/60 backdrop-blur-md max-w-xl p-8">
              <CardContent>
                <h2 className="flex items-center gap-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-blue-500 mb-4">
                  <Users className="w-7 h-7" />
                  Connecting Innovators
                </h2>
                <Separator className="bg-blue-700 mb-6" />
                <p className="text-blue-300 leading-relaxed">
                  Our community provides a platform for innovators to learn, grow, and support
                  each other. We connect like-minded individuals to overcome challenges in acquiring
                  new skills. Join us and thrive in a collaborative environment.
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
      </motion.div>
    </div>
  );
}
