import { NextResponse } from "next/server";
import { getCardById } from "@/db";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const card = await getCardById(id);

  if (!card) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    response: card.response,
    respondedAt: card.respondedAt?.toISOString() ?? null,
  });
}

