import React, { useState, useEffect } from "react";
import { redirectToAuthCodeFlow, getAccessToken, } from "../../Api-auth/script";
import useSpotifyTrackData from "./SongComponent";

const Song = ({ clientId }) => {
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

    useEffect(() => {
        const authFlow = async () => {
            if (!accessToken) {
                const params = new URLSearchParams(window.location.search);
                const code = params.get("code");
                if (!code) {
                    redirectToAuthCodeFlow(clientId);
                } else {
                    try {
                        const token = await getAccessToken(clientId, code);
                        if (!token) {
                            throw new Error("Access token is undefined");
                        }
                        console.log("Access token obtained:", token);
                        localStorage.setItem("accessToken", token);
                        setAccessToken(token);
                    } catch (err) {
                        console.error("Error during authentication:", err);
                        setError("Failed to authenticate. Please try again.");
                        return;
                    }
                }
            }
          
        };

        authFlow();
    }, [clientId, accessToken]);

    const trackId = "11dFghVXANMlKmJXsNCbNl"; // Example track ID
    const { trackData, error: trackError } = useSpotifyTrackData(accessToken, trackId);

    if (error || trackError) {
        return <div>Error: {error || trackError}</div>;
    }

   

    return (
        <div>
           
            {trackData && (
                <div>
                    <h2>Track Data</h2>
                    <pre>{JSON.stringify(trackData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Song;