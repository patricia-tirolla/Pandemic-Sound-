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
  const accessToken = localStorage.getItem("access_token");
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

  // refactor to simplify
  const renderSectionHeader = (type) =>
    filter === "all" && (
      <h3 className="section-header">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </h3>
    );

  // refactor to simplify
  const renderResults = (type, items, renderItem) =>
    (filter === "all" || filter === type) &&
    (items.length > 0 ? (
      <ul className="search-list">{items.map(renderItem)}</ul>
    ) : (
      <p>No {type} found</p>
    ));

  // refactor to simplify and for better readability
  const renderTrack = (track) => (
    <li
      key={track.id}
      className="search-single-track-container"
      onClick={(e) => !e.target.closest("button") && onTrackClick(track.id)}
    >
      <div className="search-track-img-name-container">
        <div className="search-track-info">
          <img
            className="search-track-image"
            src={
              track.album?.images?.[0]?.url || "https://via.placeholder.com/150"
            }
            alt="Album Art"
          />
        </div>
        <p className="search-track-name">{track.name}</p>
      </div>
      <div className="search-button-add-results-container">
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
  );

  // refactor to simplify and for better readability
  const renderArtist = (artist) => (
    <li
      key={artist.id}
      className="search-artist-container"
      onClick={() => navigate(`/artist/${artist.id}`)}
    >
      <div className="search-artist-info">
        <img
          className="search-artist-image"
          src={artist.images?.[0]?.url || "https://via.placeholder.com/150"}
          alt="Artist"
        />
      </div>
      <div className="search-artist-details">
        <p className="search-artist-name">{artist.name}</p>
        <p className="search-artist-followers">
          {artist.followers?.total?.toLocaleString()} followers
        </p>
        <p className="search-artist-type">Artist</p>
      </div>
    </li>
  );

  // refactor to simplify and for better readability
  const renderAlbum = (album) => (
    <li
      key={album.id}
      className="search-album-container"
      onClick={() => navigate(`/album/${album.id}`)}
    >
      <div className="search-album-info">
        <img
          className="search-album-image"
          src={album.images?.[0]?.url || "https://via.placeholder.com/150"}
          alt="Album Art"
        />
      </div>
      <div className="search-album-details">
        <p className="search-album-name">{album.name}</p>
        <p className="search-album-artist">
          {album.artists?.map((artist) => artist.name).join(", ")}
        </p>
        <p className="search-album-type">
          {album.album_type.charAt(0).toUpperCase() + album.album_type.slice(1)}
        </p>
      </div>
    </li>
  );

  return (
    <main className="search-container">
      {result && !loading && (
        <div className="search-results">
          <div className="search-header">
            <h2 className="search-heading">
              Search Results for "{searchValue}"
            </h2>
            <div className="search-filter-buttons">
              {["tracks", "artists", "albums"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`filter-btn ${filter === type ? "active" : ""}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {renderSectionHeader("tracks")}
          {renderResults("tracks", result?.tracks?.items || [], renderTrack)}
          {renderSectionHeader("albums")}
          {renderResults(
            "albums",
            result?.albums?.items.filter((album) => album.total_tracks > 1) ||
              [],
            renderAlbum
          )}
          {renderSectionHeader("artists")}
          {renderResults("artists", result?.artists?.items || [], renderArtist)}
        </div>
      )}
    </main>
  );
};

export default SearchPage;
