import "./getPlaylist.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const defaultImage =
  "https://static.vecteezy.com/system/resources/thumbnails/002/249/673/small/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg";
const defaultName = "Untitled Playlist";

// can create a separate component for PlaylistItem for better readability
const PlaylistItem = ({ playlist, onClick }) => (
  <div className="single-playlist-container" onClick={onClick}>
    <img
      alt="playlistimage"
      src={playlist?.images?.[0]?.url || defaultImage}
      className="playlist-image"
    />
    <div className="playlist-info">
      <h4>{playlist?.name || defaultName}</h4>
    </div>
  </div>
);

export const GetPlaylist = ({ playlists }) => {
  const navigate = useNavigate();

  const displayPlaylist = (playlist) => {
    navigate(`/playlist/${playlist.id}`);
  };
  return (
    <div className="playlistContainer">
      {/* playlists.length === 0 can be simplified to */}
      {playlists.length ? (
        playlists.map((playlist) => (
          <PlaylistItem
            key={playlist.id}
            playlist={playlist}
            onClick={() => displayPlaylist(playlist)}
          />
        ))
      ) : (
        <p>No playlists found</p>
      )}
    </div>
  );
};

export default GetPlaylist;
