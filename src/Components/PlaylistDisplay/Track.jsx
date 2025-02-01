import React from "react";
import AddToPlaylistButton from "../AddSongToPlaylist/AddToPlaylistButton";
import { useNavigate } from "react-router";
import "./track.css";

const Track = ({ track, playlists, activeTrackId, toggleDropdown, dropdownRef }) => {

    const navigate = useNavigate();

    const formatDuration = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    function onTrackClick(trackId) {
        navigate("/track/" + trackId);
    }

    return (
        <div className="trackssss">
            <ul className="search-list">
                <li key={track.id} className="single-Track-Container">
                    <a href={track.id} rel="noopener noreferrer" onClick={() => onTrackClick(track.id)}>
                        <div className="track-info">
                            {track.album.images[0] && (
                                <img
                                    className="track-Image"
                                    src={track.album.images[0].url}
                                    alt="Track Art"
                                />
                            )}
                            <div className="track-Details">
                                <div className="track-Info-Container">
                                <p className="track-Name">{track.name}</p>
                                <p className="track-Artist" >{track.artists.map(artist => artist.name).join(", ")}</p>
                                </div>
                                <p className="track-Duration" >{formatDuration(track.duration_ms)}</p>
                                {/* <AddToPlaylistButton 
                    track={track}
                    playlists={playlists}
                    activeTrackId={activeTrackId}
                    toggleDropdown={toggleDropdown}
                    dropdownRef={dropdownRef}
                /> */}
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Track;
