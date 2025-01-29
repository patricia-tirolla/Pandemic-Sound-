import "./main.css"
import "../../styles/App.css"
import { fetchProfile } from "../../Api-auth/script";
import { useState, useEffect } from "react"
import Nav from "../Nav/Nav";
import { ProfileContext } from "../../contexts";
import Homepage from "../Homepage/HomepageComponent";

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
        <Nav />
        <Homepage />
      </div>

    </ProfileContext.Provider >
  )
}
export default Main;


