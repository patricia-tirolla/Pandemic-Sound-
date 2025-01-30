import { useLocation } from "react-router-dom";
import React from "react";
import useFetchTracks from "../Song/SongHook";
import "./playlistDisplay.css";

const PlaylistDisplay = () => {
  const location = useLocation();
  const { playlist, trackUrl } = location.state || {};
  const { tracks, error } = useFetchTracks(trackUrl);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!trackUrl) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="display-playlist-container">
      <h2 className="display-playlist-title">Playlist: {playlist.name}</h2>
      <img src={playlist.images[0].url} className="display-playlist-img" alt="playlist" />
      <ul>
        {tracks.map((track) => (
          <li key={track.track.id}>{track.track.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistDisplay;