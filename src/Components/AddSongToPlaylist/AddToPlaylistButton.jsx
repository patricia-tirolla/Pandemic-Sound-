import React, { useState } from 'react';
import usePost from "../../Hooks/usePostRequest";
import { usePlaylists } from '../PlaylistsProvider/PlaylistsProvider';

const AddToPlaylistButton = ({ track, activeTrackId, toggleDropdown, dropdownRef }) => {
    const {playlists, fetchPlaylists} = usePlaylists();
    const { sendPostRequest, isLoading, error: requestError } = usePost();
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState(null);
    const handleAddToPlaylist = async (event, playlistId) => {
        event.preventDefault();
        event.stopPropagation();
        setError(null);
        try {
            await sendPostRequest(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                { uris: [track.uri] }
            );
            setShowSuccess(true);
            toggleDropdown(null);
            setTimeout(() => setShowSuccess(false), 3000);
            fetchPlaylists();
        } catch (err) {
            setError('Failed to add track to playlist');
            console.error('Failed to add track:', err);
            alert('Failed to add track. Please check the console for more details.');
        }
    };

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button
                className="dropdown-button"
                onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(track.id)
                }
                }
                disabled={isLoading}
            >
                {isLoading ? 'Adding...' : showSuccess ? '✓ Added!' : 'Add to Playlist'}
            </button>

            {activeTrackId === track.id && (
                <div className="dropdown-menu">
                    {playlists.slice(0, 10).map(playlist => (
                        <div
                            key={playlist.id}
                            className="dropdown-item"
                            onClick={(e) => handleAddToPlaylist(e, playlist.id)}
                        >
                            {playlist.name}
                        </div>
                    ))}
                </div>
            )}
            {error && <div className="error-message">{error}</div>}
            {requestError && <div className="error-message">{requestError}</div>}
        </div>
    );
};


export default AddToPlaylistButton;
