import GetPlaylist from "./GetPlaylist/GetPlaylist";
import "./sidebar.css"
import React from "react";


function Sidebar() {
    return (
      <div className="sideBar">
        <h2 className="sideBar-title">Playlists</h2>
        <GetPlaylist/>

    </div>
  );
}

export default Sidebar;