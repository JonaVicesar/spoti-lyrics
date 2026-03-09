export default function TrackChip({ track }) {
  if (!track) return null;
  return (
    <div className="track-chip">
      {track.artworkUrl100
        ? <img src={track.artworkUrl100} className="track-chip-cover" alt={track.trackName} />
        : <div className="track-chip-cover track-chip-cover--empty">🎵</div>
      }
      <div>
        <div className="track-chip-title">{track.trackName}</div>
        <div className="track-chip-artist">{track.artistName}</div>
      </div>
    </div>
  );
}