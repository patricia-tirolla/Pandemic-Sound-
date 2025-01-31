import "./getPlaylist.css";
import React from "react";

import { useNavigate } from "react-router-dom";

export const GetPlaylist = ({ playlists }) => {
  const navigate = useNavigate();

  const displayPlaylist = (playlist) => {
    navigate(`/playlist/${playlist.name}`, { state: { playlist, trackUrl: playlist.tracks.href } });
    navigate(`/playlist/${playlist.name}`, { state: { playlist, trackUrl: playlist.tracks.href } });
  };

  const defaultImage = "https://static.vecteezy.com/system/resources/thumbnails/002/249/673/small/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg"; 
  const defaultName = "Untitled Playlist";


  return (
    <div className="playlistContainer">
      {playlists.length > 0 ? (
        playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="single-playlist-container"
            onClick={() => displayPlaylist(playlist)}
          >
            <img src={playlist?.images?.length > 0 ? playlist.images[0].url : defaultImage} className="playlist-image" />
            <div className="playlist-info">
              <h4>{playlist?.name || defaultName}</h4>
              <p>{playlist?.tracks?.total || 0} songs</p>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>No playlists found</p>
        </div>
      )}
      </div>
    )

}


export default GetPlaylist;