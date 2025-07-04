"use client";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { AppWindow, CodeXml, Users } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const initiatives = [
  {
    title: "Accessible Job Platform Design",
    icon: <CodeXml className="w-6 h-6 text-blue-400" />,
    items: [
      "-We are developing a user-friendly job-seeking platform with built-in accessibility features, including dyslexia-friendly fonts, high-contrast modes, text-to-speech, and speech-to-text functionalities.",
      <>
        <Link className="text-blue-400 underline" href="#">
          - Blog
        </Link>{" "}
        covering tech trends, tools, and student spotlights
      </>,
    ],
  },
  {
    title: "Assistive Technology Integration",
    icon: <Users className="w-6 h-6 text-blue-400" />,
    items: [
      "WorkAble incorporates modern assistive technologies—such as voice output communication aids (VOCA), screen readers, and AI-enhanced speech systems—to ensure all users can interact confidently with job content and communication tools.",
    ],
  },
  {
    title: "Inclusive Employment Awareness",
    icon: <AppWindow className="w-6 h-6 text-blue-400" />,
    items: [
      "We promote inclusive hiring practices by providing educational resources and accessibility guidelines for employers to better understand and support applicants with disabilities.",
    ],
  },
];

function InitiativeCard({ title, icon, items }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="transition-all duration-300"
    >
      <Card className="bg-gradient-to-br from-black/60 to-black/30 backdrop-blur-lg border border-blue-800 shadow-xl rounded-3xl w-full sm:max-w-xs p-0">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            {icon}
            <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
              {title}
            </h2>
          </div>
          <Separator className="bg-blue-700 w-1/2" />
          <ul className="space-y-2 text-sm leading-relaxed text-blue-100">
            {items.map((item, index) => (
              <li key={index} className="text-blue-200">
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Initiatives() {
  return (
    <section className="w-full min-h-screen px-4 py-20 flex flex-col items-center justify-center bg-black/50">
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
          className="w-full max-w-7xl"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                Our Initiatives
              </span>
            </h1>
            <p className="text-blue-200 max-w-2xl mx-auto text-lg">
              Magna cillum exercitation laboris magna adipisicing excepteur.
            </p>
          </div>

        <div className="flex flex-col sm:flex-col md:flex-row flex-wrap gap-6 items-center justify-center text-center">
          {initiatives.map((initiative, index) => (
            <InitiativeCard key={index} {...initiative} />
          ))}
        </div>

        </motion.div>
    </section>
  );
}
