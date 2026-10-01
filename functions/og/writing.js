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

const esc = value => value.replace(/[&<>"]/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"
}[char]));

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const title = TITLES[url.searchParams.get("writing")] || "Wonder";

  const html = `<!doctype html><html><body><div style="display:flex;width:1200px;height:630px;align-items:center;justify-content:center;background:#080808;color:#ededed;border:1px solid #333;font-family:Arial,sans-serif;font-size:${title.length > 48 ? 46 : 62}px;text-align:center;padding:0 90px;box-sizing:border-box;">${esc(title)}</div></body></html>`;

  return new ImageResponse(
    React.createElement("div", {
      style: {
        display: "flex",
        width: "1200px",
        height: "630px",
        alignItems: "center",
        justifyContent: "center",
        background: "#080808",
        color: "#ededed",
        border: "1px solid #333",
        fontFamily: "Arial",
        fontSize: title.length > 48 ? 46 : 62,
        textAlign: "center",
        padding: "0 90px",
        boxSizing: "border-box"
      }
    }, title),
    { width: 1200, height: 630 }
  );
}
