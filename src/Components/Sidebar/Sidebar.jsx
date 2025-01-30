import GetPlaylist from "./GetPlaylist/GetPlaylist";
import AddPlaylist from "./AddPlaylist/AddPlaylist";
import "./sidebar.css"
import React from "react";


function Sidebar() {
    return (
      <div className="sideBar">
        <div className="title-sidebar-container">
        <h2 className="sideBar-title">Playlists</h2>
        <AddPlaylist/>
        </div>
       
        <GetPlaylist/>

    </div>
  );
}

export default Sidebar;