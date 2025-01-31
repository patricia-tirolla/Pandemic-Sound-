import React from "react";
import useAddTrackToPlaylist from "../../Hooks/useAddTrackToPlaylist";
const AddToPlaylistButton = ({ track, playlists, activeTrackId, toggleDropdown, dropdownRef }) => {
    const { addTrackToPlaylist, isLoading } = useAddTrackToPlaylist();

    const handleAddToPlaylist = (event, playlistId, trackUri) => {
        event.stopPropagation();
        addTrackToPlaylist(playlistId, trackUri);
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
