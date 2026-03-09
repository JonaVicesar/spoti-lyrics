import { useRef, useEffect } from "react";

export default function SearchBox({ query, setQuery, results, showResults, setShowResults, isSearching, searchError, onSearch, onPickTrack }) {
  const wrapRef = useRef(null);

  // cerrar al clickear afuera
useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setShowResults(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setShowResults]);

  return (
    <div>
      <div className="search-wrap" ref={wrapRef}>
        <div className="search-row">
          <input
            className="inp"
            placeholder="Canción o artista..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowResults(false); }}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            onFocus={() => results.length > 0 && setShowResults(true)}
          />
          <button
            className="btn btn-green"
            onClick={onSearch}
            style={{ width: "auto", padding: "9px 12px", fontSize: 12 }}
          >
            {isSearching ? "..." : "→"}
          </button>
        </div>

        {showResults && results.length > 0 && (
          <div className="dropdown">
            {results.map((result, i) => (
              <div key={i} className="result-item" onClick={() => onPickTrack(result)}>
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

      {searchError && <div className="err">{searchError}</div>}
    </div>
  );
}