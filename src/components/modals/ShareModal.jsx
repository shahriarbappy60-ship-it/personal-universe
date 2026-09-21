import React, { useState, useEffect, useRef } from 'react';

export default function ShareModal({
  photo,
  isOpen,
  onClose
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !photo) return null;

  const currentUrl = window.location.href.split('#')[0];
  const photoTitle = photo.title || 'Photograph';
  const category = (photo.category || 'SCENES').toUpperCase();
  const locationText = photo.location ? `${photo.location}${photo.year ? ` · ${photo.year}` : ''}` : (photo.year || '');
  const storyText = photo.story || '';

  // Formatted caption for social sharing
  const shareText = `📸 ${photoTitle} [${category}]\n${locationText ? `📍 ${locationText}\n` : ''}${storyText ? `\n"${storyText}"\n` : ''}\n✨ Shahriar's Visual Archive:\n${currentUrl}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const ta = document.createElement('textarea');
        ta.value = currentUrl;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handleCopyText = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareText);
      } else {
        const ta = document.createElement('textarea');
        ta.value = shareText;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2200);
    } catch {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2200);
    }
  };

  // Native Web Share API (Mobile & supported desktop browsers)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${photoTitle} — Shahriar's Visual Archive`,
          text: shareText,
          url: currentUrl
        });
      } catch {
        // User cancelled or share error
      }
    } else {
      handleCopyLink();
    }
  };

  // Direct Social Share URLs
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`“${photoTitle}” — Visual Archive by Shahriar\n\n${storyText ? `"${storyText.slice(0, 100)}..."\n\n` : ''}`)}&url=${encodeURIComponent(currentUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(`“${photoTitle}” — ${storyText || 'Visual Archive'}`)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;

  // Download high-resolution visual card image (1080 x 1350 4:5 Instagram / Status format)
  const handleDownloadCard = () => {
    setIsGeneratingImage(true);

    const canvas = document.createElement('canvas');
    const width = 1080;
    const height = 1350;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Load photo image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = photo.src;

    img.onload = () => {
      // 1. Background Fill (Obsidian Black)
      ctx.fillStyle = '#070707';
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle Gradient Grain / Atmosphere
      const bgGrad = ctx.createRadialGradient(width / 2, height / 3, 50, width / 2, height / 2, 800);
      bgGrad.addColorStop(0, '#111113');
      bgGrad.addColorStop(1, '#050505');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Inner Card Border
      const pad = 64;
      const cardW = width - pad * 2;
      const cardH = height - pad * 2;
      const radius = 32;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(pad, pad, cardW, cardH, radius);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.clip();

      // 4. Draw Header Eyebrow (Category & Number)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.letterSpacing = '3px';
      ctx.fillText(`01 / OBSERVE · ${category}`, pad + 40, pad + 60);

      if (photo.number) {
        ctx.textAlign = 'right';
        ctx.fillText(`NO. ${photo.number}`, pad + cardW - 40, pad + 60);
        ctx.textAlign = 'left';
      }

      // 5. Draw Image Stage inside card
      const imgPadX = pad + 40;
      const imgPadY = pad + 95;
      const imgW = cardW - 80;
      const imgH = 680;
      const imgRadius = 24;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(imgPadX, imgPadY, imgW, imgH, imgRadius);
      ctx.clip();

      // Aspect cover calculation
      const aspectImg = img.width / img.height;
      const aspectBox = imgW / imgH;
      let sx, sy, sw, sh;
      if (aspectImg > aspectBox) {
        sh = img.height;
        sw = img.height * aspectBox;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = img.width / aspectBox;
        sx = 0;
        sy = (img.height - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, imgPadX, imgPadY, imgW, imgH);
      ctx.restore();

      // 6. Draw Image Border Overlay
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(imgPadX, imgPadY, imgW, imgH, imgRadius);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // 7. Title & Metadata
      const textStartY = imgPadY + imgH + 54;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.letterSpacing = '-0.5px';
      ctx.fillText(photoTitle, imgPadX, textStartY);

      if (locationText) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText(locationText.toUpperCase(), imgPadX, textStartY + 38);
      }

      // 8. Story Quote (Wrapped)
      if (storyText) {
        ctx.fillStyle = '#e4e4e7';
        ctx.font = 'italic 25px Georgia, serif';
        const quoteStartY = textStartY + (locationText ? 85 : 55);
        const maxQuoteWidth = imgW;
        const words = `“${storyText}”`.split(' ');
        let line = '';
        let currentY = quoteStartY;
        const lineHeight = 36;
        let lineCount = 0;

        for (let n = 0; n < words.length; n++) {
          if (lineCount >= 3) break; // Max 3 lines of quote
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxQuoteWidth && n > 0) {
            ctx.fillText(line.trim(), imgPadX, currentY);
            line = words[n] + ' ';
            currentY += lineHeight;
            lineCount++;
          } else {
            line = testLine;
          }
        }
        if (lineCount < 3) {
          ctx.fillText(line.trim(), imgPadX, currentY);
        }
      }

      // 9. Footer Watermark
      const footerY = pad + cardH - 45;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('SHAHRIAR · PERSONAL UNIVERSE', imgPadX, footerY);

      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fillText('shahriar.me', pad + cardW - 40, footerY);
      ctx.textAlign = 'left';

      ctx.restore();

      // Trigger Download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `photocard-${photoTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();

      setIsGeneratingImage(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2600);
    };

    img.onerror = () => {
      setIsGeneratingImage(false);
      // Fallback to copy link
      handleCopyLink();
    };
  };

  return (
    <div
      className="share-modal-overlay fixed inset-0 z-[100005] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Share photocard"
    >
      <div
        ref={modalRef}
        className="share-modal-dialog w-full max-w-lg bg-[#0e0e10]/95 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-2xl flex flex-col gap-5 max-h-[92vh] overflow-y-auto text-zinc-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex flex-col">
            <h3 className="font-sans text-lg font-semibold text-white tracking-tight m-0">
              Share Photocard
            </h3>
            <span className="font-mono text-xs text-zinc-400 mt-0.5">
              {category} · {locationText || 'Visual Observation'}
            </span>
          </div>

          <button
            type="button"
            className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            onClick={onClose}
            aria-label="Close share dialog"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Visual Photocard Preview */}
        <div className="share-photocard-preview bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 flex flex-col gap-3 shadow-inner">
          <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-black/40 border border-white/10">
            <img
              src={photo.src}
              alt={photoTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-zinc-200 uppercase">
              {category}
            </div>
            {photo.number && (
              <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-zinc-200">
                #{photo.number}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 px-1">
            <div className="flex items-baseline justify-between gap-2">
              <h4 className="font-sans text-base font-medium text-white truncate">
                {photoTitle}
              </h4>
              {locationText && (
                <span className="font-sans text-xs text-zinc-400 shrink-0">
                  {locationText}
                </span>
              )}
            </div>
            {storyText && (
              <p className="font-serif italic text-xs text-zinc-300 line-clamp-2 leading-relaxed opacity-90">
                “{storyText}”
              </p>
            )}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1 border-t border-white/[0.06] mt-1">
              <span>SHAHRIAR · VISUAL ARCHIVE</span>
              <span>shahriar.me</span>
            </div>
          </div>
        </div>

        {/* 1-Click Social Media Platforms */}
        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 px-1">
            Share Directly
          </span>

          <div className="grid grid-cols-5 gap-2">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white/[0.04] hover:bg-emerald-500/15 border border-white/[0.08] hover:border-emerald-500/40 text-zinc-300 hover:text-emerald-400 transition-all group"
              title="Share on WhatsApp"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.075-2.073-.497-1.763-.73-2.894-2.529-2.981-2.644-.087-.116-.711-.948-.711-1.809 0-.861.448-1.284.608-1.458.16-.174.348-.218.464-.218.116 0 .232.002.333.007.107.005.25.04.391.38.144.35.492 1.2.535 1.287.043.088.072.19.014.305-.058.115-.087.188-.174.289-.087.102-.183.228-.261.306-.087.087-.178.182-.077.355.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.088.275.073.377-.044.101-.116.435-.506.551-.68.116-.174.232-.145.391-.087s1.014.478 1.189.565c.174.088.29.131.333.204.043.072.043.421-.101.826z"/>
                </svg>
              </div>
              <span className="text-[11px] font-sans font-medium">WhatsApp</span>
            </a>

            {/* X (Twitter) */}
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.12] border border-white/[0.08] hover:border-white/25 text-zinc-300 hover:text-white transition-all group"
              title="Share on X"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <span className="text-[11px] font-sans font-medium">X</span>
            </a>

            {/* Facebook */}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white/[0.04] hover:bg-blue-500/15 border border-white/[0.08] hover:border-blue-500/40 text-zinc-300 hover:text-blue-400 transition-all group"
              title="Share on Facebook"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.001 3.98h2.001v8.01z"/>
                </svg>
              </div>
              <span className="text-[11px] font-sans font-medium">Facebook</span>
            </a>

            {/* LinkedIn */}
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white/[0.04] hover:bg-sky-500/15 border border-white/[0.08] hover:border-sky-500/40 text-zinc-300 hover:text-sky-400 transition-all group"
              title="Share on LinkedIn"
            >
              <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.86 0 1.55-.7 1.55-1.55a1.55 1.55 0 0 0-3.1 0c0 .85.69 1.55 1.55 1.55m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                </svg>
              </div>
              <span className="text-[11px] font-sans font-medium">LinkedIn</span>
            </a>

            {/* Telegram */}
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white/[0.04] hover:bg-cyan-500/15 border border-white/[0.08] hover:border-cyan-500/40 text-zinc-300 hover:text-cyan-400 transition-all group"
              title="Share on Telegram"
            >
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.61 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.38-.49 1.03-.75 4.04-1.76 6.74-2.92 8.09-3.49 3.85-1.63 4.65-1.91 5.17-1.92.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.21-.04.36z"/>
                </svg>
              </div>
              <span className="text-[11px] font-sans font-medium">Telegram</span>
            </a>
          </div>
        </div>

        {/* Action Buttons: Download Card Image & Copy Options */}
        <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.08]">
          {/* Download Aesthetic Card Image */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs sm:text-sm tracking-wide transition-all shadow-lg active:scale-[0.99] cursor-pointer"
            onClick={handleDownloadCard}
            disabled={isGeneratingImage}
          >
            {isGeneratingImage ? (
              <>
                <svg className="animate-spin w-4 h-4 text-zinc-900" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Generating Card Image...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Card Image Downloaded!</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download Photocard Image (Instagram / Status)</span>
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-2">
            {/* Copy Link */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-sans text-xs tracking-wide transition-all cursor-pointer"
              onClick={handleCopyLink}
            >
              {copiedLink ? (
                <>
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-emerald-400 font-medium">Link Copied!</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span>Copy Link</span>
                </>
              )}
            </button>

            {/* Copy Card Text */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-sans text-xs tracking-wide transition-all cursor-pointer"
              onClick={handleCopyText}
            >
              {copiedText ? (
                <>
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-emerald-400 font-medium">Text Copied!</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>Copy Details</span>
                </>
              )}
            </button>
          </div>

          {/* Native Share button if available */}
          {typeof navigator !== 'undefined' && navigator.share && (
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-zinc-400 hover:text-zinc-200 font-sans text-xs transition-all cursor-pointer"
              onClick={handleNativeShare}
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              <span>More Share Options (Device)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
