import Link from "next/link";
import { FloatingHearts } from "./FloatingHearts";
import { getRecentPublicCards } from "@/db";
import { CardPreview } from "./CardPreview";
import { Heart, Music, Shield, Sparkles } from "lucide-react";

async function PublicWall() {
  const cards = await getRecentPublicCards(6);

  if (cards.length === 0) {
    return (
      <div className="card-glass flex flex-col items-center justify-center gap-2 px-6 py-8 text-center text-sm text-rose-500">
        <p>No public love notes yet.</p>
        <p className="text-xs">
          Be the first to write one and light up this wall.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cards.map((card) => (
        <div key={card.id} className="card-glass p-3">
          <CardPreview
            creatorName={card.creatorName}
            recipientName={card.recipientName}
            message={card.message}
            themeId={card.theme as any}
            subtle
          />
        </div>
      ))}
    </div>
  );
}

function Faq() {
  const items = [
    {
      question: "Is this anonymous?",
      answer:
        "Your crush only sees the name you type and your message. If you add an email, only we use it to notify you when they respond.",
    },
    {
      question: "Will my card be public?",
      answer:
        "Only if you choose to make it public. Public cards appear on the wall with names and themes, but never email addresses.",
    },
    {
      question: "Can I include a song?",
      answer:
        "Yes! Paste a Spotify link and we&apos;ll embed it beautifully on your card.",
    },
    {
      question: "Can I change or delete a card later?",
      answer:
        "For now cards can&apos;t be edited after sending, so read it once more before you hit send.",
    },
  ];

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-rose-100 bg-white/70 p-3"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
            <span className="text-sm font-medium text-rose-900">
              {item.question}
            </span>
            <span className="text-xs text-rose-400 group-open:hidden">
              show
            </span>
            <span className="hidden text-xs text-rose-400 group-open:inline">
              hide
            </span>
          </summary>
          <p className="mt-2 text-xs text-rose-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export async function LandingPage() {
  return (
    <div className="relative">
      <FloatingHearts />

      <section className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-16 pt-16 md:flex-row md:items-center">
        <div className="space-y-6 md:flex-1">
          <p className="inline-flex items-center gap-1 rounded-full bg-rose-50/80 px-3 py-1 text-xs font-medium text-rose-600 shadow-sm ring-1 ring-rose-100">
            <Sparkles className="h-3 w-3 text-rose-400" />A tiny ritual for big
            feelings
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-rose-950 sm:text-5xl">
            Send a love card that feels like{" "}
            <span className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent">
              them
            </span>
            .
          </h1>
          <p className="max-w-xl text-sm text-rose-700">
            Craft a romantic, slightly cinematic confession in minutes. Choose a
            theme, add a song, and send a private link that lets them answer
            yes, no, or maybe.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/create" className="btn-primary text-sm">
              <Heart className="mr-1.5 h-4 w-4" />
              Create your love card
            </Link>
            <Link
              href="#how-it-works"
              className="btn-ghost text-xs font-medium"
            >
              See how it works
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-[11px] text-rose-500">
            <span className="inline-flex items-center gap-1">
              <Shield className="h-3 w-3" />
              No sign-up
            </span>
            <span className="inline-flex items-center gap-1">
              <Music className="h-3 w-3" />
              Optional Spotify song
            </span>
          </div>
        </div>

        <div className="md:flex-1">
          <div className="card-glass relative mx-auto max-w-md p-3">
            <CardPreview
              creatorName="You"
              recipientName="Your favorite person"
              message="If there is a universe where we don't end up together, I hope it at least lets us meet so I can know what almost was."
              themeId="blush"
            />
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-16"
      >
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-rose-950">How it works</h2>
          <p className="text-sm text-rose-600">
            Three soft steps, zero awkward DMs.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Write the card",
              body: "Tell them how you feel, in your own words. We help you keep it focused and kind.",
            },
            {
              title: "Pick the mood",
              body: "Choose a theme and (optionally) add your song. We turn it into a cinematic card.",
            },
            {
              title: "Send the link",
              body: "Share a private URL. They answer yes, no, or maybe — and you get notified.",
            },
          ].map((step, index) => (
            <div
              key={step.title}
              className="card-glass flex flex-col gap-2 px-4 py-5 text-sm"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-xs font-semibold text-rose-700">
                {index + 1}
              </span>
              <h3 className="font-semibold text-rose-900">{step.title}</h3>
              <p className="text-xs text-rose-600">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-6 px-4 pb-16">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-rose-950">
              Public wall of love
            </h2>
            <p className="text-sm text-rose-600">
              Cards marked as public show up here with names and themes.
            </p>
          </div>
        </div>
        <PublicWall />
      </section>

      <section className="mx-auto max-w-5xl space-y-6 px-4 pb-20">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-rose-950">Questions</h2>
          <p className="text-sm text-rose-600">
            A few answers before you shoot your shot.
          </p>
        </div>
        <Faq />
      </section>
    </div>
  );
}
