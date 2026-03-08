"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createCard,
  getCardById,
  updateCardResponse,
  type NewCard,
} from "@/db";
import { defaultThemeId } from "@/lib/themes";
import { sendResponseNotificationEmail } from "@/lib/resend";

const createCardSchema = z.object({
  creatorName: z.string().min(1, "Please tell us your name."),
  recipientName: z.string().min(1, "Who is this for?"),
  message: z
    .string()
    .min(10, "Write at least 10 characters.")
    .max(1000, "That is a lot of love! Please keep it under 1000 characters."),
  theme: z.string().default(defaultThemeId),
  spotifyUrl: z
    .string()
    .url("Please enter a valid URL.")
    .max(500)
    .nullable()
    .optional()
    .or(z.literal("")),
  creatorEmail: z
    .string()
    .email("Please enter a valid email.")
    .max(255)
    .nullable()
    .optional()
    .or(z.literal("")),
  question: z
    .string()
    .max(200, "Please keep the question short.")
    .nullable()
    .optional()
    .or(z.literal("")),
  isPublic: z
    .union([z.literal("on"), z.literal("true"), z.literal("false")])
    .optional()
    .transform((value) => value === "on" || value === "true"),
});

export type CreateCardFormState = {
  status: "idle" | "error";
  errors?: Record<string, string[]>;
};

export async function createCardAction(
  _prevState: CreateCardFormState,
  formData: FormData,
): Promise<CreateCardFormState> {
  const raw = {
    creatorName: (formData.get("creatorName") ?? "").toString(),
    recipientName: (formData.get("recipientName") ?? "").toString(),
    message: (formData.get("message") ?? "").toString(),
    theme: (formData.get("theme") ?? defaultThemeId).toString(),
    spotifyUrl: formData.get("spotifyUrl")?.toString() ?? "",
    creatorEmail: formData.get("creatorEmail")?.toString() ?? "",
    question: formData.get("question")?.toString() ?? "",
    isPublic: formData.get("isPublic")?.toString(),
  };

  const parsed = createCardSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path[0]?.toString() ?? "form";
      if (!errors[path]) errors[path] = [];
      errors[path].push(issue.message);
    }
    return { status: "error", errors };
  }

  const values = parsed.data;

  const payload: NewCard = {
    creatorName: values.creatorName,
    recipientName: values.recipientName,
    message: values.message,
    theme: values.theme || defaultThemeId,
    spotifyUrl: values.spotifyUrl || null,
    creatorEmail: values.creatorEmail || null,
    question: values.question || null,
    isPublic: values.isPublic ?? true,
  };

  const card = await createCard(payload);

  revalidatePath("/");

  redirect(`/share/${card.id}`);
}

export type RespondToCardState = {
  status: "idle" | "success" | "error";
  response?: "yes" | "no" | "maybe";
  error?: string;
};

export async function respondToCardAction(
  _prevState: RespondToCardState,
  formData: FormData,
): Promise<RespondToCardState> {
  const id = formData.get("cardId")?.toString() ?? "";
  const response = formData.get("response")?.toString() as
    | "yes"
    | "no"
    | "maybe"
    | undefined;

  if (!id || !response || !["yes", "no", "maybe"].includes(response)) {
    return {
      status: "error",
      error: "Something went wrong. Please try again.",
    };
  }

  const existing = await getCardById(id);
  if (!existing) {
    return {
      status: "error",
      error: "This card could not be found.",
    };
  }

  const updated = await updateCardResponse({ id, response });

  if (updated?.creatorEmail) {
    await sendResponseNotificationEmail({
      to: updated.creatorEmail,
      creatorName: updated.creatorName,
      recipientName: updated.recipientName,
      response,
      message: updated.message,
      cardId: id,
    });
  }

  revalidatePath("/");
  revalidatePath(`/card/${id}`);
  revalidatePath(`/share/${id}`);

  return {
    status: "success",
    response,
  };
}
