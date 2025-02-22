import { Outlet } from "react-router-dom";
import "./layout.css";
// can remove this import cause it's already imported in App.jsx
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
