import React from "react";
import { isUserAutheticated } from "../AuthCallback/script";
import { Link } from "react-router";
import Song from "../Song/Song";
import { useProfile } from "../../Hooks/Profile";

const Homepage = () => {
    const profile = useProfile();

    return (
        <>
            <div className="App">
                <div className="homepage">
                {isUserAutheticated() && profile &&
                    <div>
                        <h2>Hi, {profile.display_name}!</h2>
                        {profile.images?.[0]?.url && (
                            <img src={profile.images[0].url} alt="Profile" width={100} />
                        )}
                        <p>Email: {profile.email}</p>
                    </div>
                }
                <Link to="/search">Go to search</Link>
                <Song/>
            </div>
          
            </div>
            
        </>
    )
}

export default Homepage