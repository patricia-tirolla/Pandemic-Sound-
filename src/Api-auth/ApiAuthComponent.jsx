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
                        console.log("access token = " + accessToken)
                        localStorage.setItem("accessToken", accessToken);
                    } catch (err) {
                        console.error("Error during authentication:", err);
                        setError("Failed to authenticate. Please try again.");
                    }
                }
            }
            if (accessToken) {
                const fetchedProfile = await fetchProfile(accessToken);
                setProfile(fetchedProfile);
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


};
export default SpotifyAuth;