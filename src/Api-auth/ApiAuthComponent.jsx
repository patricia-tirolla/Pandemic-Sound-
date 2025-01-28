import React, { useEffect, useState } from "react";
import { redirectToAuthCodeFlow, getAccessToken, fetchProfile } from "./script";

const SpotifyAuth = ({ clientId }) => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const authFlow = async () => {
            let accessToken = localStorage.getItem("accessToken")
            if (!accessToken) {
                const params = new URLSearchParams(window.location.search);
                const code = params.get("code");
                if (!code) {
                    redirectToAuthCodeFlow(clientId);
                } else {
                    try {
                        accessToken = await getAccessToken(clientId, code);
                        if (!localStorage.getItem("accessToken")) {
                            console.log("access token = " + accessToken)
                            localStorage.setItem("accessToken", accessToken);
                        }

                    } catch (err) {
                        console.error("Error during authentication:", err);
                        setError("Failed to authenticate. Please try again.");
                    }
                }
            }
            if (accessToken) {
               try {
                    const fetchedProfile = await fetchProfile(accessToken);
                    if (fetchedProfile.error && fetchedProfile.error.status === 401) {
                        // Token expired, restart authentication process
                        localStorage.removeItem("accessToken");
                        redirectToAuthCodeFlow(clientId);
                        return;
                    }
                    console.log("Fetched profile:", fetchedProfile);
                    if (fetchedProfile && fetchedProfile.id) {
                        setProfile(fetchedProfile);
                        localStorage.setItem("profileId", fetchedProfile.id);
                        console.log("Profile ID stored:", fetchedProfile.id);
                    } else {
                        throw new Error("Profile data is missing the ID field");
                    }
                } catch (err) {
                    console.error("Error fetching profile:", err);
                    setError("Failed to fetch profile. Please try again.");
                }
            }
        };

        authFlow();
    }, [clientId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome, www {profile.display_name}!</h1>
            {profile.images?.[0]?.url && (
                <img src={profile.images[0].url} alt="Profile" width={100} />
            )}
            <p>Email: {profile.email}</p>
        </div>
    );
};
export default SpotifyAuth;
