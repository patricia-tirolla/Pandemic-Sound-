import GetPlaylist from "../Playlists/Playlist";
import "./sidebar.css"

function Sidebar() {
    return (
      <div className="sideBar">
        <h2>Playlists</h2>
        <GetPlaylist/>

      </div>
    );
  }
  
  export default Sidebar;