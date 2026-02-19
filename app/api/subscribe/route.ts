import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  const sub = await req.json();
  const db = await getDB();

  await db.query(
    `INSERT IGNORE INTO push_subscriptions (endpoint, p256dh, auth)
     VALUES (?, ?, ?)`,
    [sub.endpoint, sub.keys.p256dh, sub.keys.auth]
  );

  return NextResponse.json({ success: true });
}
