import React from "react";
import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";

const TITLES = {
  october: { base: "October", accent: "" },
  "observer-inside-thought": { base: "The Observer Inside the", accent: "Thought." },
  "small-argument-with-time": { base: "A Small Argument With", accent: "Time." },
  "on-becoming-quiet": { base: "On Becoming", accent: "Quiet." },
  "anatomy-of-deja-vu": { base: "The Anatomy of", accent: "Déjà Vu." },
  "dissolution-and-boundaries": { base: "Dissolution and", accent: "Boundaries." },
  "at-the-final-threshold": { base: "At the Final", accent: "Threshold." },
  "universe-experiencing-itself": { base: "What if you are the universe", accent: "experiencing itself?" },
  "consciousness-where": { base: "What If Consciousness Is Not", accent: "Where We Think It Is?" }
};

const FONT_CSS_URL =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600;700;800&display=swap";

let fontsPromise;

async function loadFonts() {
  if (!fontsPromise) {
    fontsPromise = (async () => {
      const css = await fetch(FONT_CSS_URL, {
        headers: { "User-Agent": "Mozilla/5.0" }
      }).then(response => response.text());

      const urls = [...css.matchAll(/url\\(([^)]+\\.woff2)\\)/g)].map(match =>
        match[1].replace(/["']/g, "")
      );

      const uniqueUrls = [...new Set(urls)];
      const files = await Promise.all(
        uniqueUrls.map(async fontUrl => ({
          url: fontUrl,
          data: await fetch(fontUrl).then(response => response.arrayBuffer())
        }))
      );

      const manrope = files.filter(file => file.url.includes("Manrope"));
      const instrument = files.filter(file => file.url.includes("Instrument"));

      const findWeight = (files, weight) =>
        files.find(file => file.url.includes(\`wght@\${weight}\`)) ||
        files.find(file => file.url.includes(\`wght=\${weight}\`)) ||
        files[0];

      return [
        { name: "Manrope", data: findWeight(manrope, 500)?.data, weight: 500, style: "normal" },
        { name: "Instrument Serif", data: instrument[0]?.data, weight: 400, style: "normal" },
        { name: "Instrument Serif", data: instrument[1]?.data || instrument[0]?.data, weight: 400, style: "italic" }
      ].filter(font => font.data);
    })();
  }

  return fontsPromise;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const writing = TITLES[url.searchParams.get("writing")] || {
    base: "Wonder",
    accent: ""
  };

  const fonts = await loadFonts();

  const titleSize = (writing.base + writing.accent).length > 48 ? 52 : 64;

  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          width: "1200px",
          height: "630px",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background: "#080808",
          color: "#ededed",
          border: "1px solid #333",
          fontFamily: "Manrope",
          fontSize: titleSize,
          fontWeight: 500,
          lineHeight: 1.02,
          letterSpacing: "-0.04em",
          textAlign: "center",
          padding: "0 100px",
          boxSizing: "border-box"
        }
      },
      React.createElement(
        "div",
        { style: { display: "flex", flexWrap: "wrap", justifyContent: "center" } },
        writing.base + (writing.accent ? " " : ""),
        writing.accent
          ? React.createElement(
              "span",
              {
                style: {
                  fontFamily: "Instrument Serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                  letterSpacing: "-0.02em"
                }
              },
              writing.accent
            )
          : null
      )
    ),
    {
      width: 1200,
      height: 630,
      fonts
    }
  );
}
