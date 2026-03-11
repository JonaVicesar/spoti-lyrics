import { useState, useEffect } from "react";
import { useSearch, fetchTrackData } from "./hooks/useSearch";
import { useCanvas } from "./hooks/useCanvas";
import DesignPanel from "./components/DesignPanel";
import LyricsPanel from "./components/LyricsPanel";
import PreviewPanel from "./components/PreviewPanel";
import Footer from "./components/Footer";
import CSS from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function App() {
  const {
    query,
    setQuery,
    results,
    setResults,
    isSearching,
    searchError,
    showResults,
    setShowResults,
    search,
  } = useSearch();

  const [view, setView] = useState("search");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [track, setTrack] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [lyrics, setLyrics] = useState([]);
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const [lyricsError, setLyricsError] = useState("");
  const [selected, setSelected] = useState(new Set());

  const [bgColor, setBgColor] = useState("#5a8a4a");
  const [textColor, setTextColor] = useState("#0d0d0d");
  const [fontSize, setFontSize] = useState(32);
  const [fontFamily, setFontFamily] = useState("Nunito");
  const [cardWidth, setCardWidth] = useState(340);
  const [padding, setPadding] = useState(16);
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.fonts.ready.then(() => {
      document.fonts.load(`800 16px Nunito`).then(() => setFontReady(true));
    });
  }, []);

  //bloquear scroll cuandooel drawer esta abierto
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const handlePickTrack = (result) => {
    setShowResults(false);
    setSelected(new Set());
    setView("editor");
    fetchTrackData(result, {
      setTrack,
      setCoverImg,
      setLyrics,
      setLyricsLoading,
      setLyricsError,
    });
  };

  const handleBack = () => {
    setView("search");
    setDrawerOpen(false);
    setTrack(null);
    setLyrics([]);
    setSelected(new Set());
    setResults([]);
  };

  const { canvasRef, download } = useCanvas({
    track,
    coverImg,
    lyrics,
    selected,
    bgColor,
    textColor,
    fontSize,
    fontFamily,
    cardWidth,
    padding,
    fontReady,
  });

  const designProps = {
    bgColor,
    setBgColor,
    textColor,
    setTextColor,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    cardWidth,
    setCardWidth,
    padding,
    setPadding,
    onDownload: download,
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {/* SEARCH VIEW */}
        {view === "search" && (
          <div className="search-view">
            <div className="search-hero">
              <div className="brand-name">spoti-lyrics</div>
              <div className="brand-sub">● ITUNES + LRCLIB</div>

              <div className="search-box-wrap">
                <div className="search-row">
                  <input
                    className="inp"
                    placeholder="Buscá una canción o artista..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowResults(false);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && search()}
                    autoFocus
                  />
                  <button className="btn btn-green search-btn" onClick={search}>
                    {isSearching ? "..." : "→"}
                  </button>
                </div>

                {searchError && <div className="err">{searchError}</div>}

                {showResults && results.length > 0 && (
                  <div className="results-list">
                    {results.map((result, i) => (
                      <div
                        key={i}
                        className="result-item"
                        onClick={() => handlePickTrack(result)}
                      >
                        {result.artworkUrl100 ? (
                          <img
                            src={result.artworkUrl100}
                            className="result-cover"
                            alt={result.trackName}
                          />
                        ) : (
                          <div className="result-cover result-cover--empty">
                            🎵
                          </div>
                        )}
                        <div>
                          <div className="result-name">{result.trackName}</div>
                          <div className="result-artist">
                            {result.artistName}
                          </div>
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
              <button className="btn-back" onClick={handleBack}>
                Volver
              </button>

                {" "}
                <a
                  href="https://github.com/JonaVicesar/spoti-lyrics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-dark "
       
                >
                  {" "}
                  <FontAwesomeIcon icon={faGithub} />{" "}
                </a>
      
              <button className="btn btn-white btn-download" onClick={download}>
                {" "}
                DESCARGAR
              </button>
            </div>

            {/* body, actualizado para moviles*/}
            <div className="editor-body">
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

              <div className="editor-preview">
                <PreviewPanel canvasRef={canvasRef} />
              </div>

              {/* panel de disenho para ordenadores */}
              <div className="editor-design desktop-only">
                <DesignPanel {...designProps} />
              </div>
            </div>

            {/* botnn flotante de edit para moviles pequenhos */}
            <button
              className="fab"
              onClick={() => setDrawerOpen(true)}
              aria-label="Editar diseño"
            >
              ✏️
            </button>

            {/* overlay oscuro */}
            {drawerOpen && (
              <div
                className="drawer-overlay"
                onClick={() => setDrawerOpen(false)}
              />
            )}

            {/*drawer para moveiles pequenhos*/}
            <div className={`drawer ${drawerOpen ? "drawer--open" : ""}`}>
              <div
                className="drawer-handle"
                onClick={() => setDrawerOpen(false)}
              />
              <div className="drawer-header">
                <span className="drawer-title">Diseño</span>
                <button
                  className="drawer-close"
                  onClick={() => setDrawerOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="drawer-body">
                <DesignPanel {...designProps} />
              </div>
            </div>

            <Footer />
          </div>
        )}
      </div>
    </>
  );
}
