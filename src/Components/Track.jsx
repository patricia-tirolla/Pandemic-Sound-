import React from "react";
import AddToPlaylistButton from "./AddSongToPlaylist/AddToPlaylistButton";

const Track = ({ track, playlists, activeTrackId, toggleDropdown, dropdownRef }) => {
    const formatDuration = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="track">
            {track.album.images[0] && (
                <img
                    className="trackImage"
                    src={track.album.images[0].url}
                    alt="Track Art"
                />
            )}
            <div className="trackDetails">
                <p className="trackName">{track.name}</p>
                <p className="trackArtist">{track.artists.map(artist => artist.name).join(", ")}</p>
                <p className="trackDuration">{formatDuration(track.duration_ms)}</p>
                <AddToPlaylistButton 
                    track={track}
                    playlists={playlists}
                    activeTrackId={activeTrackId}
                    toggleDropdown={toggleDropdown}
                    dropdownRef={dropdownRef}
                />
            </div>
        </div>
    );
};

export default Track;
