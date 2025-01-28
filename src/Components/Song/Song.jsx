import React, { useState } from "react";
import useSpotifyTrackData from "./SongComponent";

const Song = ({ clientId }) => {
    const [error] = useState(null);
    const [accessToken] = useState(localStorage.getItem("accessToken"));
    
    const trackId = "11dFghVXANMlKmJXsNCbNl"; // Example track ID
    const { trackData, error: trackError } = useSpotifyTrackData(accessToken, trackId);

    if (error || trackError) {
        return <div>Error: {error || trackError}</div>;
    }
    const formatDuration = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div>
           
            {trackData && (
                <div>
                    <h2>Track Data</h2>
                <p>{trackData.name}</p>
                <p>{trackData.artists[0].name}</p>
                <p>{trackData.album.name}</p>
                <p>Duration: {formatDuration(trackData.duration_ms)}</p>
                <img src={trackData.album.images[0].url} alt="Album Art" />
                </div>
            )}
        </div>
    );
};

export default Song;