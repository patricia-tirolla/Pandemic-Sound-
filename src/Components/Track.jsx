// components/Track.jsx
import React from "react";
// import useAddTrackToPlaylist from "../hooks/useAddTrackToPlaylist";
import useAddTrackToPlaylist from "../Hooks/useAddTrackToPlaylist";
const Track = ({ track, playlists, activeTrackId, toggleDropdown, dropdownRef }) => {
  const { addTrackToPlaylist, isLoading } = useAddTrackToPlaylist();

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleAddToPlaylist = (event, playlistId, trackUri) => {
    event.stopPropagation();
    addTrackToPlaylist(playlistId, trackUri);
  };

  return (
    <div className="track">
      {track.album.images[0] && (
        <img
          className="trackImage"
          src={track.album.images[0].url}
          alt="Track Art"
        />
      )}
      <div className="trackDetails">
        <p className="trackName">{track.name}</p>
        <p className="trackArtist">{track.artists.map(artist => artist.name).join(", ")}</p>
        <p className="trackDuration">{formatDuration(track.duration_ms)}</p>
        <div className="dropdown" ref={dropdownRef}>
          <button className="dropdown-button" onClick={() => toggleDropdown(track.id)}>
            {isLoading && activeTrackId === track.id ? 'Adding...' : 'Add to Playlist'}
          </button>
          {activeTrackId === track.id && (
            <div className="dropdown-menu">
              {playlists.map(playlist => (
                <div
                  key={playlist.id}
                  className="dropdown-item"
                  onClick={(e) => handleAddToPlaylist(e, playlist.id, track.uri)}
                >
                  {playlist.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Track;
