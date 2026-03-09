const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Nunito:wght@400;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #090909; --surface: #111; --border: #1e1e1e; --border2: #2a2a2a;
    --text: #e2e2e2; --muted: #555; --accent: #1db954; --danger: #e63946;
    --font-display: 'Bebas Neue', cursive; --font-body: 'DM Mono', monospace;
    --radius: 8px;
  }
  html, body, #root { height: 100%; }
  body { background: var(--bg); color: var(--text); font-family: var(--font-body); }
  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* ── INPUTS / BUTTONS ── */
  .inp {
    width: 100%; background: #161616; border: 1px solid var(--border2);
    border-radius: var(--radius); color: var(--text); padding: 11px 14px;
    font-family: var(--font-body); font-size: 12px; outline: none; transition: border 0.15s;
  }
  .inp:focus { border-color: #404040; }
  .inp::placeholder { color: #333; }
  textarea.inp { resize: vertical; min-height: 180px; line-height: 1.7; }
  select.inp { cursor: pointer; }
  .btn {
    display: inline-block; padding: 10px 16px; border-radius: var(--radius);
    border: none; cursor: pointer; font-family: var(--font-body); font-size: 10px;
    font-weight: 500; letter-spacing: 2px; text-transform: uppercase;
    transition: all 0.15s; text-align: center; white-space: nowrap;
  }
  .btn-green { background: var(--accent); color: #000; }
  .btn-green:hover { background: #21cf5f; }
  .btn-dark { background: #161616; color: var(--text); border: 1px solid var(--border2); }
  .btn-dark:hover { background: #1e1e1e; }
  .btn-white { background: #e8e8e8; color: #000; }
  .btn-white:hover { background: #fff; }
  .btn-sm { padding: 7px 12px; font-size: 9px; }
  .btn-row { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; }
  .err {
    font-size: 10px; color: var(--danger); background: #1a0808;
    border: 1px solid #2e1010; border-radius: var(--radius); padding: 8px 10px; margin-top: 8px;
  }
  .section-title, .panel-title {
    font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--muted); margin-bottom: 10px;
  }

  /* ── SEARCH VIEW ── */
  .search-view { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
  .search-hero {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 40px 20px; gap: 6px;
  }
  .brand-name {
    font-family: var(--font-display); font-size: 52px;
    letter-spacing: 4px; color: #fff; line-height: 1;
  }
  .brand-sub { font-size: 10px; color: var(--accent); letter-spacing: 3px; margin-bottom: 28px; }
  .search-box-wrap { width: 100%; max-width: 520px; }
  .search-row { display: flex; gap: 8px; }
  .search-row .inp { flex: 1; font-size: 13px; padding: 13px 16px; }
  .search-btn { padding: 13px 18px; font-size: 14px; letter-spacing: 0; }
  .results-list {
    margin-top: 8px; background: #141414;
    border: 1px solid var(--border2); border-radius: 10px;
    overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  }
  .result-item {
    display: flex; align-items: center; gap: 12px; padding: 10px 14px;
    cursor: pointer; transition: background 0.1s; border-bottom: 1px solid var(--border);
  }
  .result-item:last-child { border-bottom: none; }
  .result-item:hover { background: #1c1c1c; }
  .result-cover { width: 42px; height: 42px; border-radius: 6px; object-fit: cover; flex-shrink: 0; background: #1e1e1e; }
  .result-cover--empty { display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .result-name { font-size: 12px; font-weight: 500; color: #ddd; line-height: 1.3; }
  .result-artist { font-size: 11px; color: #555; margin-top: 2px; }

  /* ── EDITOR VIEW ── */
  .editor-view { flex: 1; display: flex; flex-direction: column; min-height: 100vh; position: relative; }

  .editor-header {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 16px; background: var(--surface);
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 20;
  }
  .btn-back {
    background: none; border: none; color: var(--muted); cursor: pointer;
    font-family: var(--font-body); font-size: 10px; letter-spacing: 1px;
    text-transform: uppercase; padding: 6px 0; white-space: nowrap; transition: color 0.15s;
  }
  .btn-back:hover { color: var(--text); }
  .editor-track-info { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
  .editor-cover { width: 34px; height: 34px; border-radius: 5px; object-fit: cover; flex-shrink: 0; }
  .editor-track-text { min-width: 0; }
  .editor-track-name { font-size: 12px; font-weight: 500; color: #ddd; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .editor-track-artist { font-size: 10px; color: #555; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .btn-download { padding: 8px 14px; font-size: 9px; flex-shrink: 0; margin-left: auto; }

  /* Desktop: 3 columnas */
  .editor-body {
    flex: 1; display: grid; padding: 20px; gap: 20px; align-items: start;
    grid-template-columns: 1fr;
    grid-template-areas: "preview" "lyrics";
  }
  .editor-preview { grid-area: preview; }
  .editor-lyrics  { grid-area: lyrics; }
  .editor-design  { grid-area: design; }

  @media (min-width: 900px) {
    .editor-body {
      grid-template-columns: 1fr 1fr 280px;
      grid-template-areas: "lyrics preview design";
    }
    /* Ocultar FAB en desktop */
    .fab { display: none !important; }
    /* Mostrar panel inline en desktop */
    .desktop-only { display: block !important; }
  }

  /* Ocultar panel inline en mobile */
  .desktop-only { display: none; }

  /* ── FAB (botón flotante mobile) ── */
  .fab {
    position: fixed; bottom: 24px; right: 20px; z-index: 30;
    width: 52px; height: 52px; border-radius: 50%;
    background: var(--accent); border: none; cursor: pointer;
    font-size: 22px; box-shadow: 0 4px 20px rgba(29,185,84,0.4);
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .fab:hover { transform: scale(1.08); box-shadow: 0 6px 24px rgba(29,185,84,0.5); }
  .fab:active { transform: scale(0.95); }

  /* ── DRAWER ── */
  .drawer-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6);
    z-index: 40; backdrop-filter: blur(2px);
    animation: fadeIn 0.2s ease;
  }
  .drawer {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
    background: #141414; border-top: 1px solid var(--border2);
    border-radius: 16px 16px 0 0;
    max-height: 82vh; display: flex; flex-direction: column;
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
  }
  .drawer--open { transform: translateY(0); }
  .drawer-handle {
    width: 40px; height: 4px; background: #333;
    border-radius: 2px; margin: 12px auto 0; cursor: pointer; flex-shrink: 0;
  }
  .drawer-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 18px 10px; flex-shrink: 0;
    border-bottom: 1px solid var(--border);
  }
  .drawer-title { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); }
  .drawer-close {
    background: none; border: none; color: #555; cursor: pointer;
    font-size: 14px; padding: 2px 6px; transition: color 0.15s;
  }
  .drawer-close:hover { color: var(--text); }
  .drawer-body { overflow-y: auto; padding: 16px 18px 32px; }
  .drawer-body::-webkit-scrollbar { width: 3px; }
  .drawer-body::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }

  /* ── LYRICS ── */
  .lyrics-scroll { max-height: 400px; overflow-y: auto; padding-right: 2px; }
  .lyrics-scroll::-webkit-scrollbar { width: 3px; }
  .lyrics-scroll::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
  .lyric-line {
    padding: 4px 10px; border-radius: 5px; cursor: pointer;
    font-size: 12px; line-height: 1.8; border: 1px solid transparent;
    transition: all 0.1s; color: #555; user-select: none;
  }
  .lyric-line:hover:not(.empty-line) { background: #141414; color: #bbb; }
  .lyric-line.sel { background: rgba(29,185,84,0.08); border-color: rgba(29,185,84,0.2); color: #5dc984; }
  .lyric-line.empty-line { height: 10px; cursor: default; }
  .selected-count { color: var(--accent); margin-left: 6px; }
  .no-lyrics-box { background: #141414; border: 1px solid var(--border2); border-radius: 10px; padding: 18px 16px; }
  .no-lyrics-title { font-size: 12px; color: #bbb; margin-bottom: 6px; font-weight: 500; }
  .no-lyrics-sub { font-size: 11px; color: #444; margin-bottom: 14px; line-height: 1.6; }

  /* ── DESIGN PANEL ── */
  .slider { width: 100%; accent-color: var(--accent); cursor: pointer; }
  .slider-label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
  .slider-label span:first-child { font-size: 9px; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; }
  .slider-label span:last-child { font-size: 10px; color: #888; font-variant-numeric: tabular-nums; }
  .presets-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 5px; margin-bottom: 10px; }
  @media (min-width: 900px) { .presets-grid { grid-template-columns: repeat(4, 1fr); } }
  .preset-btn { border-radius: 6px; height: 28px; cursor: pointer; border: 2px solid transparent; transition: transform 0.1s, border 0.1s; }
  .preset-btn:hover { transform: scale(1.08); }
  .preset-btn.active { border-color: #fff; }
  .color-pickers { display: flex; gap: 8px; margin-bottom: 12px; }
  .color-pick-wrap { flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .color-pick-label { font-size: 9px; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; }
  .color-pick { width: 100%; height: 34px; border-radius: 6px; border: 1px solid var(--border2); cursor: pointer; background: #161616; }

  /* ── CANVAS ── */
  .canvas-wrap { display: flex; justify-content: center; }
  .canvas-container { border-radius: 14px; overflow: hidden; box-shadow: 0 16px 48px rgba(0,0,0,0.6); display: inline-block; max-width: 100%; }
  canvas { display: block; max-width: 100%; height: auto; }

  /* ── FOOTER ── */
  .footer {
  display: flex; justify-content: center; align-items: center; gap: 20px; flex-wrap: wrap;
  padding: 12px 20px; border-top: 1px solid var(--border);
  font-size: 10px; color: var(--muted); background: var(--surface);
}
  .footer a { color: var(--accent); text-decoration: none; }
  .footer a:hover { text-decoration: underline; }

  /* ── MISC ── */
  .loading-txt { font-size: 11px; color: #444; letter-spacing: 1px; animation: pulse 1.4s infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;

export default CSS;