# 🎵 Spoti Lyrics

Generate lyric cards from any song. Search, pick your verses, customize the design and export as PNG.

---

## Features

- 🔍 Song search via iTunes Search API
- 📝 Automatic lyrics fetching via lrclib.net
- ✏️ Manual lyrics input if a song isn't found
- 🎨 Customize colors, font, size and padding
- 📸 Export as high-resolution PNG (6x)

---

## Stack

| | |
|---|---|
| Framework | React + Vite |
| Styles | Plain CSS |
| Rendering | HTML5 Canvas API |
| Search | [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI) |
| Lyrics | [lrclib.net](https://lrclib.net) |

No backend. No database. No API keys.

---

## Getting started

```bash
git clone https://github.com/tu-usuario/spoti-lyrics
cd spoti-lyrics
npm install
npm run dev
```

---

## Project structure

```
src/
├── App.jsx               — Global state and view flow
├── styles.js             — Full app CSS
├── constants.js          — API URLs, color presets, font options
├── utils.js              — Canvas utilities (blend, wrap, draw)
├── hooks/
│   ├── useSearch.js      — Song search and data fetching
│   └── useCanvas.js      — Canvas drawing and PNG export
└── components/
    ├── SearchBox.jsx     — Search input with results dropdown
    ├── LyricsPanel.jsx   — Selectable verse list + manual mode
    ├── DesignPanel.jsx   — Design controls
    ├── PreviewPanel.jsx  — Canvas preview
    ├── TrackChip.jsx     — Selected track chip
    └── Footer.jsx        — Footer
```
