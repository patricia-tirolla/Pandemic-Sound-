import GetPlaylist from "./GetPlaylist/GetPlaylist";
import "./sidebar.css"

function Sidebar() {
    return (
      <div className="sideBar">
        <h2 className="sideBar-title">Playlists</h2>
        <GetPlaylist/>

    </div>
  );
}

export default Sidebar;