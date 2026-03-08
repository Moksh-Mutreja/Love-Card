"use client";

import { motion } from "motion/react";

const HEARTS = Array.from({ length: 10 }).map((_, index) => ({
  id: index,
  left: 5 + Math.random() * 90,
  delay: Math.random() * 4,
  duration: 9 + Math.random() * 4,
  size: 16 + Math.random() * 22,
  opacity: 0.2 + Math.random() * 0.5,
}));

export function FloatingHearts() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {HEARTS.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "-10%", opacity: heart.opacity }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: heart.duration,
            delay: heart.delay,
            ease: "easeInOut",
          }}
          className="absolute text-rose-300"
          style={{
            left: `${heart.left}%`,
            fontSize: heart.size,
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}

