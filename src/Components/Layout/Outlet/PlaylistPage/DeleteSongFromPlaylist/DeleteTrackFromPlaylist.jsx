import React, { useState } from "react";
import useDeleteRequest from "../../../../../Hooks/useDeleteRequest";

const DeleteTrackFromPlaylist = ({ 
    track, 
    playlistId, 
    onDeleteSuccess = () => {} 
}) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState(null);
    const { sendDeleteRequest, isLoading } = useDeleteRequest();

    const handleDeleteTrack = async (event) => {
        event.preventDefault();
        setError(null);
        
        if (!playlistId || !track?.uri) {
            setError("Missing required data");
            return;
        }

        try {
            await sendDeleteRequest(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                { 
                    tracks: [{ uri: track.uri }] 
                }
            );
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            
            if (typeof onDeleteSuccess === 'function') {
                onDeleteSuccess(track.id);
            }
        } catch (err) {
            setError(err.message);
            console.error("Failed to delete track:", err);
        }
    };

    return (
        <div className="delete-track-container">
            <button
                onClick={handleDeleteTrack}
                disabled={isLoading}
                className="delete-track-button"
            >
                {isLoading ? "Deleting..." : showSuccess ? "Deleted!" : "Remove"}
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default DeleteTrackFromPlaylist;