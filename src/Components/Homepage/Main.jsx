import "./homepage.css"
import "../../styles/App.css"
import SearchPage from "../SearchPage/SearchPageComponent";
import { redirectToAuthCodeFlow, isUserAutheticated, fetchProfile, clientId } from "../../Api-auth/script";
import { useState, useEffect } from "react"
import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Nav/Nav";
import { ProfileContext } from "../../contexts";

const Main = () => {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("accessToken")

  const [searchValue, setSearchValue] = useState("");

  function handleSearchSubmit(e) {
    e.preventDefault();
    setUrl("https://api.spotify.com/v1/search?q=" + searchValue + "&type=artist%2Ctrack%2Calbum&limit=5");
  }

  function onSearchChange(e) {
    setSearchValue(e.target.value)
  }

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
        <SearchPage url={url} token={token} />
        < Sidebar />
      </div>

    </ProfileContext.Provider >
  )
}
export default Main;

const Homepage = () => {

  return (
    <main className="homepage">
      {isUserAutheticated() && profile &&
        <div>
          <h2>Hi, {profile.display_name}!</h2>
          {profile.images?.[0]?.url && (
            <img src={profile.images[0].url} alt="Profile" width={100} />
          )}
          <p>Email: {profile.email}</p>
        </div>
      }
      {searchValue && token && (
        <SearchPage url={url} token={token} />
      )}
    </main>
  )
}
const LandingPage = () => {

  return (
    <main className="homepage">
      <h1>Welcome to Pandemic Sound!</h1>
      {!isUserAutheticated() &&
        <button onClick={() => redirectToAuthCodeFlow(clientId)}>Loging to Spotify</button>
      }

      {isUserAutheticated() && profile &&
        <div>
          <h2>Hi, {profile.display_name}!</h2>
          {profile.images?.[0]?.url && (
            <img src={profile.images[0].url} alt="Profile" width={100} />
          )}
          <p>Email: {profile.email}</p>
        </div>
      }
    </main>
  )
}