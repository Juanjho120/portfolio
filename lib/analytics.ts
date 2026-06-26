"use client";

import { track } from "@vercel/analytics";

export type TrackingPropertyValue = string | number | boolean;
export type TrackingProperties = Record<string, TrackingPropertyValue>;

const ANALYTICS_PERSISTENCE_ENDPOINT = "/api/analytics/events";

function isAnalyticsPersistenceEnabled() {
  return process.env.NEXT_PUBLIC_ANALYTICS_PERSISTENCE_ENABLED === "true";
}

function sendPersistedEvent(eventName: string, properties: TrackingProperties) {
  if (!isAnalyticsPersistenceEnabled() || typeof window === "undefined") {
    return;
  }

  const payload = JSON.stringify({
    eventName,
    properties,
    path: window.location.pathname,
    referrer: document.referrer,
  });

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon(ANALYTICS_PERSISTENCE_ENDPOINT, blob);
      return;
    }

    void fetch(ANALYTICS_PERSISTENCE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
      keepalive: true,
    });
  } catch {
    // Analytics persistence must never block navigation or downloads.
  }
}

export function trackPortfolioEvent(eventName: string, properties: TrackingProperties) {
  try {
    track(eventName, properties);
  } catch {
    // Vercel Analytics must never block navigation or downloads.
  }

  sendPersistedEvent(eventName, properties);
}
