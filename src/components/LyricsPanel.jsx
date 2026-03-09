import { useState } from "react";

export default function LyricsPanel({ lyrics, setLyrics, selected, setSelected, lyricsLoading, lyricsError, setLyricsError }) {
  const [manualMode, setManualMode] = useState(false);
  const [manualInput, setManualInput] = useState("");

  const toggle = (i) => {
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(i)) n.delete(i); else n.add(i);
      return n;
    });
  };

  const applyManual = () => {
    if (!manualInput.trim()) return;
    setLyrics(manualInput.split("\n"));
    setSelected(new Set());
    setManualMode(false);
    setLyricsError("");
  };

  const cancelManual = () => {
    setManualMode(false);
    setManualInput("");
  };

  const openEdit = () => {
    setManualInput(lyrics.join("\n"));
    setManualMode(true);
  };

  return (
    <div>
      <div className="panel-title">
        {lyrics.length > 0 ? "Seleccioná los versos" : "Letra"}
        {selected.size > 0 && <span className="selected-count">· {selected.size} líneas</span>}
      </div>

      {lyricsLoading && <div className="loading-txt">Buscando letra...</div>}

      {/* no hay letra */}
      {!lyricsLoading && lyricsError === "no_lyrics" && !manualMode && (
        <div className="no-lyrics-box">
          <div className="no-lyrics-title">No encontramos la letra 😕</div>
          <div className="no-lyrics-sub">
            Podés pegarla vos mismo y igual usar la portada de la canción.
          </div>
          <button className="btn btn-green" onClick={() => setManualMode(true)}>
            + Ingresar letra manualmente
          </button>
        </div>
      )}

      {/* editor manual */}
      {manualMode && (
        <div>
          <textarea
            className="inp"
            placeholder={"Pegá la letra acá...\nCada línea va a ser seleccionable."}
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            autoFocus
          />
          <div className="btn-row">
            <button className="btn btn-green" onClick={applyManual}>Usar esta letra</button>
            <button className="btn btn-dark" onClick={cancelManual}>Cancelar</button>
          </div>
        </div>
      )}

      {/* lista para seleccionar letra */}
      {!lyricsLoading && !manualMode && lyrics.length > 0 && (
        <>
          <div className="lyrics-scroll">
            {lyrics.map((line, i) => (
              <div
                key={i}
                className={`lyric-line${!line.trim() ? " empty-line" : ""}${selected.has(i) ? " sel" : ""}`}
                onClick={() => line.trim() && toggle(i)}
              >
                {line || "\u00a0"}
              </div>
            ))}
          </div>
          <div className="btn-row">
            <button className="btn btn-dark btn-sm" onClick={() => setSelected(new Set(lyrics.map((_, i) => i)))}>Todo</button>
            <button className="btn btn-dark btn-sm" onClick={() => setSelected(new Set())}>Limpiar</button>
            <button className="btn btn-dark btn-sm" onClick={openEdit}>Editar</button>
          </div>
        </>
      )}
    </div>
  );
}