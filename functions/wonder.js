const WRITING_META = {
  "october": { title: "October", image: "/og/writings/october.svg" },
  "on-becoming-quiet": { title: "On Becoming Quiet", image: "/og/writings/on-becoming-quiet.svg" },
  "the-observer": { title: "The Observer", image: "/og/writings/the-observer.svg" },
  "identity-becoming": { title: "Identity & Becoming", image: "/og/writings/identity-becoming.svg" },
  "time-perception": { title: "Time & Perception", image: "/og/writings/time-perception.svg" },
  "uncertainty": { title: "Uncertainty", image: "/og/writings/uncertainty.svg" },
  "threshold-states": { title: "Threshold States", image: "/og/writings/threshold-states.svg" },
  "universe-experiencing-itself": { title: "What if you are the universe experiencing itself?", image: "/og/writings/universe-experiencing-itself.svg" },
  "consciousness-where": { title: "What If Consciousness Is Not Where We Think It Is?", image: "/og/writings/consciousness-where.svg" },
  "dissolution-and-boundaries": { title: "Dissolution and Boundaries.", image: "/og/writings/dissolution-and-boundaries.svg" },
  "at-the-final-threshold": { title: "At the Final Threshold.", image: "/og/writings/at-the-final-threshold.svg" },
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
  const image = `${url.origin}${writing.image}`;
  const tags = [
    meta("og:title", writing.title),
    meta("og:type", "article"),
    meta("og:url", canonical),
    meta("og:site_name", "Shahriar's Personal Universe"),
    meta("og:image", image),
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
