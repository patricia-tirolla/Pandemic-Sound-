import "./sidebar.css";
import React, { useState, useEffect } from "react";
import GetPlaylist from "./GetPlaylist/GetPlaylist";
import AddPlaylist from "./AddPlaylist/AddPlaylist";
import { useProfile } from "../../Hooks/Profile";

function Sidebar() {
  const [playlists, setPlaylists] = useState([]);
  const [reFetch, setReFetch] = useState(false);
  const profile = useProfile();

  const triggerReFetch = () => {
    setReFetch((prev) => !prev);
  };

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
    <div className="sideBar">
      <div className="title-sidebar-container">
        <h2 className="sideBar-title">Playlists</h2>
        <AddPlaylist triggerReFetch={triggerReFetch} />
      </div>
      <GetPlaylist playlists={playlists} />
    </div>
  );
}

export default Sidebar;
