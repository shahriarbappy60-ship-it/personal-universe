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

const isCrawler = userAgent => /facebookexternalhit|facebot|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|slackbot|googlebot|bingbot|pinterestbot/i.test(userAgent || "");

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

  const requestUrl = new URL(context.request.url);
  const origin = requestUrl.origin;
  const shareUrl = origin + requestUrl.pathname;
  const writingUrl = origin + "/wonder?writing=" + encodeURIComponent(writingId) + "#writing-" + encodeURIComponent(writingId);
  const imageUrl = origin + "/og/writing?writing=" + encodeURIComponent(writingId);

  if (!isCrawler(context.request.headers.get("user-agent"))) {
    return Response.redirect(writingUrl, 302);
  }

  const safeTitle = escapeHtml(title);
  const safeShareUrl = escapeHtml(shareUrl);
  const safeImageUrl = escapeHtml(imageUrl);
  const description = escapeHtml("A personal writing by Shahriar.");

  const html = [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '<meta charset="utf-8">',
    '<meta name="robots" content="index, follow">',
    '<meta property="og:type" content="article">',
    '<meta property="og:title" content="' + safeTitle + '">',
    '<meta property="og:description" content="' + description + '">',
    '<meta property="og:site_name" content="Shahriar\'s Personal Universe">',
    '<meta property="og:url" content="' + safeShareUrl + '">',
    '<meta property="og:image" content="' + safeImageUrl + '">',
    '<meta property="og:image:url" content="' + safeImageUrl + '">',
    '<meta property="og:image:secure_url" content="' + safeImageUrl + '">',
    '<meta property="og:image:type" content="image/png">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="' + safeTitle + '">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + safeTitle + '">',
    '<meta name="twitter:description" content="' + description + '">',
    '<meta name="twitter:image" content="' + safeImageUrl + '">',
    '<meta name="twitter:image:alt" content="' + safeTitle + '">',
    '<link rel="canonical" href="' + safeShareUrl + '">',
    "<title>" + safeTitle + " — Shahriar's Personal Universe</title>",
    '<body><a href="' + writingUrl + '">Open ' + safeTitle + "</a></body>",
    "</html>"
  ].join("");

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Cache-Control": "no-store, max-age=0"
    }
  });
}
