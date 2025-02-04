import { Outlet } from "react-router-dom";
import "./main.css";
import "../../styles/App.css";
import Nav from "../Nav/Nav";
import Sidebar from "../Sidebar/Sidebar";
import { ProfileProvider } from "../../Hooks/Profile";
import NavigationArrows from "../NavigationArrows/NavigationArrows";
import PlaylistsProvider from "../PlaylistsProvider/PlaylistsProvider";

function Main() {

  return (
    <ProfileProvider>
      <div className="app">
        <Nav />
        <PlaylistsProvider>
          <Sidebar />
          <NavigationArrows />
          <div className="main">
            <Outlet />
          </div>
        </PlaylistsProvider>
      </div>
    </ProfileProvider>
  );
}
export default Main;
