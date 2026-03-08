import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-cursive",
});

export const metadata: Metadata = {
  title: "Send a Love Card",
  description:
    "Craft a cinematic, romantic love card with themes and songs, and send a private link that lets them answer yes, no, or maybe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dancingScript.variable} min-h-screen bg-[radial-gradient(circle_at_top,_#ffe4e6,_#fdf2f8,_#fdf2ff)] text-rose-950 antialiased`}>
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col">
          <header className="px-4 pt-4">
            <div className="flex items-center justify-between rounded-2xl border border-rose-100/80 bg-white/70 px-3 py-2 text-xs shadow-sm">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-[11px] font-semibold text-white shadow-sm">
                  ♥
                </span>
                <span className="font-semibold text-rose-900">
                  Send a Love Card
                </span>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="px-4 pb-6 pt-4 text-center text-[11px] text-rose-400">
            Made for soft, courageous confessions.
          </footer>
        </div>
      </body>
    </html>
  );
}

