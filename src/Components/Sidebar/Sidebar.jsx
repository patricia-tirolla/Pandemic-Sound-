import "./sidebar.css";
import React from "react";
import AddPlaylist from "./AddPlaylist/AddPlaylist";
import { usePlaylists } from "../PlaylistsProvider/PlaylistsProvider";
import GetPlaylist from "./GetPlaylist/GetPlaylist"


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
