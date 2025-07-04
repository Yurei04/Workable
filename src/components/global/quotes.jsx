import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const quotes = [
  "Success doesn’t come from what you do occasionally, it comes from what you do consistently. – Marie Forleo",
  "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
  "Believe you can and you're halfway there. – Theodore Roosevelt",
  "You are stronger than you think, braver than you believe, and more capable than you know. – Unknown",
  "It always seems impossible until it's done. – Nelson Mandela",
  "Start where you are. Use what you have. Do what you can. – Arthur Ashe",
  "Small progress is still progress. Keep moving forward. – Unknown",
  "Your only limit is your mind. – Unknown",
  "Push yourself, because no one else is going to do it for you. – Unknown",
  "The future depends on what you do today. – Mahatma Gandhi"
];

export default function QuoteCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto text-center min-h-[6rem]">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-blue-200 text-lg"
        >
          {quotes[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
