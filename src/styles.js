const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Nunito:wght@400;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #090909; --surface: #111; --border: #1e1e1e; --border2: #2a2a2a;
    --text: #e2e2e2; --muted: #555; --accent: #1db954; --danger: #e63946;
    --font-display: 'Bebas Neue', cursive; --font-body: 'DM Mono', monospace;
  }
  html, body, #root { height: 100%; }
  body { background: var(--bg); }
  .app { display: flex; height: 100vh; font-family: var(--font-body); background: var(--bg); color: var(--text); overflow: hidden; }

  /* SIDEBAR */
  .sidebar { width: 290px; min-width: 290px; background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; overflow-y: auto; padding: 22px 18px; }
  .sidebar::-webkit-scrollbar { width: 4px; }
  .sidebar::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
  .brand { margin-bottom: 22px; }
  .brand-eyebrow { font-size: 9px; letter-spacing: 4px; text-transform: uppercase; color: var(--muted); }
  .brand-name { font-family: var(--font-display); font-size: 30px; letter-spacing: 2px; color: #fff; line-height: 1; }
  .brand-sub { font-size: 9px; color: var(--accent); letter-spacing: 2px; margin-top: 2px; }
  .divider { height: 1px; background: var(--border); margin: 16px 0; }
  .section-title { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }

  /* INPUTS / BUTTONS */
  .inp { width: 100%; background: #161616; border: 1px solid var(--border2); border-radius: 7px; color: var(--text); padding: 9px 12px; font-family: var(--font-body); font-size: 11px; outline: none; transition: border 0.15s; }
  .inp:focus { border-color: #404040; }
  .inp::placeholder { color: #383838; }
  textarea.inp { resize: vertical; min-height: 180px; line-height: 1.7; }
  .btn { display: block; width: 100%; padding: 10px 14px; border-radius: 7px; border: none; cursor: pointer; font-family: var(--font-body); font-size: 10px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; transition: all 0.15s; text-align: center; }
  .btn-green { background: var(--accent); color: #000; }
  .btn-green:hover { background: #21cf5f; }
  .btn-dark { background: #161616; color: var(--text); border: 1px solid var(--border2); }
  .btn-dark:hover { background: #1e1e1e; }
  .btn-white { background: #e8e8e8; color: #000; }
  .btn-white:hover { background: #fff; }
  .btn-sm { padding: 7px 12px; font-size: 9px; }
  .btn-row { display: flex; gap: 6px; margin-top: 8px; }

  /* SEARCH */
  .search-wrap { position: relative; margin-bottom: 8px; }
  .search-row { display: flex; gap: 6px; }
  .search-row .inp { flex: 1; }
  .search-row .btn { width: auto; padding: 9px 12px; }
  .dropdown { position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: #141414; border: 1px solid var(--border2); border-radius: 9px; z-index: 100; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.5); }
  .result-item { display: flex; align-items: center; gap: 10px; padding: 8px 10px; cursor: pointer; transition: background 0.1s; border-bottom: 1px solid var(--border); }
  .result-item:last-child { border-bottom: none; }
  .result-item:hover { background: #1c1c1c; }
  .result-cover { width: 38px; height: 38px; border-radius: 5px; object-fit: cover; flex-shrink: 0; background: #1e1e1e; }
  .result-cover--empty { display: flex; align-items: center; justify-content: center; font-size: 16px; }
  .result-name { font-size: 11px; font-weight: 500; color: #ddd; line-height: 1.3; }
  .result-artist { font-size: 10px; color: #555; margin-top: 1px; }
  .err { font-size: 10px; color: var(--danger); background: #1a0808; border: 1px solid #2e1010; border-radius: 6px; padding: 8px 10px; margin-top: 6px; }

  /* TRACK CHIP */
  .track-chip { display: flex; align-items: center; gap: 10px; background: #141414; border: 1px solid var(--border2); border-radius: 8px; padding: 8px 10px; margin-bottom: 14px; }
  .track-chip-cover { width: 34px; height: 34px; border-radius: 4px; object-fit: cover; flex-shrink: 0; background: #1e1e1e; }
  .track-chip-cover--empty { display: flex; align-items: center; justify-content: center; font-size: 14px; }
  .track-chip-title { font-size: 11px; font-weight: 500; color: #ddd; line-height: 1.3; }
  .track-chip-artist { font-size: 10px; color: #555; }

  /* DESIGN PANEL */
  .slider { width: 100%; accent-color: var(--accent); cursor: pointer; }
  .slider-label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
  .slider-label span:first-child { font-size: 9px; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; }
  .slider-label span:last-child { font-size: 10px; color: #888; font-variant-numeric: tabular-nums; }
  .presets-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-bottom: 10px; }
  .preset-btn { border-radius: 6px; height: 28px; cursor: pointer; border: 2px solid transparent; transition: transform 0.1s, border 0.1s; }
  .preset-btn:hover { transform: scale(1.08); }
  .preset-btn.active { border-color: #fff; }
  .color-pickers { display: flex; gap: 8px; margin-bottom: 12px; }
  .color-pick-wrap { flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .color-pick-label { font-size: 9px; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; }
  .color-pick { width: 100%; height: 34px; border-radius: 6px; border: 1px solid var(--border2); cursor: pointer; background: #161616; }
  select.inp { cursor: pointer; }

  /* MAIN */
  .main { flex: 1; overflow-y: auto; display: flex; flex-direction: column; padding: 28px; gap: 20px; background: var(--bg); }
  .main::-webkit-scrollbar { width: 4px; }
  .main::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 2px; }
  .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
  .panel-title { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }

  /* LYRICS */
  .lyrics-scroll { max-height: 520px; overflow-y: auto; padding-right: 2px; }
  .lyrics-scroll::-webkit-scrollbar { width: 3px; }
  .lyrics-scroll::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
  .lyric-line { padding: 3px 9px; border-radius: 5px; cursor: pointer; font-size: 11px; line-height: 1.8; border: 1px solid transparent; transition: all 0.1s; color: #555; user-select: none; letter-spacing: 0.3px; }
  .lyric-line:hover:not(.empty-line) { background: #141414; color: #bbb; }
  .lyric-line.sel { background: rgba(29,185,84,0.08); border-color: rgba(29,185,84,0.2); color: #5dc984; }
  .lyric-line.empty-line { height: 10px; cursor: default; }
  .selected-count { color: var(--accent); margin-left: 6px; }
  .no-lyrics-box { background: #141414; border: 1px solid var(--border2); border-radius: 10px; padding: 18px 16px; }
  .no-lyrics-title { font-size: 11px; color: #bbb; margin-bottom: 6px; font-weight: 500; }
  .no-lyrics-sub { font-size: 10px; color: #444; margin-bottom: 14px; line-height: 1.6; }

  /* CANVAS */
  .canvas-wrap { display: flex; justify-content: center; }
  .canvas-container { border-radius: 14px; overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.7); display: inline-block; }
  canvas { display: block; max-width: 100%; height: auto; }

  /* EMPTY STATE */
  .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 10px; padding-top: 80px; }
  .empty-icon { font-size: 52px; }
  .empty-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #2a2a2a; }
  .loading-txt { font-size: 11px; color: #444; letter-spacing: 1px; animation: pulse 1.4s infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
`;

export default CSS;