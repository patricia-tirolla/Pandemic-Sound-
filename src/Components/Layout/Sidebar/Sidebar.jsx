import "./sidebar.css";
import React, { useState } from "react";
import AddPlaylist from "./components/AddPlaylist/AddPlaylist";
import { usePlaylists } from "../../../Hooks/PlaylistsProvider";
import GetPlaylist from "./components/GetPlaylist/GetPlaylist";

function Sidebar() {
  const { playlists, fetchPlaylists } = usePlaylists();
  const [isOpen, setIsOpen] = useState(true);


  const toggleSidebar = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <>
      <button  className={`toggle-sidebar ${isOpen ? 'open' : ''}`}  onClick={toggleSidebar}>
      <span className="toggle-icon" >{isOpen ? "×" : ">"}</span> 
      </button>

      <div className={`sideBar ${isOpen ? 'open' : 'closed'}`}>
        <div className="title-sidebar-container">
          <h2 className="sideBar-title">Playlists</h2>
          <AddPlaylist fetchPlaylists={fetchPlaylists} />
        </div>
        <GetPlaylist playlists={playlists} />
      </div>
    </>
  );
}

export default Sidebar;
