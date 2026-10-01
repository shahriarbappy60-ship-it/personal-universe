const WRITING_META = {
  "october": { title: "October", image: "/og/writings/october.svg" },
  "on-becoming-quiet": { title: "On Becoming Quiet", image: "/og/writings/on-becoming-quiet.svg" },
  "observer-inside-thought": { title: "The Observer Inside the Thought.", image: "/og/writings/observer-inside-thought.svg" },
  "small-argument-with-time": { title: "A Small Argument With Time.", image: "/og/writings/small-argument-with-time.svg" },
  "anatomy-of-deja-vu": { title: "The Anatomy of Déjà Vu.", image: "/og/writings/anatomy-of-deja-vu.svg" },
  "dissolution-and-boundaries": { title: "Dissolution and Boundaries.", image: "/og/writings/dissolution-and-boundaries.svg" },
  "at-the-final-threshold": { title: "At the Final Threshold.", image: "/og/writings/at-the-final-threshold.svg" },
  "universe-experiencing-itself": { title: "What if you are the universe experiencing itself?", image: "/og/writings/universe-experiencing-itself.svg" },
  "consciousness-where": { title: "What If Consciousness Is Not Where We Think It Is?", image: "/og/writings/consciousness-where.svg" }
};

function meta(property, content) {
  return `<meta property="${property}" content="${content.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}">`;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const id = url.searchParams.get("writing");
  const writing = id ? WRITING_META[id] : null;

  const response = await context.next();
  if (!writing || !response.headers.get("content-type")?.includes("text/html")) {
    return response;
  }

  const html = await response.text();
  const canonical = `${url.origin}/wonder?writing=${encodeURIComponent(id)}`;
  const tags = [
    meta("og:title", writing.title),
    meta("og:type", "article"),
    meta("og:url", canonical),
    meta("og:site_name", "Shahriar's Personal Universe"),
    meta("og:image", `${url.origin}${writing.image}`),
    meta("og:image:alt", writing.title),
    meta("twitter:title", writing.title),
    meta("twitter:card", "summary_large_image"),
    meta("twitter:image", `${url.origin}${writing.image}`)
  ].join("\n    ");

  return new Response(
    html.replace("</head>", `    ${tags}\n</head>`),
    {
      status: response.status,
      headers: new Headers(response.headers)
    }
  );
}
