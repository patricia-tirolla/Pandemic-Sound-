import React, { useEffect, useState } from 'react';
import PlaylistMenu from './PlaylistMenu';
import { useProfile } from "../../Hooks/Profile";

const PlaylistSubmenu = ({  reFetch }) => {
  const [playlists, setPlaylists] = useState([]);
    const profile = useProfile();
  

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (profile && token) {
        const playlistAPI = `https://api.spotify.com/v1/users/${profile.id}/playlists`;
      const playlistParameters = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      fetch(playlistAPI, playlistParameters)
        .then((response) => response.json())
        .then((data) => {
          setPlaylists(data.items);
        })
        .catch((error) => console.log("Error fetching playlists:", error));
    }
  }, [profile,reFetch]);

  return (
    <div className="playlist-sub-menu">
      {playlists.length > 0 ? (
        <PlaylistMenu playlists={playlists} />
      ) : (
        <div>No playlists available</div>
      )}
    </div>
  );
};

export default PlaylistSubmenu;