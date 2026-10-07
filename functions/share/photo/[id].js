const PHOTOS = {
  "photo-001": ["Between Waves","SCENES","Rocks, water and a little silence.","/images/observe/scenes/20260121_154717.webp"],
  "photo-002": ["Before Night","SCENES","The last light sitting behind the city.","/images/observe/scenes/20240727_045727.webp"],
  "photo-003": ["Blue Hour","SCENES","The city slowly turning its lights on.","/images/observe/scenes/20240928_181249.webp"],
  "photo-004": ["Through the Grid","SCENES","Looking at the sky through a different frame.","/images/observe/scenes/20250913_110451.webp"],
  "photo-005": ["Across the River","SCENES","A quiet piece of land between the trees and water.","/images/observe/scenes/20251223_170229.webp"],
  "photo-006": ["Inside the Frame","SCENES","A building seen from somewhere in between.","/images/observe/scenes/Snapchat-403199108(1).webp"],
  "photo-007": ["Moon on Water","SCENES","The moon leaving a path across the water.","/images/observe/scenes/b2c402cb-ed6d-454c-a564-3ea115e93f99-01.webp"],
  "photo-008": ["River at Dusk","SCENES","The sky changing above a quiet stretch of water.","/images/observe/scenes/20260820_184147.webp"],
  "photo-009": ["Moving Forward","MOMENTS","Watching the road disappear behind the glass.","/images/observe/moments/snapseed__1778675198799%20-%20Copy.webp"],
  "photo-010": ["Looking Up","ATMOSPHERE","Clouds changing shape above me.","/images/observe/atmosphere/20240824_133611.webp"],
  "photo-011": ["After the Light","ATMOSPHERE","The sky holding on to the last bit of light.","/images/observe/atmosphere/20260703_185533.webp"],
  "photo-012": ["Last Light","ATMOSPHERE","Clouds keeping the evening alive.","/images/observe/atmosphere/20260703_185551.webp"],
  "photo-013": ["Bloom","ATMOSPHERE","A small branch reaching into the sky.","/images/observe/atmosphere/20250408_175146.webp"],
  "photo-014": ["Under the Light","ATMOSPHERE","A street light under a quiet evening sky.","/images/observe/atmosphere/20240715_185158.webp"],
  "photo-015": ["Green Wall","ATMOSPHERE","A whole wall made of trees.","/images/observe/atmosphere/image1.webp"],
  "photo-016": ["White Against Blue","ATMOSPHERE","Flowers disappearing into the open sky.","/images/observe/atmosphere/20250408_175219.webp"],
  "photo-017": ["Bare Branches","ATMOSPHERE","A tree standing quietly against the sky.","/images/observe/atmosphere/20250906_180134.webp"],
  "photo-018": ["Under the Canopy","ATMOSPHERE","Looking up through layers of green.","/images/observe/atmosphere/20260521_121800.webp"],
  "photo-019": ["Green Water","ATMOSPHERE","A quiet pattern formed on the surface.","/images/observe/atmosphere/20260601_131429.webp"],
  "photo-020": ["Branches","ATMOSPHERE","The sky seen through a tangle of branches.","/images/observe/atmosphere/IMG_20260306_224048_414.webp"],
  "photo-021": ["Before Darkness","ATMOSPHERE","Light breaking through the clouds before night.","/images/observe/atmosphere/20260910_180619.webp"]
};

const escapeHtml = value => String(value)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#039;");

export function onRequestGet(context) {
  const id = String(context.params.id || "");
  const photo = PHOTOS[id];
  if (!photo) return new Response("Photo not found", { status: 404 });

  const [name, category, description, imagePath] = photo;
  const origin = new URL(context.request.url).origin;
  const shareUrl = origin + "/share/photo/" + encodeURIComponent(id);
  const observeUrl = origin + "/observe?photo=" + encodeURIComponent(id);
  const imageUrl = new URL(imagePath, origin).toString();
  const title = name + " — Shahriar's Visual Archive";

  const html = '<!doctype html><html lang="en"><head>' +
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + escapeHtml(title) + '</title>' +
    '<meta name="description" content="' + escapeHtml(description) + '">' +
    '<meta name="robots" content="index, follow">' +
    '<link rel="canonical" href="' + shareUrl + '">' +
    '<meta property="og:type" content="article">' +
    '<meta property="og:url" content="' + shareUrl + '">' +
    '<meta property="og:site_name" content="Shahriar\'s Personal Universe">' +
    '<meta property="og:title" content="' + escapeHtml(title) + '">' +
    '<meta property="og:description" content="' + escapeHtml(description) + '">' +
    '<meta property="og:image" content="' + imageUrl + '">' +
    '<meta property="og:image:secure_url" content="' + imageUrl + '">' +
    '<meta property="og:image:type" content="image/webp">' +
    '<meta property="og:image:alt" content="' + escapeHtml(name) + '">' +
    '<meta name="twitter:card" content="summary_large_image">' +
    '<meta name="twitter:title" content="' + escapeHtml(title) + '">' +
    '<meta name="twitter:description" content="' + escapeHtml(description) + '">' +
    '<meta name="twitter:image" content="' + imageUrl + '">' +
    '<meta name="twitter:image:alt" content="' + escapeHtml(name) + '">' +
    '<meta http-equiv="refresh" content="0;url=' + observeUrl + '">' +
    '</head><body><p>Opening ' + escapeHtml(name) + '…</p>' +
    '<script>window.location.replace(' + JSON.stringify(observeUrl) + ')</script></body></html>';

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "public, max-age=300, s-maxage=3600"
    }
  });
}
