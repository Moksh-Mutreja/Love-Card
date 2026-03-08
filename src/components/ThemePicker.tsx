"use client";

import { useState } from "react";
import { themes, type CardThemeId } from "@/lib/themes";
import { Sparkles } from "lucide-react";
import { CardPreview } from "./CardPreview";

type Props = {
  initialThemeId?: CardThemeId;
};

export function ThemePicker({ initialThemeId = "blush" }: Props) {
  const [selectedTheme, setSelectedTheme] =
    useState<CardThemeId>(initialThemeId);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold text-rose-900">
            <Sparkles className="h-4 w-4 text-rose-400" />
            Choose a vibe
          </h2>
          <p className="text-xs text-rose-500">
            Pick the mood that feels most like the two of you.
          </p>
        </div>
      </div>

      <input type="hidden" name="theme" value={selectedTheme} />

      <div className="grid gap-3 sm:grid-cols-2">
        {themes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => setSelectedTheme(theme.id)}
            className={`group flex items-center gap-3 rounded-2xl border px-3 py-2 text-left text-xs transition hover:border-rose-300 hover:bg-white/70 ${
              selectedTheme === theme.id
                ? "border-rose-400 bg-white shadow-sm"
                : "border-rose-100 bg-white/40"
            }`}
          >
            <span
              className={`h-8 w-8 rounded-full bg-gradient-to-br ${theme.gradient} ring-2 ring-white shadow-sm`}
            />
            <span>
              <span className="block font-semibold text-rose-900">
                {theme.name}
              </span>
              <span className="block text-[11px] text-rose-500">
                {theme.description}
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-3">
        <CardPreview
          creatorName="You"
          recipientName="Your favorite person"
          message="Somewhere between all our small moments and inside jokes, I realized: you feel like home."
          themeId={selectedTheme}
          subtle
        />
      </div>
    </section>
  );
}

