import "./getPlaylist.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export const GetPlaylist = ({ playlists }) => {
  const navigate = useNavigate();

  const displayPlaylist = (playlist) => {
    navigate(`/playlist/${playlist.id}`);
  };

  const defaultImage =
    "https://static.vecteezy.com/system/resources/thumbnails/002/249/673/small/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg";
  const defaultName = "Untitled Playlist";

  return (
    <div className="playlistContainer">
      {playlists.length === 0 ? (
        <div>
          <p>No playlists found</p>
        </div>
      ) : (
        playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="single-playlist-container"
            onClick={() => displayPlaylist(playlist)}
          >
            <img
              alt="playlistimage"
              src={
                playlist?.images?.length > 0
                  ? playlist.images[0].url
                  : defaultImage
              }
              className="playlist-image"
            />
            <div className="playlist-info">
              <h4>{playlist?.name || defaultName}</h4>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default GetPlaylist;
