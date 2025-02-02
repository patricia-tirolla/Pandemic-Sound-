import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Remove useParams
import useGetRequest from "../../Hooks/useGetRequest";
// import usePlaylistFetch from "../../Hooks/usePlaylistFetch";
// import useSaveTrack from "../../Hooks/useSaveTrack";
import usePutRequest from "../../Hooks/usePutRequest";
import AddToPlaylistButton from "../AddSongToPlaylist/AddToPlaylistButton";
import AddToSavedTracks from "../AddSongToPlaylist/AddToSavedTracks";
import "./searchpage.css";
import {useProfile} from "../../Hooks/Profile";

const SearchPage = () => {
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const profile = useProfile();

  const params = new URLSearchParams(window.location.search);
  const searchValue = params.get("q");
  const searchUrl = `https://api.spotify.com/v1/search?q=${searchValue}&type=artist%2Ctrack%2Calbum&limit=5`;

  const { data: result, loading, error: searchError } = useGetRequest(searchUrl, token);
  const { playlists } = useGetRequest(`https://api.spotify.com/v1/users/${profile.id}/playlists`, token);
  const { error: saveError } = usePutRequest();
  const onTrackClick = (trackId) => navigate(`/track/${trackId}`);
  const toggleDropdown = (trackId) => setActiveTrackId(prev => prev === trackId ? null : trackId);

  if (searchError ||  saveError) {
    return <div className="error-message">Error: {searchError ||  saveError}</div>;
  }

  const renderResults = (type) => {
    if (filter !== "all" && filter !== type) return null;

    switch (type) {
      case "tracks":
        return result?.tracks?.items?.length > 0 ? (
          <ul className="search-list">
            {result.tracks.items.map((track) => (
                  <li key={track.id} className="single-track-container">
                    <a href={`#${track.id}`} onClick={() => onTrackClick(track.id)}>
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
                ) : <p>No tracks found</p>;
      case "albums":
        return result?.albums?.items?.length > 0 ? (
          <ul className="search-list">
            {result.albums.items.map((album) => (
              <li key={album.id}>{album.name}</li>
            ))}
          </ul>
        ) : <p>No albums found</p>;

      case "artists":
        return result?.artists?.items?.length > 0 ? (
          <ul className="search-list">
            {result.artists.items.map((artist) => (
              <li key={artist.id}>{artist.name}</li>
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
              {renderResults("tracks")}
                    {renderResults("albums")}
                    {renderResults("artists")}
                    {renderResults("playlists")}
            </div>
      )}
          </div>
          );
};

          export default SearchPage;
