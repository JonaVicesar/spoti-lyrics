import { useRef, useEffect, useCallback } from "react";
import { blendColor, drawRoundedImage, wrapText } from "../utils";

export function useCanvas({ track, coverImg, lyrics, selected, bgColor, textColor, fontSize, fontFamily, cardWidth, padding, fontReady }) {
  const canvasRef = useRef(null);

  const getSelectedText = useCallback(() =>
    lyrics.filter((_, i) => selected.has(i)).join("\n"),
    [lyrics, selected]
  );

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const pad = padding;
    const maxW = cardWidth - pad * 2;
    const lyricsText = getSelectedText();
    const resolvedFont = fontFamily === "Nunito" ? "Nunito, Arial Black, sans-serif" : fontFamily;

    const coverSize = Math.round(fontSize * 1.6);
    const titleSize = Math.round(fontSize * 0.52);
    const artistSize = Math.round(fontSize * 0.37);
    const lyricFont = `800 ${fontSize}px ${resolvedFont}`;
    const lh = fontSize * 1.12;
    const headerTextX = pad + coverSize + Math.round(fontSize * 0.5);
    const headerH = coverSize;

    // Construir líneas wrapeadas
    const allLines = [];
    if (lyricsText) {
      for (const raw of lyricsText.split("\n")) {
        if (!raw.trim()) allLines.push(null);
        else allLines.push(...wrapText(ctx, raw, lyricFont, maxW));
      }
    }

    const lyricsH = allLines.reduce((acc, l) => acc + (l === null ? lh * 0.35 : lh), 0);
    const gapHeaderLyrics = fontSize * 1.6;
    const totalH = pad * 1.3 + headerH + gapHeaderLyrics + lyricsH + pad * 1.3;

    canvas.width = cardWidth;
    canvas.height = Math.max(totalH, 300);

    // Fondo redondeado
    const r = Math.round(cardWidth * 0.04);
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(canvas.width - r, 0);
    ctx.quadraticCurveTo(canvas.width, 0, canvas.width, r);
    ctx.lineTo(canvas.width, canvas.height - r);
    ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - r, canvas.height);
    ctx.lineTo(r, canvas.height);
    ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fill();

    const topY = Math.round(pad * 1.1);

    // Portada o placeholder
    if (coverImg) {
      drawRoundedImage(ctx, coverImg, pad, topY, coverSize, coverSize, Math.round(coverSize * 0.08));
    } else {
      const pr = Math.round(coverSize * 0.08);
      ctx.fillStyle = blendColor(textColor, 0.12);
      ctx.beginPath();
      ctx.moveTo(pad + pr, topY);
      ctx.lineTo(pad + coverSize - pr, topY);
      ctx.quadraticCurveTo(pad + coverSize, topY, pad + coverSize, topY + pr);
      ctx.lineTo(pad + coverSize, topY + coverSize - pr);
      ctx.quadraticCurveTo(pad + coverSize, topY + coverSize, pad + coverSize - pr, topY + coverSize);
      ctx.lineTo(pad + pr, topY + coverSize);
      ctx.quadraticCurveTo(pad, topY + coverSize, pad, topY + coverSize - pr);
      ctx.lineTo(pad, topY + pr);
      ctx.quadraticCurveTo(pad, topY, pad + pr, topY);
      ctx.closePath();
      ctx.fill();
    }

    // Título y artista centrados verticalmente con la portada
    const textBlockH = titleSize + 8 + artistSize;
    const textStartY = topY + (headerH - textBlockH) / 2;
    const maxTextW = cardWidth - headerTextX - pad;

    ctx.fillStyle = textColor;
    ctx.font = `700 ${titleSize}px ${resolvedFont}`;
    let titleText = track?.trackName || "Título";
    while (ctx.measureText(titleText).width > maxTextW && titleText.length > 4)
      titleText = titleText.slice(0, -4) + "…";
    ctx.fillText(titleText, headerTextX, textStartY + titleSize);

    ctx.fillStyle = blendColor(textColor, 0.45);
    ctx.font = `700 ${artistSize}px ${resolvedFont}`;
    let artistText = track?.artistName || "Artista";
    while (ctx.measureText(artistText).width > maxTextW && artistText.length > 4)
      artistText = artistText.slice(0, -4) + "…";
    ctx.fillText(artistText, headerTextX, textStartY + titleSize + 8 + artistSize);

    // Letras
    if (lyricsText) {
      ctx.fillStyle = textColor;
      ctx.font = lyricFont;
      let y = topY + headerH + gapHeaderLyrics;
      for (const line of allLines) {
        if (line === null) y += lh * 0.35;
        else { ctx.fillText(line, pad, y); y += lh; }
      }
    }
  }, [track, coverImg, selected, lyrics, bgColor, textColor, fontSize, fontFamily, cardWidth, padding, fontReady, getSelectedText]);

  useEffect(() => { drawCanvas(); }, [drawCanvas]);

  const download = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = `${track?.trackName?.replace(/\s+/g, "-") || "lyric-card"}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  }, [track]);

  return { canvasRef, download, getSelectedText };
}