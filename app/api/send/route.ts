import { NextResponse } from "next/server";
import webpush from "web-push";
import { getDB } from "@/lib/db";

webpush.setVapidDetails(
  "mailto:ayush.dhiman0610@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST() {
//   await new Promise(resolve => setTimeout(resolve, 3000)); // Delay for 3 seconds

  const db = await getDB();
  const [subs]: any = await db.query("SELECT * FROM push_subscriptions");

  for (const sub of subs) {
    try {
      await webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        },
        JSON.stringify({
          title: "🚀 Hello Ayush",
          body: "Push system fully working!",
        })
      );
    } catch (err) {
      console.error("Push error:", err);
    }
  }

  return NextResponse.json({ sent: true });
}
