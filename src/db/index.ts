import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { cards, type Card, type NewCard } from "./schema";
import { eq, desc } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema: { cards } });

export type { Card, NewCard };

export async function createCard(input: NewCard): Promise<Card> {
  const [inserted] = await db.insert(cards).values(input).returning();
  return inserted;
}

export async function getCardById(id: string): Promise<Card | null> {
  const [card] = await db.select().from(cards).where(eq(cards.id, id));
  return card ?? null;
}

export async function getRecentPublicCards(
  limit: number,
): Promise<
  Pick<
    Card,
    "id" | "creatorName" | "recipientName" | "message" | "theme" | "createdAt"
  >[]
> {
  return db
    .select({
      id: cards.id,
      creatorName: cards.creatorName,
      recipientName: cards.recipientName,
      message: cards.message,
      theme: cards.theme,
      createdAt: cards.createdAt,
    })
    .from(cards)
    .where(eq(cards.isPublic, true))
    .orderBy(desc(cards.createdAt))
    .limit(limit);
}

export async function updateCardResponse(params: {
  id: string;
  response: "yes" | "no" | "maybe";
}): Promise<Card | null> {
  const [updated] = await db
    .update(cards)
    .set({
      response: params.response,
      respondedAt: new Date(),
    })
    .where(eq(cards.id, params.id))
    .returning();

  return updated ?? null;
}
