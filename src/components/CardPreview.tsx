"use client";

import { motion } from "motion/react";
import type { CardThemeId } from "@/lib/themes";
import { getThemeById } from "@/lib/themes";

type Props = {
  creatorName: string;
  recipientName: string;
  message: string;
  themeId: CardThemeId;
  subtle?: boolean;
};

export function CardPreview({
  creatorName,
  recipientName,
  message,
  themeId,
  subtle = false,
}: Props) {
  const theme = getThemeById(themeId);

  return (
    <motion.div
      initial={subtle ? { opacity: 0, y: 12 } : { opacity: 0.9, scale: 0.96 }}
      animate={subtle ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br p-[1px] shadow-soft-card"
    >
      <div
        className={`card-glass relative flex h-full flex-col gap-4 bg-gradient-to-br ${theme.gradient} ${theme.text}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.33),_transparent)]" />

        <div className="relative flex items-center justify-between px-6 pt-5">
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${theme.badge}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            Love Card
          </div>
          <span className="text-xs opacity-80">
            from <span className="font-semibold">{creatorName || "Someone"}</span>
          </span>
        </div>

        <div className="relative px-6">
          <p className="text-xs uppercase tracking-[0.2em] opacity-80">
            To
          </p>
          <p className="text-xl font-semibold">
            {recipientName || "My favorite human"}
          </p>
        </div>

        <div className="relative px-6 pb-6 pt-2">
          <div className="rounded-2xl bg-white/55 p-4 text-sm leading-relaxed text-rose-950 shadow-inner shadow-rose-100/70">
            {message || "Write something honest, soft, and a little bit brave."}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

