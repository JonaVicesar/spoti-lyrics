import { useState, useEffect } from "react";
import { useSearch, fetchTrackData } from "./hooks/useSearch";
import { useCanvas } from "./hooks/useCanvas";
import SearchBox from "./components/SearchBox";
import TrackChip from "./components/TrackChip";
import DesignPanel from "./components/DesignPanel";
import LyricsPanel from "./components/LyricsPanel";
import PreviewPanel from "./components/PreviewPanel";

export default function App() {
  // busqueda
  const { query, setQuery, results, setResults, isSearching, searchError, showResults, setShowResults, search } = useSearch();

  // track
  const [track, setTrack] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [lyrics, setLyrics] = useState([]);
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const [lyricsError, setLyricsError] = useState("");
  const [selected, setSelected] = useState(new Set());

  // disenho
  const [bgColor, setBgColor] = useState("#5a8a4a");
  const [textColor, setTextColor] = useState("#0d0d0d");
  const [fontSize, setFontSize] = useState(46);
  const [fontFamily, setFontFamily] = useState("Nunito");
  const [cardWidth, setCardWidth] = useState(500);
  const [padding, setPadding] = useState(44);
  const [fontReady, setFontReady] = useState(false);

  // cargar fuente nunito
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
    fetchTrackData(result, { setTrack, setCoverImg, setLyrics, setLyricsLoading, setLyricsError });
  };

  // canvas
  const { canvasRef, download } = useCanvas({
    track, coverImg, lyrics, selected,
    bgColor, textColor, fontSize, fontFamily, cardWidth, padding, fontReady,
  });

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* SIDEBAR*/}
        <div className="sidebar">
          <div className="brand">

            <div className="brand-name">spoti-lyrics</div>

          </div>

          <div className="section-title">Buscar canción</div>
          <SearchBox
            query={query}
            setQuery={setQuery}
            results={results}
            showResults={showResults}
            setShowResults={setShowResults}
            isSearching={isSearching}
            searchError={searchError}
            onSearch={search}
            onPickTrack={handlePickTrack}
          />

          {track && (
            <>
              <div className="divider" />
              <TrackChip track={track} />
              <DesignPanel
                bgColor={bgColor} setBgColor={setBgColor}
                textColor={textColor} setTextColor={setTextColor}
                fontSize={fontSize} setFontSize={setFontSize}
                fontFamily={fontFamily} setFontFamily={setFontFamily}
                cardWidth={cardWidth} setCardWidth={setCardWidth}
                padding={padding} setPadding={setPadding}
                onDownload={download}
              />
            </>
          )}
        </div>

        {/*MAIN */}
        <div className="main">
          {!track ? (
            <div className="empty-state">
              <div className="empty-icon">🎵</div>
              <div className="empty-label">Buscá una canción para empezar</div>
            </div>
          ) : (
            <div className="content-grid">
              <LyricsPanel
                lyrics={lyrics}
                setLyrics={setLyrics}
                selected={selected}
                setSelected={setSelected}
                lyricsLoading={lyricsLoading}
                lyricsError={lyricsError}
                setLyricsError={setLyricsError}
              />
              <PreviewPanel canvasRef={canvasRef} />
            </div>
          )}
        </div>

      </div>
    </>
  );
}

import CSS from "./styles";