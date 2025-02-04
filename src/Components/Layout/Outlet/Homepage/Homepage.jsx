import React, { useState, useEffect, useCallback } from 'react';
import './homepage.css'; 

const GetNewReleases = () => {
  const [newReleases, setNewReleases] = useState([]);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("accessToken"); 

  
  const fetchNewReleases = useCallback(async () => {
    if (!accessToken) {
      console.error("Access token is missing");
      setError("Access token is missing.");
      return;
    }

    try {
      const response = await fetch(
        "https://api.spotify.com/v1/browse/new-releases?offset=0",  
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Error status:", response.status, response.statusText);
        throw new Error(`Error fetching new releases: ${response.statusText}`);
      }

      const data = await response.json();

     
      if (data?.albums?.items?.length > 0) {
        setNewReleases(data.albums.items);
      } else {
        setError("No new releases found.");
      }
    } catch (err) {
      console.error("Error fetching new releases:", err.message);
      setError(`Failed to fetch new releases: ${err.message}`);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchNewReleases();
    } else {
      setError("Token is missing or invalid.");
    }
  }, [accessToken, fetchNewReleases]);

  return (
    <div className="releases-main-container">
       <h2 className='realeses-title'>Explore</h2>
     
      {error && <p className="error-message">{error}</p>}

      <div className="new-releases-container">
        {newReleases.length === 0 ? (
          <p>No new releases available.</p>
        ) : (
          <div className="new-releases">
           
            {newReleases.map((album) => (
              <div key={album.id} className="album-card">
          
                <img src={album.images?.[0]?.url} alt={album.name} />
                <h3>{album.name}</h3>
                <a href={album.external_urls?.spotify} target="_blank" rel="noopener noreferrer" className="play-button">
                  ▷
                </a>
                
              </div>
            ))}
          </div>
        )}
      </div>
      </div>

  );
};

export default GetNewReleases;
