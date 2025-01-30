import { Outlet } from "react-router-dom";
import "./main.css";
import "../../styles/App.css";
import { fetchProfile } from "../AuthCallback/script";
import { useState, useEffect } from "react";

import { ProfileContext } from "../../contexts";
import Nav from "../Nav/Nav";
import Sidebar from "../Sidebar/Sidebar";

function Main() {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    (async () => {
      if (token) {
        const fetchedProfile = await fetchProfile(token);
        console.log("Fetched profile:", fetchedProfile);
        setProfile(fetchedProfile);
        localStorage.setItem("profileId", fetchedProfile.id);
      }
    })();
  }, [token]);

  return (
    <ProfileContext.Provider value={profile}>
      <Nav />
      <Sidebar />
      <div className="main">
        <Outlet />
      </div>
    </ProfileContext.Provider>
  );
}
export default Main;
