import { useEffect, useState } from "react";

const useSpotifyTrackData = (accessToken, trackId) => {
    const [trackData, setTrackData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrackData = async () => {
            if (!accessToken) {
                console.error("Access token is missing");
                setError("Access token is missing");
                return;
            }

            try {
                const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error fetching track data: ${response.statusText}`);
                }

                const data = await response.json();
                setTrackData(data);
            } catch (err) {
                console.error("Error fetching track data:", err);
                setError("Failed to fetch track data. Please try again.");
            }
        };

        fetchTrackData();
    }, [accessToken, trackId]);
    return { trackData, error };
};
export default useSpotifyTrackData;