"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Not Subscribed");

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  async function subscribe() {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      setStatus("Permission Denied");
      return;
    }

    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });

    await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
    });

    setStatus("Subscribed ✅");
  }

  function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) =>
      char.charCodeAt(0)
    ));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-6">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-white/20">

        <h1 className="text-3xl font-bold text-white mb-4">
          🔔 Push Notification System
        </h1>

        <p className="text-slate-300 mb-6 text-sm">
          Enable browser notifications to receive real-time updates.
        </p>

        <button
          onClick={subscribe}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white font-semibold shadow-lg hover:scale-105 active:scale-95"
        >
          Enable Notifications
        </button>

        <div className="mt-6 text-sm text-slate-300">
          Status:{" "}
          <span className="font-semibold text-white">
            {status}
          </span>
        </div>

      </div>
    </div>
  );
}
