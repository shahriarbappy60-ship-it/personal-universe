const WRITINGS = {
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

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}[char]));

export async function onRequestGet(context) {
  const writingId = String(context.params?.slug || "").trim();
  const title = WRITINGS[writingId];

  if (!title) {
    return new Response("Writing not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=UTF-8",
        "Cache-Control": "no-store"
      }
    });
  }

  const origin = new URL(context.request.url).origin;
  const writingUrl = origin + "/wonder?writing=" + encodeURIComponent(writingId) + "#writing-" + encodeURIComponent(writingId);
  const imageUrl = origin + "/og/writing?writing=" + encodeURIComponent(writingId);

  const safeTitle = escapeHtml(title);
  const safeWritingUrl = escapeHtml(writingUrl);
  const safeImageUrl = escapeHtml(imageUrl);

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex, nofollow">
<meta property="og:type" content="article">
<meta property="og:title" content="${safeTitle}">
<meta property="og:site_name" content="Shahriar's Personal Universe">
<meta property="og:url" content="${safeWritingUrl}">
<meta property="og:image" content="${safeImageUrl}">
<meta property="og:image:url" content="${safeImageUrl}">
<meta property="og:image:secure_url" content="${safeImageUrl}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${safeTitle}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${safeTitle}">
<meta name="twitter:image" content="${safeImageUrl}">
<meta name="twitter:image:alt" content="${safeTitle}">
<link rel="canonical" href="${safeWritingUrl}">
<meta http-equiv="refresh" content="0;url=${safeWritingUrl}">
<title>${safeTitle} — Shahriar's Personal Universe</title>
</head>
<body>
<p>Opening <a href="${safeWritingUrl}">${safeTitle}</a>…</p>
<script>window.location.replace(${JSON.stringify(writingUrl)});</script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Cache-Control": "no-store, max-age=0"
    }
  });
}
