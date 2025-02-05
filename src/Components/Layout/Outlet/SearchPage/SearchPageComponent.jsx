import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetRequest from "../../../../Hooks/useGetRequest";
import usePutRequest from "../../../../Hooks/usePutRequest";
import AddToPlaylistButton from "../PlaylistPage/AddTrackToPlaylist/AddToPlaylistButton";
import AddToSavedTracks from "../PlaylistPage/AddTrackToPlaylist/AddToSavedTracks";
import "./searchpage.css";
import { useProfile } from "../../../../Hooks/Profile";
import { usePlaylists } from "../../../../Hooks/PlaylistsProvider";

const SearchPage = () => {
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const profile = useProfile();

  const params = new URLSearchParams(window.location.search);
  const searchValue = params.get("q");
  const searchUrl = `https://api.spotify.com/v1/search?q=${searchValue}&type=artist%2Ctrack%2Calbum&limit=10`;

  const {
    data: result,
    loading,
    error: searchError,
  } = useGetRequest(searchUrl, accessToken);
  const { playlists } = usePlaylists();
  const { error: saveError } = usePutRequest();
  const onTrackClick = (trackId) => navigate(`/track/${trackId}`);
  const toggleDropdown = (trackId) =>
    setActiveTrackId((prev) => (prev === trackId ? null : trackId));

  if (!profile) return <div>Loading...</div>;

  if (searchError || saveError) {
    return (
      <div className="error-message">Error: {searchError || saveError}</div>
    );
  }
  const renderSectionHeader = (type) => {
    if (filter !== "all") return null;
    
    const titles = {
        tracks: "Songs",
        albums: "Albums",
        artists: "Artists"
    };

    return (
        <h3 className="section-header">
            {titles[type]}
        </h3>
    );
};
  const renderResults = (type) => {
    
    if (filter !== "all" && filter !== type) return null;

        switch (type) {
            case "tracks":
                return result?.tracks?.items?.length > 0 ? (
                    <ul className="search-list">
                        {result.tracks.items.map((track) => (
                            <li 
                                key={track.id} 
                                className="single-track-container"
                                onClick={(e) => {
                                    // Only navigate if clicking the track area, not buttons
                                    if (!e.target.closest('button')) {
                                        onTrackClick(track.id);
                                    }
                                }}
                            >
                               <div className="track-img-name-container">
                                <div className="track-info">
                                    <img
                                        className="track-image"
                                        src={track.album?.images?.[0]?.url || "https://via.placeholder.com/150"}
                                        alt="Album Art"
                                    />
                                    
                                </div>
                                <p className="track-name">{track.name}</p>
                                </div>
                                <div className="button-add-results-container">
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
                ) : <p>No tracks found</p>;
                case "albums":
                    return result?.albums?.items
                        .filter(album => album.total_tracks > 1) // Filter out singles
                        .length > 0 ? (
                            <ul className="search-list">
                                {result.albums.items
                                    .filter(album => album.total_tracks > 1)
                                    .map((album) => (
                                        <li 
                                            key={album.id} 
                                            className="single-track-container"
                                            onClick={() => navigate(`/album/${album.id}`)}
                                        >
                                            <div className="track-info">
                                                <img
                                                    className="track-image"
                                                    src={album.images?.[0]?.url || "https://via.placeholder.com/150"}
                                                    alt="Album Art"
                                                />
                                                <div className="album-details">
                                                    <p className="album-name">{album.name}</p>
                                                    <p className="album-artist">
                                                        {album.artists?.map(artist => artist.name).join(', ')}
                                                    </p>
                                                    <p className="album-type">
                                                        {album.album_type.charAt(0).toUpperCase() + album.album_type.slice(1)}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        ) : <p>No albums found</p>;
                    case "artists":
                        return result?.artists?.items?.length > 0 ? (
                            <ul className="search-list">
                                {result.artists.items.map((artist) => (
                                    <li 
                                        key={artist.id} 
                                        className="single-track-container"
                                        onClick={() => navigate(`/artist/${artist.id}`)}
                                    >
                                        <div className="track-info">
                                            <img
                                                className="track-image"
                                                src={artist.images?.[0]?.url || "https://via.placeholder.com/150"}
                                                alt="Artist"
                                            />
                                            <div className="artist-search-details">
                                                <p className="artist-search-name">{artist.name}</p>
                                                <p className="artist-search-followers">
                                                    {artist.followers?.total?.toLocaleString()} followers
                                                </p>
                                                <p className="artist-search-type">Artist</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : <p>No artists found</p>;
                        
            default:
                return null;
        }
        
    };
    return (
        <div className="search-container">
            {result && !loading && (
                <div className="search-results">
                    <div className="searchHeader">
                        <h2 className="search-heading">Search Results for "{searchValue}"</h2>
                        <div className="filter-buttons">
                            <button
                                onClick={() => setFilter("tracks")}
                                className={`filter-btn ${filter === "tracks" ? "active" : ""}`}
                            >
                                Songs
                            </button>  <button
                                onClick={() => setFilter("artists")}
                                className={`filter-btn ${filter === "artists" ? "active" : ""}`}
                            >
                                Artists
                            </button>  <button
                                onClick={() => setFilter("albums")}
                                className={`filter-btn ${filter === "albums" ? "active" : ""}`}
                            >
                                Albums
                            </button>
                        </div>
                    </div>
                    {renderSectionHeader("tracks")}
                    {renderResults("tracks")}
                    {renderSectionHeader("albums")}
                    {renderResults("albums")}
                    {renderSectionHeader("artists")}
                    {renderResults("artists")}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
