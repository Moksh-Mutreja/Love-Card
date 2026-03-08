import { getCardById } from "@/db";
import { getBaseUrl } from "@/lib/base-url";
import { ShareLink } from "./ShareLink";
import { CardPreview } from "./CardPreview";

type Props = {
  id: string;
};

export async function SharePageView({ id }: Props) {
  const card = await getCardById(id);
  if (!card) {
    return (
      <div className="mx-auto max-w-xl px-4 pb-16 pt-10">
        <div className="card-glass space-y-3 p-5 text-sm text-rose-700">
          <p>This card could not be found.</p>
        </div>
      </div>
    );
  }

  const baseUrl = getBaseUrl();
  const shareUrl = `${baseUrl}/card/${card.id}`;

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-10">
      <div className="grid gap-6 md:grid-cols-[minmax(0,_2fr)_minmax(0,_1.4fr)]">
        <div className="card-glass space-y-3 p-5">
          <h1 className="text-lg font-semibold text-rose-950">
            Your love card is ready
          </h1>
          <p className="text-sm text-rose-600">
            Send this link to {card.recipientName}. When they respond,
            we&apos;ll update the status on this page.
          </p>
          <CardPreview
            creatorName={card.creatorName}
            recipientName={card.recipientName}
            message={card.message}
            themeId={card.theme as any}
          />
        </div>

        <ShareLink
          cardId={card.id}
          shareUrl={shareUrl}
          initialResponse={card.response as any}
          initialRespondedAt={card.respondedAt?.toISOString() ?? null}
        />
      </div>
    </div>
  );
}
