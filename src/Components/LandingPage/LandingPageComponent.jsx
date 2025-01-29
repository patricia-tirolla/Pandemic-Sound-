import React from "react"
import { redirectToAuthCodeFlow, isUserAutheticated, clientId } from "../../Api-auth/script";
import { ProfileContext } from "../../contexts";
import { useContext } from "react"


const LandingPage = () => {
    const profile = useContext(ProfileContext);
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

  export default LandingPage