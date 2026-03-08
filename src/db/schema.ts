import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const cards = pgTable("cards", {
  id: uuid("id").defaultRandom().primaryKey(),
  creatorName: text("creator_name").notNull(),
  recipientName: text("recipient_name").notNull(),
  message: text("message").notNull(),
  theme: text("theme").notNull(),
  spotifyUrl: text("spotify_url"),
  creatorEmail: text("creator_email"),
  question: text("question"),
  response: text("response"),
  respondedAt: timestamp("responded_at", { withTimezone: true }),
  isPublic: boolean("is_public").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Card = InferSelectModel<typeof cards>;
export type NewCard = InferInsertModel<typeof cards>;

