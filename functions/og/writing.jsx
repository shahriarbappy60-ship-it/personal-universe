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

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const title = TITLES[url.searchParams.get("writing")] || "Wonder";

  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0c0c0c",
          color: "#ededed",
          border: "1px solid #3a3a3a",
          fontFamily: "Noto Sans"
        }
      },
      React.createElement(
        "div",
        {
          style: {
            position: "absolute",
            top: 70,
            left: 70,
            right: 70,
            display: "flex",
            justifyContent: "space-between",
            color: "#777",
            fontSize: 18,
            letterSpacing: "0.18em"
          }
        },
        React.createElement("span", null, "SHAHRIAR'S PERSONAL UNIVERSE"),
        React.createElement("span", null, "WONDER")
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            width: 120,
            height: 2,
            background: "#aaa",
            position: "absolute",
            top: 135,
            left: 70
          }
        }
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            maxWidth: 980,
            padding: "0 70px",
            textAlign: "center",
            fontSize: title.length > 48 ? 46 : 58,
            fontWeight: 500,
            lineHeight: 1.2
          }
        },
        title
      ),
      React.createElement(
        "div",
        {
          style: {
            position: "absolute",
            bottom: 65,
            left: 70,
            color: "#666",
            fontSize: 16,
            letterSpacing: "0.14em"
          }
        },
        "WRITING"
      )
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    }
  );
}
