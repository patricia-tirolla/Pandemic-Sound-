import "./getPlaylist.css";
import PlaylistDisplay from "../../PlaylistDisplay/PlaylistDisplay";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../../contexts";

const GetPlaylist = () => {
  const profile = useContext(ProfileContext);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const playlistParameters = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (profile !== null) {
      const playlistAPI = `https://api.spotify.com/v1/users/${profile.id}/playlists`;

      fetch(playlistAPI, playlistParameters)
        .then((response) => response.json())
        .then((playlist) => {
          console.log(playlist.items);
          playlist.items.forEach((item) => {
            const trackUrl = item.tracks.href; 
            if (trackUrl) {
              localStorage.setItem(item.id, trackUrl); //passing to localstorage
            }
          });

          setData(playlist.items);
        })
        .catch((error) => console.log("Error fetching playlists:", error))
    
        .finally(() => setLoading(false));
    }
  }, [profile]);


  if (loading) {
    return <h2>Loading...</h2>;
  }

  const displayPlaylist = (playlist) => {
    navigate(`/playlist/${playlist.name}`, { state: { playlist } });
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
              <img src={playlist.images[0].url} className="playlist-image" alt="playlist"/>
              <div className="playlist-info">
                <h4>{playlist.name}</h4>
                <p>{playlist.tracks.total} songs</p>
                <PlaylistDisplay trackUrl={playlist.tracks.href}/>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>No playlists found</p>
            <button>Add new playlist</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default GetPlaylist;
