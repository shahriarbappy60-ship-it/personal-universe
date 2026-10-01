import React from "react";
import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";

const TITLES = {
  october: "October",
  "observer-inside-thought": "The Observer Inside the Thought.",
  "small-argument-with-time": "A Small Argument With Time.",
  "on-becoming-quiet": "On Becoming Quiet.",
  "anatomy-of-deja-vu": "The Anatomy of Déjà Vu.",
  "dissolution-and-boundaries": "Dissolution and Boundaries.",
  "at-the-final-threshold": "At the Final Threshold.",
  "universe-experiencing-itself": "What if you are the universe experiencing itself?",
  "consciousness-where": "What If Consciousness Is Not Where We Think It Is?"
};

export const config = { runtime: "edge" };

export default function handler(req) {
  const url = new URL(req.url);
  const title = TITLES[url.searchParams.get("writing")] || "Wonder";
  return new ImageResponse(
    React.createElement("div", {
      style: {
        display: "flex", width: "1200px", height: "630px",
        alignItems: "center", justifyContent: "center",
        background: "#080808", color: "#ededed", border: "1px solid #333",
        fontFamily: "Arial, sans-serif", fontSize: title.length > 48 ? 46 : 62,
        fontWeight: 400, textAlign: "center", padding: "0 90px", boxSizing: "border-box"
      }
    }, title),
    { width: 1200, height: 630 }
  );
}
