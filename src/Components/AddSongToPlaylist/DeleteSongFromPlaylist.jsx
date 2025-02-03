// Components/DeleteTrackFromPlaylist.jsx
import React, { useState } from "react";
import useDeleteRequest from "../../Hooks/useDeleteRequest";

const DeleteTrackFromPlaylist = ({ track, playlistId, onDeleteSuccess }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const { sendDeleteRequest, isLoading, error } = useDeleteRequest();

    const handleDeleteTrack = async (event) => {
        event.preventDefault();
        
        if (!playlistId) {
            console.error("No playlist ID provided");
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
            onDeleteSuccess(track.id);
        } catch (error) {
            console.error("Failed to delete track:", error);
        }
    };

    return (
        <div className="delete-track-container">
            <button
                onClick={handleDeleteTrack}
                disabled={isLoading}
                className="delete-track-button"
            >
                {isLoading ? "Deleting..." : showSuccess ? "Deleted!" : "Delete"}
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default DeleteTrackFromPlaylist;
