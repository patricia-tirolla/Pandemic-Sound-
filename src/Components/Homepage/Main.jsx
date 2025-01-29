import "./homepage.css"
import "../../styles/App.css"
import SearchPage from "../SearchPage/SearchPageComponent";
import { redirectToAuthCodeFlow, isUserAutheticated, fetchProfile, clientId } from "../AuthCallback/script";
import { useState, useEffect } from "react"
import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Nav/Nav";
import { ProfileContext } from "../../contexts";

const Main = () => {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("accessToken")

  useEffect(() => {
    (async () => {
      if (token) {
        const fetchedProfile = await fetchProfile(token);
        console.log("Fetched profile:", fetchedProfile);
        setProfile(fetchedProfile);
        localStorage.setItem("profileId", fetchedProfile.id);
      }
    })()
  }, [token])

  return (
    <ProfileContext.Provider value={profile}>
      <div className="App">
        <Nav handleSearchSubmit={handleSearchSubmit} searchValue={searchValue} onSearchChange={onSearchChange} />
        < Sidebar />
      </div>

    </ProfileContext.Provider >
  )
}
export default Main;

