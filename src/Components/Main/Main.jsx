import { Outlet } from "react-router-dom";
import "./main.css";
import "../../styles/App.css";
import Nav from "../Nav/Nav";
import Sidebar from "../Sidebar/Sidebar";
import { ProfileProvider } from "../../Hooks/Profile";

function Main() {

  return (
    <ProfileProvider>
      <Nav />
      <Sidebar />
      <div className="main">
        <Outlet />
      </div>
    </ProfileProvider>
  );
}
export default Main;
