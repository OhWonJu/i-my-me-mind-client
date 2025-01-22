"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const KEYWORD_MAP = ["생각", "기억", "발상"];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideUpVariants = {
    initial: { y: "20%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    exit: { y: "-20%", opacity: 0 },
  };

  // 주기적으로 currentIndex를 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % KEYWORD_MAP.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="select-none">
      <div className="flex items-center">
        <strong className="text-xl sm:text-2xl pr-5 flex items-center">
          <span>
            <AnimatePresence mode="wait">
              <motion.span
                key={`first-${currentIndex}`}
                variants={slideUpVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                {KEYWORD_MAP[currentIndex]}
              </motion.span>
            </AnimatePresence>
            에{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={`second-${currentIndex}`}
                variants={slideUpVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="inline-block"
              >
                {KEYWORD_MAP[currentIndex]}
              </motion.span>
            </AnimatePresence>
            을 잇다
          </span>
        </strong>
        <hr className="bg-black h-[3px] flex-1" />
      </div>
      <div className="flex flex-row-reverse">
        <h1 className="font-bold text-clamp-lg sm:text-clamp-xl text-right">
          I MY ME MIND
        </h1>
      </div>
    </header>
  );
};

export default Hero;
