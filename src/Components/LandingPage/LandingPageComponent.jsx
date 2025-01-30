import React from "react"
import { redirectToAuthCodeFlow, isUserAutheticated, clientId } from "../AuthCallback/script";
import { useProfile } from "../../Hooks/Profile";
import "./LandingPage.css"

const LandingPage = () => {
    const profile = useProfile();
    return (
        <main className="landing-page">
        <h1 className="landing-page-title">Welcome to Pandemic Sound!</h1>
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

  export default LandingPage