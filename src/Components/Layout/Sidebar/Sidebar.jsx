import "./sidebar.css";
import React from "react";
import AddPlaylist from "./components/AddPlaylist/AddPlaylist";
import { usePlaylists } from "../../../Hooks/PlaylistsProvider";
import GetPlaylist from "./components/GetPlaylist/GetPlaylist"


function Sidebar() {
  const {playlists, fetchPlaylists} = usePlaylists();

  return (
    <div className="sideBar">
      <div className="title-sidebar-container">
        <h2 className="sideBar-title">Playlists</h2>
        <AddPlaylist fetchPlaylists={fetchPlaylists} />
      </div>
      <GetPlaylist playlists={playlists} />
    </div>
  );
}

export default Sidebar;
