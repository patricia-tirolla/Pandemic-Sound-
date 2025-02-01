import React, { useState, useEffect, useCallback } from 'react';
import './GetNewReleases.css'; 

const GetNewReleases = () => {
  const [newReleases, setNewReleases] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken"); 

  
  const fetchNewReleases = useCallback(async () => {
    if (!token) {
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
            Authorization: `Bearer ${token}`,
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
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchNewReleases();
    } else {
      setError("Token is missing or invalid.");
    }
  }, [token, fetchNewReleases]);

  return (
    <div className="get-new-releases">
     
      {error && <p className="error-message">{error}</p>}

      {/* <h2 className="new-releases-heading">It's New Music Day! </h2> */}


      <div className="new-releases-container">
        {newReleases.length === 0 ? (
          <p>No new releases available.</p>
        ) : (
          <div className="new-releases">
           
            {newReleases.map((album) => (
              <div key={album.id} className="album-card">
                <a href={album.external_urls?.spotify} target="_blank" rel="noopener noreferrer" className="play-button">
                  ▷
                </a>
                <img src={album.images?.[0]?.url} alt={album.name} />
                <h3>{album.name}</h3>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetNewReleases;
