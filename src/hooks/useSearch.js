import { useState, useCallback } from "react";
import { ITUNES_API, LYRICS_API } from "../constants";
import { loadImage } from "../utils";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [showResults, setShowResults] = useState(false);

  const search = useCallback(async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setResults([]);
    setSearchError("");
    setShowResults(true);
    try {
      const res = await fetch(
        `${ITUNES_API}?term=${encodeURIComponent(query)}&entity=song&limit=8&country=AR`
      );
      const data = await res.json();
      if (data.results?.length > 0) {
        setResults(data.results);
      } else {
        setSearchError("No se encontraron resultados.");
      }
    } catch {
      setSearchError("Error de red al buscar.");
    }
    setIsSearching(false);
  }, [query]);

  return {
    query, setQuery,
    results, setResults,
    isSearching,
    searchError,
    showResults, setShowResults,
    search,
  };
}

export async function fetchTrackData(result, { setTrack, setCoverImg, setLyrics, setLyricsLoading, setLyricsError }) {
  setTrack(result);
  setCoverImg(null);
  setLyrics([]);
  setLyricsLoading(true);
  setLyricsError("");

  // portada
  try {
    const hiResUrl = result.artworkUrl100
      .replace("100x100bb", "600x600bb")
      .replace("100x100", "600x600");
    const img = await loadImage(hiResUrl);
    setCoverImg(img);
  } catch {}

  // letra
  try {
    const res = await fetch(
      `${LYRICS_API}?artist_name=${encodeURIComponent(result.artistName)}&track_name=${encodeURIComponent(result.trackName)}`
    );
    const data = await res.json();
    if (data.plainLyrics) {
      setLyrics(data.plainLyrics.split("\n"));
    } else {
      setLyricsError("no_lyrics");
    }
  } catch {
    setLyricsError("no_lyrics");
  }

  setLyricsLoading(false);
}