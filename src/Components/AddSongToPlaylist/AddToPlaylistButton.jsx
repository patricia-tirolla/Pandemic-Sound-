import React, { useState } from 'react';
// import useAddTrackToPlaylist from "../../Hooks/useAddTrackToPlaylist";
import usePost from "../../Hooks/usePostRequest";

const AddToPlaylistButton = ({ track, playlists, activeTrackId, toggleDropdown, dropdownRef }) => {
    const { sendPostRequest, isLoading, error } = usePost();
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddToPlaylist = async (event, playlistId, trackUri) => {
       event.stopPropagation();
        try {
        sendPostRequest(playlistId, trackUri);
       } catch (error) {
        console.error('Failed to add track to playlist:', error);
       }
    };

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-button" onClick={() => toggleDropdown(track.id)}>
                {isLoading && activeTrackId === track.id ? 'Adding...' : 'Add to Playlist'}
            </button>
            {activeTrackId === track.id && (
                <div className="dropdown-menu">
                    {playlists.slice(0,5).map(playlist => (
                        <div
                            key={playlist.id}
                            className="dropdown-item"
                            onClick={(e) => handleAddToPlaylist(e, playlist.id, track.uri)}
                        >
                            {playlist.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddToPlaylistButton;
