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
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

export default function handler(req, res) {
  const writingId = String(req.query?.slug || "").trim();
  const title = WRITINGS[writingId];

  if (!title) {
    res.status(404).send("Writing not found");
    return;
  }

  const origin = "https://personal-universe-nu.vercel.app";
  const writingUrl = `${origin}/wonder?writing=${encodeURIComponent(writingId)}#writing-${encodeURIComponent(writingId)}`;
  const imageUrl = `${origin}/og/writing?writing=${encodeURIComponent(writingId)}`;

  const html = `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="robots" content="noindex">
<meta property="og:type" content="article">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:site_name" content="Shahriar's Personal Universe">
<meta property="og:url" content="${escapeHtml(writingUrl)}">
<meta property="og:image" content="${escapeHtml(imageUrl)}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/png"><meta property="og:image:alt" content="${escapeHtml(title)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:image" content="${escapeHtml(imageUrl)}"><meta name="twitter:image:alt" content="${escapeHtml(title)}">
<link rel="canonical" href="${escapeHtml(writingUrl)}">
<meta http-equiv="refresh" content="0;url=${escapeHtml(writingUrl)}">
<title>${escapeHtml(title)} — Shahriar's Personal Universe</title></head>
<body><script>window.location.replace(${JSON.stringify(writingUrl)});</script></body></html>`;

  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
  res.status(200).send(html);
}
