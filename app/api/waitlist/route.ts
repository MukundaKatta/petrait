import { NextRequest, NextResponse } from "next/server";

const WAITLIST_API = "https://waitlist-api-sigma.vercel.app/api/waitlist";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { email } = body as { email?: unknown };
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "email required" }, { status: 400 });
  }

  try {
    const upstream = await fetch(WAITLIST_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, product: "petrait" }),
    });
    if (!upstream.ok) {
      return NextResponse.json({ error: "upstream error" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "upstream unreachable" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
