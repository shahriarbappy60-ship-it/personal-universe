const WRITING_META = {
  "october": { title: "October" },
  "observer-inside-thought": { title: "The Observer Inside the Thought." },
  "small-argument-with-time": { title: "A Small Argument With Time." },
  "on-becoming-quiet": { title: "On Becoming Quiet." },
  "anatomy-of-deja-vu": { title: "The Anatomy of Déjà Vu." },
  "dissolution-and-boundaries": { title: "Dissolution and Boundaries." },
  "at-the-final-threshold": { title: "At the Final Threshold." },
  "universe-experiencing-itself": { title: "What if you are the universe experiencing itself?" },
  "consciousness-where": { title: "What If Consciousness Is Not Where We Think It Is?" }
};

function escape(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function meta(property, content) {
  return `<meta property="${property}" content="${escape(content)}">`;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const id = url.searchParams.get("writing");
  const writing = id ? WRITING_META[id] : null;

  const response = await context.next();
  if (!writing || !response.headers.get("content-type")?.includes("text/html")) return response;

  const html = await response.text();
  const canonical = `${url.origin}/wonder?writing=${encodeURIComponent(id)}`;
  const image = `${url.origin}/og/writing?writing=${encodeURIComponent(id)}`;
  const tags = [
    meta("og:title", writing.title),
    meta("og:type", "article"),
    meta("og:url", canonical),
    meta("og:site_name", "Shahriar's Personal Universe"),
    meta("og:image", image),
    meta("og:image:width", "1200"),
    meta("og:image:height", "630"),
    meta("og:image:type", "image/png"),
    meta("og:image:alt", writing.title),
    meta("twitter:title", writing.title),
    meta("twitter:card", "summary_large_image"),
    meta("twitter:image", image),
    meta("twitter:image:alt", writing.title)
  ].join("\\n    ");

  return new Response(html.replace("</head>", `    ${tags}\\n</head>`), {
    status: response.status,
    headers: new Headers(response.headers)
  });
}
