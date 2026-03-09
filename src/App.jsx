import { useState, useEffect } from "react";
import { useSearch, fetchTrackData } from "./hooks/useSearch";
import { useCanvas } from "./hooks/useCanvas";
import DesignPanel from "./components/DesignPanel";
import LyricsPanel from "./components/LyricsPanel";
import PreviewPanel from "./components/PreviewPanel";
import Footer from "./components/Footer";
import CSS from "./styles";

export default function App() {
  const {
    query, setQuery,
    results, setResults,
    isSearching, searchError,
    showResults, setShowResults,
    search,
  } = useSearch();

  // vista actual, por defecto la vista de busqueda
  const [view, setView] = useState("search");

  const [track, setTrack] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [lyrics, setLyrics] = useState([]);
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const [lyricsError, setLyricsError] = useState("");
  const [selected, setSelected] = useState(new Set());

  const [bgColor, setBgColor] = useState("#5a8a4a");
  const [textColor, setTextColor] = useState("#0d0d0d");
  const [fontSize, setFontSize] = useState(46);
  const [fontFamily, setFontFamily] = useState("Nunito");
  const [cardWidth, setCardWidth] = useState(500);
  const [padding, setPadding] = useState(44);
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.fonts.ready.then(() => {
      document.fonts.load(`800 16px Nunito`).then(() => setFontReady(true));
    });
  }, []);

  const handlePickTrack = (result) => {
    setShowResults(false);
    setSelected(new Set());
    setView("editor");
    fetchTrackData(result, { setTrack, setCoverImg, setLyrics, setLyricsLoading, setLyricsError });
  };

  const handleBack = () => {
    setView("search");
    setTrack(null);
    setLyrics([]);
    setSelected(new Set());
    setResults([]);
  };

  const { canvasRef, download } = useCanvas({
    track, coverImg, lyrics, selected,
    bgColor, textColor, fontSize, fontFamily, cardWidth, padding, fontReady,
  });

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* SEARCH VIEW */}
        {view === "search" && (
          <div className="search-view">
            <div className="search-hero">
              <div className="brand-name">spoti-lyrics</div>

              <div className="search-box-wrap">
                <div className="search-row">
                  <input
                    className="inp"
                    placeholder="Buscá una canción o artista..."
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setShowResults(false); }}
                    onKeyDown={(e) => e.key === "Enter" && search()}
                    autoFocus
                  />
                  <button
                    className="btn btn-green search-btn"
                    onClick={search}
                  >
                    {isSearching ? "..." : "→"}
                  </button>
                </div>

                {searchError && <div className="err">{searchError}</div>}

                {showResults && results.length > 0 && (
                  <div className="results-list">
                    {results.map((result, i) => (
                      <div key={i} className="result-item" onClick={() => handlePickTrack(result)}>
                        {result.artworkUrl100
                          ? <img src={result.artworkUrl100} className="result-cover" alt={result.trackName} />
                          : <div className="result-cover result-cover--empty">🎵</div>
                        }
                        <div>
                          <div className="result-name">{result.trackName}</div>
                          <div className="result-artist">{result.artistName}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <Footer />
          </div>
        )}

        {/* EDITOR VIEW */}
        {view === "editor" && (
          <div className="editor-view">

            {/* header */}
            <div className="editor-header">
              <button className="btn-back" onClick={handleBack}>Volver</button>
  
            </div>

            {/* MAIN */}
            <div className="editor-body">

              <div className="editor-preview">
                <div className="panel-title">Preview</div>
                <PreviewPanel canvasRef={canvasRef} />
              </div>

              {/* letras */}
              <div className="editor-lyrics">
                <LyricsPanel
                  lyrics={lyrics}
                  setLyrics={setLyrics}
                  selected={selected}
                  setSelected={setSelected}
                  lyricsLoading={lyricsLoading}
                  lyricsError={lyricsError}
                  setLyricsError={setLyricsError}
                />
              </div>

              {/* disenho */}
              <div className="editor-design">
                <div className="panel-title">Diseño</div>
                <DesignPanel
                  bgColor={bgColor} setBgColor={setBgColor}
                  textColor={textColor} setTextColor={setTextColor}
                  fontSize={fontSize} setFontSize={setFontSize}
                  fontFamily={fontFamily} setFontFamily={setFontFamily}
                  cardWidth={cardWidth} setCardWidth={setCardWidth}
                  padding={padding} setPadding={setPadding}
                  onDownload={download}
                />
              </div>

            </div>

            <Footer />
          </div>
        )}

      </div>
    </>
  );
}