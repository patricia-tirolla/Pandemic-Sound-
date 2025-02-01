import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import usePlaylistFetch from "../../Hooks/usePlaylistFetch";
import useSaveTrack from "../../Hooks/useSaveTrack";
import AddToPlaylistButton from "../AddSongToPlaylist/AddToPlaylistButton";
import AddToSavedTracks from "../AddSongToPlaylist/AddToSavedTracks";
import "./searchpage.css";

const SearchPage = () => {
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const { trackId } = useParams();
  const token = localStorage.getItem("accessToken");

  const params = new URLSearchParams(window.location.search);
  const searchValue = params.get("q");
  const searchUrl = `https://api.spotify.com/v1/search?q=${searchValue}&type=track,playlist,album,artist&limit=5`;

  const { data: result, loading, error: searchError } = useFetch(searchUrl, token);
  const { error: trackError } = useFetch(`https://api.spotify.com/v1/tracks/${trackId}`, token);
  const { playlists } = usePlaylistFetch();
  const { error: saveError } = useSaveTrack();

  const onTrackClick = (trackId) => navigate(`/track/${trackId}`);
  const toggleDropdown = (trackId) => setActiveTrackId(prev => prev === trackId ? null : trackId);

  if (searchError || trackError || saveError) {
    return <div className="error-message">Error: {searchError || trackError || saveError}</div>;
  }

  const filteredResults = filter === "all" ? result : { [filter]: result?.[filter] };

  const renderResults = (type) => {
    const items = filteredResults?.[type]?.items;
    if (!items || items.length === 0) {
      return filter === "all" ? null : <p>No {type} found.</p>;
    }

    return (
      <div>
        <h3>{type.charAt(0).toUpperCase() + type.slice(1)}s</h3>
        <ul className="search-list">
          {items.map((item) => (
            <li key={item.id} className="single-item-container">
              <a href={`#${item.id}`} onClick={() => onTrackClick(item.id)}>
                <div className="item-info">
                  <img
                    className="item-image"
                    src={item.images?.[0]?.url || item.album?.images?.[0]?.url || "https://via.placeholder.com/150"}
                    alt={`${type} Art`}
                  />
                </div>
              </a>
              <div className="item-details">
                <p className="item-name">{item.name}</p>
                {type === "tracks" && (
                  <>
                    <AddToSavedTracks
                      track={item}
                      playlists={playlists}
                      activeTrackId={activeTrackId}
                    />
                    <AddToPlaylistButton
                      track={item}
                      playlists={playlists}
                      activeTrackId={activeTrackId}
                      toggleDropdown={toggleDropdown}
                    />
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const hasResults = result && Object.values(result).some(category => category?.items?.length > 0);

  return (
    <div className="search-container">
      {!loading && (
        <div className="search-results">
          <div className="searchHeader">
            <h2 className="search-heading">Search Results for "{searchValue}"</h2>
            <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All</button>
            <button onClick={() => setFilter("tracks")} className={filter === "tracks" ? "active" : ""}>Songs</button>
            <button onClick={() => setFilter("playlists")} className={filter === "playlists" ? "active" : ""}>Playlists</button>
            <button onClick={() => setFilter("albums")} className={filter === "albums" ? "active" : ""}>Albums</button>
            <button onClick={() => setFilter("artists")} className={filter === "artists" ? "active" : ""}>Artists</button>
          </div>
          {hasResults ? (
            <>
              {renderResults("tracks")}
              {renderResults("playlists")}
              {renderResults("albums")}
              {renderResults("artists")}
            </>
          ) : (
            <p>No results found for "{searchValue}".</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
