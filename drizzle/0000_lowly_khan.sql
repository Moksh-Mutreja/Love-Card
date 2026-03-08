CREATE TABLE "cards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"creator_name" text NOT NULL,
	"recipient_name" text NOT NULL,
	"message" text NOT NULL,
	"theme" text NOT NULL,
	"spotify_url" text,
	"creator_email" text,
	"response" text,
	"responded_at" timestamp with time zone,
	"is_public" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
