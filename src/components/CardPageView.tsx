import { notFound } from "next/navigation";
import { getCardById } from "@/db";
import { EnvelopeAnimation } from "./EnvelopeAnimation";
import { CardPreview } from "./CardPreview";
import { ResponseButtons } from "./ResponseButtons";
import { Music } from "lucide-react";

type Props = {
  id: string;
};

function mapSpotifyUrlToEmbed(url: string | null): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("spotify.com")) return null;

    const path = parsed.pathname.replace(/^\/(embed\/)?/, "");
    const search = parsed.search;
    return `https://open.spotify.com/embed/${path}${search}`;
  } catch {
    return null;
  }
}

export async function CardPageView({ id }: Props) {
  const card = await getCardById(id);

  if (!card) {
    notFound();
  }

  const spotifyEmbed = mapSpotifyUrlToEmbed(card.spotifyUrl ?? null);

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-10">
      <EnvelopeAnimation>
        <div className="card-glass space-y-6 p-5">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-rose-400">
              A love card for you
            </p>
            <h1 className="text-lg font-semibold text-rose-950">
              Hi {card.recipientName},
            </h1>
            <p className="text-sm text-rose-600">
              Someone sat down, thought about you, and wrote this.
            </p>
          </div>

          <CardPreview
            creatorName={card.creatorName}
            recipientName={card.recipientName}
            message={card.message}
            themeId={card.theme as any}
          />

          {spotifyEmbed && (
            <div className="space-y-2 rounded-2xl bg-rose-50/60 p-3">
              <div className="flex items-center gap-2 text-xs font-medium text-rose-800">
                <Music className="h-3.5 w-3.5 text-rose-400" />
                Your soundtrack
              </div>
              <iframe
                src={spotifyEmbed}
                width="100%"
                height="80"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="overflow-hidden rounded-xl border border-rose-100 shadow-sm"
              />
            </div>
          )}

          <div className="space-y-2 rounded-2xl bg-rose-50/70 p-3">
            <p className="text-xs text-rose-700">
              {card.question || "How do you feel about this?"}
            </p>
            <ResponseButtons
              cardId={card.id}
              initialResponse={card.response as any}
            />
          </div>
        </div>
      </EnvelopeAnimation>
    </div>
  );
}

