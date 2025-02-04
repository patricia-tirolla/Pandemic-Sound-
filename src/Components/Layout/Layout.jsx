import { Outlet } from "react-router-dom";
import "./layout.css";
import "../../styles/App.css";
import Nav from "./Nav/Nav";
import Sidebar from "./Sidebar/Sidebar";
import { ProfileProvider } from "../../Hooks/Profile";
import NavigationArrows from "./NavigationArrows/NavigationArrows";
import PlaylistsProvider from "../../Hooks/PlaylistsProvider";

function Layout() {

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
export default Layout;
