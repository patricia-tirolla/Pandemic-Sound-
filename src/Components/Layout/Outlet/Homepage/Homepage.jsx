import React from 'react';
import useGetRequest from "../../../../Hooks/useGetRequest";
import "./homepage.css";

const Homepage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const { data: newReleases, error, isLoading } = useGetRequest(
    "https://api.spotify.com/v1/browse/new-releases?offset=0",
    accessToken
  );

  if (!accessToken) {
    return <div className="error-container">Please login to view new releases</div>;
  }

  if (isLoading) {
    return <div className="loading-container">Loading new releases...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading new releases</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!newReleases?.albums?.items) {
    return <div className="error-container">No new releases found</div>;
  }

  return (
    <div className="releases-main-container">
      <h2 className='realeses-title'>Explore</h2>
      <div className="new-releases">
        {newReleases.albums.items.map((album) => (
          <div key={album.id} className="album-card">
            <a 
              href={album.external_urls?.spotify} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="play-button"
            >
              Listen in Spotify
            </a>
            {album.images?.[0]?.url ? (
              <img src={album.images[0].url} alt={album.name || 'Album cover'} />
            ) : (
              <div className="no-image">No Image Available</div>
            )}
            <h3>{album.name || 'Untitled Album'}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;