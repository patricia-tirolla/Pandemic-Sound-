import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import useFetchTracks from "../Song/GetTrackUrl";
import "./playlistDisplay.css";
import PlaylistSubmenu from "../Song/PlaylistSubMenu";

const PlaylistDisplay = () => {
  const location = useLocation();
  const { playlist, trackUrl } = location.state || {};
  const { tracks, error } = useFetchTracks(trackUrl);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!trackUrl) {
    return <h2>Loading...</h2>;
  }
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const defaultImage = "https://static.vecteezy.com/system/resources/thumbnails/002/249/673/small/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg"; 
  const defaultName = "Untitled Playlist";
  return (
    <div className="display-playlist-container">
      <h2 className="display-playlist-title">Playlist: {playlist?.name || defaultName}</h2>
      <img src={playlist?.images?.length > 0 ? playlist.images[0].url : defaultImage} className="display-playlist-img" alt="playlist" />
      <ul>
      {tracks.map(({ track }) => (
          <div key={track.id} className="track">
           {track.album.images[0] && (
              <img
                className="trackImage"
                src={track.album.images[0].url}
                alt="Track Art"
              />
            )}
            <div className="trackDetails">
            <p className="trackName">{track.name}</p>
            <p className="trackArtist"> {track.artists.map(artist => artist.name).join(", ")}</p>
            <p className="trackDuration">{formatDuration(track.duration_ms)}</p>
            <div>
                <button
                  className="button1"
                  onClick={handleClick}
                >
                  Open Menu
                </button>
                <button
                  className="button2"
                  onClick={handleClose}
                >
                  Close Menu
                </button>
                {anchorEl && (
                  <PlaylistSubmenu anchorEl={anchorEl} handleClose={handleClose} />
                )}
              </div>
           </div>
            
          </div>

        ))}
      </ul>
    </div>
  );
};

export default PlaylistDisplay;