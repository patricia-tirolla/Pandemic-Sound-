import "./sidebar.css";
import React, { useState, useEffect } from "react";
import GetPlaylist from "./GetPlaylist/GetPlaylist";
import AddPlaylist from "./AddPlaylist/AddPlaylist";
import { useProfile } from "../../Hooks/Profile";
import useFetch from "../../Hooks/useFetch"

//this will be updated soon for a context to check playlist state 
//right now sidebar is not updating
//we are working for you!

function Sidebar() {
  const [playlists, setPlaylists] = useState([]);
  const [reFetch, setReFetch] = useState(false);
  const profile = useProfile();

  const triggerReFetch = () => {
    setReFetch((prev) => !prev);
  };
  const token = localStorage.getItem("accessToken");
  const playlistAPI = profile && token ? `https://api.spotify.com/v1/users/${profile.id}/playlists` : null;
  const { data } = useFetch(playlistAPI, token);

  useEffect(() => {
    if (data) {
    
      setPlaylists((prevPlaylists) => {
        if (prevPlaylists.length === 0 || hasPlaylistChanged(prevPlaylists, data.items)) {
          return data.items;
        }
        return prevPlaylists; 
      });
    }
  }, [data, reFetch]);

  const hasPlaylistChanged = (oldPlaylists, newPlaylists) => {
    if (oldPlaylists.length !== newPlaylists.length) return true; //checking changes on items

    for (let i = 0; i < oldPlaylists.length; i++) {
      if (oldPlaylists[i].name !== newPlaylists[i].name) {
        return true; //cheking name change
      }
    }

    return false;
  };

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
