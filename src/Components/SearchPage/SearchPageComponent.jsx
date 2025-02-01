import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import "./searchpage.css"
import { useParams } from "react-router-dom";
import AddToPlaylistButton from "../AddSongToPlaylist/AddToPlaylistButton";
import usePlaylistFetch from "../../Hooks/usePlaylistFetch";
import useSaveTrack from "../../Hooks/useSaveTrack";
import AddToSavedTracks from "../AddSongToPlaylist/AddToSavedTracks";

const SearchPage = () => {
    const [activeTrackId, setActiveTrackId] = useState(null);
    const [accessToken] = useState(localStorage.getItem("accessToken"));
    const { trackId } = useParams();
    const { data: trackData, error: trackError } = useFetch(`https://api.spotify.com/v1/tracks/${trackId}`, accessToken);
    const { playlists } = usePlaylistFetch();
    const { saveTrack, isLoading, error } = useSaveTrack();


    const params = new URLSearchParams(window.location.search);
    const token = localStorage.getItem("accessToken");
    const searchValue = params.get("q");
    const url = "https://api.spotify.com/v1/search?q=" + searchValue + "&type=artist%2Ctrack%2Calbum&limit=5";
    const { data: result, loading } = useFetch(url, token);
    const navigate = useNavigate();

    function onTrackClick(trackId) {
        navigate("/track/" + trackId);
    }
      const toggleDropdown = (trackId) => {
        setActiveTrackId(prevId => prevId === trackId ? null : trackId);
      };
    
      if (error || trackError) {
        return <div>Error: {error || trackError}</div>;
      }
    return (
        <div className="search-container">
            {error &&
                <div className="error-message">Error: {error}</div>
            }
            {result && !loading &&
                <div className="search-results">
                    <ul className="search-list">
                        {result?.tracks?.items?.map((track) => (
                            <li key={track.id} className="single-track-container"> 
                            <a href={track.id} rel="noopener noreferrer" onClick={() => onTrackClick(track.id)}>
                            <div className="track-info">
                            <img
                                    className="track-image"
                                    src={track.album?.images?.[0]?.url || "https://via.placeholder.com/150"}
                                    alt="Album Art"
                                />
                                </div>
                                                                </a>
                                <div className="track-details">
                                    <p className="track-name">{track.name}</p>
                                    <AddToSavedTracks
                                        track={track}
                                        playlists={playlists}
                                        activeTrackId={activeTrackId}
                                        />
                                    <AddToPlaylistButton
                                        track={track}
                                        playlists={playlists}
                                        activeTrackId={activeTrackId}
                                        toggleDropdown={toggleDropdown}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
};

export default SearchPage;
