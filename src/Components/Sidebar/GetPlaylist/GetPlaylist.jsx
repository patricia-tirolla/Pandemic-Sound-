import "./getPlaylist.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaylist } from "../../../Contexts/PlaylistContext";

const GetPlaylist = () => {
  const { playlists, fetchPlaylists, loading } = usePlaylist();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      setTimeout(() => {
        const profileId = localStorage.getItem("profileId");
        const token = localStorage.getItem("accessToken");

        if (profileId && token && playlists.length === 0) {
          fetchPlaylists(profileId, token);
        } else {
          setData(playlists);
        }
      }, 1000);
    },
    [fetchPlaylists, playlists]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const displayPlaylist = (playlist) => {
    navigate(`/playlist/${playlist.name}`,{ state: {playlist}});
  };


  return (
    <div>
      <div className="playlistContainer">
        {data.length > 0 ? (
          data.map((playlist) => (
            <div
              key={playlist.id}
              className="single-playlist-container"
              onClick={() => displayPlaylist(playlist)}
            >
              <img src={playlist.images[0].url} className="playlist-image" />
              <div className="playlist-info">
                <h4>{playlist.name}</h4>
                <p>{playlist.tracks.total} songs</p>
              </div>
            </div>
          ))
        ) : (
          <p>No playlists found</p>
        )}
      </div>
    </div>
  );
};
export default GetPlaylist;
