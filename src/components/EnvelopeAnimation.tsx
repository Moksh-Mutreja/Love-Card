"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";

type Props = {
  children: ReactNode;
};

export function EnvelopeAnimation({ children }: Props) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpened(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative mx-auto flex max-w-xl flex-col items-center gap-6">
      <AnimatePresence>
        {!opened && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.94 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative h-40 w-64 cursor-default"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 shadow-soft-card" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 translate-y-1 rounded-b-2xl bg-white/70" />
            <div className="absolute inset-0 origin-top bg-[conic-gradient(at_top,_#fed7e2,_#fbcfe8,_#e0f2fe,_#fed7e2)] clip-path-envelope" />
            <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-rose-500 shadow-md shadow-rose-300">
              <Heart className="h-4 w-4 text-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

