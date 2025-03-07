"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KEYWORD_MAP = ["생각", "기억", "발상", "영감", "기록"];

const slideUpVariants = {
  initial: { y: "20%", opacity: 0 },
  animate: { y: "0%", opacity: 1 },
  exit: { y: "-20%", opacity: 0 },
};

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);

  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    let lastTime = 0;

    const updateIndex = () => {
      const now = performance.now();
      if (now - lastTime >= 4000) {
        setCurrentIndex(Math.floor(Math.random() * KEYWORD_MAP.length));
        setCurrentIndex2(Math.floor(Math.random() * KEYWORD_MAP.length));
        lastTime = now;
      }
      animationRef.current = requestAnimationFrame(updateIndex);
    };

    animationRef.current = requestAnimationFrame(updateIndex);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center w-[80%] md:w-2/3 lg:w-1/2">
      <p className="text-clamp-lg pr-5 font-bold">
        <AnimatePresence mode="wait">
          <motion.span
            key={`first-${currentIndex}-${Math.random()}`}
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
            key={`second-${currentIndex2}-${Math.random()}`}
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
            {KEYWORD_MAP[currentIndex2]}
          </motion.span>
        </AnimatePresence>
        을 잇다
      </p>
      <hr className="bg-primary h-[3px] flex-1" />
    </div>
  );
};

export default Hero;
