export type CardThemeId = "blush" | "sunset" | "midnight" | "lavender";

export interface CardTheme {
  id: CardThemeId;
  name: string;
  description: string;
  gradient: string;
  accent: string;
  text: string;
  badge: string;
}

export const themes: CardTheme[] = [
  {
    id: "blush",
    name: "Blushing Rose",
    description: "Soft pinks and gentle warmth.",
    gradient: "from-rose-100 via-rose-50 to-pink-50",
    accent: "bg-rose-500",
    text: "text-rose-900",
    badge: "bg-rose-100 text-rose-700",
  },
  {
    id: "sunset",
    name: "Golden Sunset",
    description: "Warm oranges and romantic glow.",
    gradient: "from-orange-100 via-rose-50 to-amber-50",
    accent: "bg-orange-500",
    text: "text-orange-900",
    badge: "bg-orange-100 text-orange-700",
  },
  {
    id: "midnight",
    name: "Midnight Sparkle",
    description: "Deep blues and starry night.",
    gradient: "from-slate-900 via-slate-800 to-indigo-900",
    accent: "bg-indigo-500",
    text: "text-slate-50",
    badge: "bg-slate-800 text-slate-100",
  },
  {
    id: "lavender",
    name: "Lavender Dream",
    description: "Calm purples and dreamy tones.",
    gradient: "from-purple-100 via-violet-50 to-fuchsia-50",
    accent: "bg-purple-500",
    text: "text-purple-900",
    badge: "bg-purple-100 text-purple-700",
  },
];

export const defaultThemeId: CardThemeId = "blush";

export function getThemeById(id: string | null | undefined): CardTheme {
  const fallback = themes.find((t) => t.id === defaultThemeId)!;
  if (!id) return fallback;
  const found = themes.find((t) => t.id === id);
  return found ?? fallback;
}

