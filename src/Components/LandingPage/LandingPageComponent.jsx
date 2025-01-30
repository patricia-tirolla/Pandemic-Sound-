import React from "react"
import { redirectToAuthCodeFlow, isUserAutheticated, clientId } from "../AuthCallback/script";
import { useProfile } from "../../Hooks/Profile";

const LandingPage = () => {
    const profile = useProfile();
    return (
      <div className="landing-page">
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
      </div>
    )
  }

  export default LandingPage