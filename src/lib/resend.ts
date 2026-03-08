import { Resend } from "resend";
import { getBaseUrl } from "./base-url";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.warn(
    "[resend] RESEND_API_KEY is not set. Email notifications will be disabled.",
  );
}

export const resend =
  apiKey != null && apiKey.length > 0 ? new Resend(apiKey) : null;

export async function sendResponseNotificationEmail(params: {
  to: string;
  creatorName: string;
  recipientName: string;
  response: "yes" | "no" | "maybe";
  message: string;
  cardId: string;
}) {
  if (!resend) {
    console.warn("[resend] Skipping email: RESEND_API_KEY is not configured");
    return;
  }

  const subjectMap: Record<string, string> = {
    yes: "You got a YES 💌",
    no: "You got a response 💌",
    maybe: "You got a maybe 💌",
  };

  const cardUrl = `${getBaseUrl()}/card/${params.cardId}`;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: params.to,
      subject: subjectMap[params.response],
      html: `
        <p>Hi ${params.creatorName},</p>
        <p>${params.recipientName} responded <strong>"${params.response.toUpperCase()}"</strong> to your love card 💌</p>
        <p><strong>Your message:</strong></p>
        <p>${params.message}</p>
        <p><a href="${cardUrl}" style="color: #fb7185; text-decoration: none; font-weight: bold;">View the card →</a></p>
        <p style="color: #999; font-size: 12px;">With love,<br/>Send a Love Card</p>
      `,
      text: [
        `Hi ${params.creatorName},`,
        "",
        `${params.recipientName} responded "${params.response.toUpperCase()}" to your love card.`,
        "",
        "Your original message:",
        params.message,
        "",
        `View it here: ${cardUrl}`,
        "",
        "With love,",
        "Send a Love Card",
      ].join("\n"),
    });
    console.log(
      `[resend] Email sent to ${params.to} for response: ${params.response}`,
    );
  } catch (error) {
    console.error("[resend] Failed to send email:", error);
    throw error;
  }
}
