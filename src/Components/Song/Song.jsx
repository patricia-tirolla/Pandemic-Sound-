import React, { useState } from "react";
import useSpotifyTrackData from "./SongHook";
import "./song.css";

const Song = () => {
  const [error] = useState(null);
  const [accessToken] = useState(localStorage.getItem("accessToken"));

  const trackId = "11dFghVXANMlKmJXsNCbNl"; // Example track ID
  const { trackData, error: trackError } = useSpotifyTrackData(
    accessToken,
    trackId
  );

  if (error || trackError) {
    return <div>Error: {error || trackError}</div>;
  }

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="songContainer">
      {trackData && (
        <div className="trackDetails">
          <img
            className="trackImage"
            src={trackData.album.images[0].url}
            alt="Track Art"
          />
          <div className="trackInfo">
            <p className="trackName">{trackData.name}</p>
            <p className="trackArtistName">{trackData.artists[0].name}</p>
            <p className="trackLength">
              Duration: {formatDuration(trackData.duration_ms)}
            </p>
            <button className="trackButtonHeart">heart</button>
            <button className="trackButtonAddtoPlaylist">
              add to playlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Song;
