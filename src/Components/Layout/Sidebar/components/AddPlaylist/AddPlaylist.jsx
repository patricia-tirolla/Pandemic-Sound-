import React, { useState } from 'react';
import { useProfile } from '../../../../../Hooks/Profile';
import usePostRequest from '../../../../../Hooks/usePostRequest';
import './addPlaylist.css';

const AddPlaylist = () => {
    const profile = useProfile();
    const { sendPostRequest, isLoading, error } = usePostRequest();
    const [showSuccess, setShowSuccess] = useState(false);

    const createPlaylist = async () => {
        if (!profile) {
            console.error('No user profile found');
            return;
        }

        const playlistData = {
            name: "New playlist",
            description: "New playlist created on " + new Date().toLocaleDateString(),
            public: false
        };

        try {
            await sendPostRequest(
                `https://api.spotify.com/v1/users/${profile.id}/playlists`,
                playlistData
            );
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            console.error('Failed to create playlist:', err);
        }
    };

    return (
        <div className="add-playlist-container">
            <button 
                onClick={createPlaylist}
                disabled={isLoading || !profile}
                className="add-playlist-button"
            >
                {isLoading ? 'Creating...' : showSuccess ? 'Created!' : '+'}
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddPlaylist;