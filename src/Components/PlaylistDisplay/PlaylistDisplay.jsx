import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import useFetchTracks from "../Song/GetTrackUrl";
import "./playlistDisplay.css";
import { useProfile } from "../../Hooks/Profile";

const PlaylistDisplay = () => {
  const location = useLocation();
  const [playlists, setPlaylists] = useState([]);
  const [reFetch] = useState(false);
  const { playlist, trackUrl } = location.state || {};
  const { tracks, error } = useFetchTracks(trackUrl);
  const [activeTrackId, setActiveTrackId] = useState(null);
  const profile = useProfile();
  const dropdownRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");


    if (profile && token) {
      const playlistAPI = `https://api.spotify.com/v1/users/${profile.id}/playlists`;
      const playlistParameters = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      fetch(playlistAPI, playlistParameters)
        .then((response) => response.json())
        .then((data) => {
          setPlaylists(data.items);
        })
        .catch((error) => console.log("Error fetching playlists:", error));
    }
  }, [profile, reFetch]);

  const addTrackToPlaylist = async (playlistId, trackUri) => {
    console.log('addTrackToPlaylist called', playlistId, trackUri);
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    console.log('Token:', token ? 'exists' : 'missing');
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    console.log('API URL:', url);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: [trackUri]
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(`Failed to add track to playlist: ${errorData.error.message}`);
      }
  
      console.log('Track added successfully');
      alert('Track added successfully');
  
    } catch (error) {
      console.error('Error adding track to playlist:', error);
      console.error('Playlist ID:', playlistId);
      console.error('Track URI:', trackUri);
      alert('Failed to add track. Please check the console for more details.');
    } finally {
      setIsLoading(false);
      setActiveTrackId(null); // Close dropdown after operation completes
    }
  };
const handleAddToPlaylist = (event, playlistId, trackUri) => {
  console.log('handleAddToPlaylist called', playlistId, trackUri);
  event.stopPropagation();
  addTrackToPlaylist(playlistId, trackUri);
};

  

  
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!trackUrl) {
    return <div>No track URL provided</div>;
  }

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toggleDropdown = (trackId) => {
    setActiveTrackId(prevId => prevId === trackId ? null : trackId);
  };



  const defaultImage = "https://static.vecteezy.com/system/resources/thumbnails/002/249/673/small/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg";
  const defaultName = "Untitled Playlist";


  return (
    <div className="display-playlist-container">
      <h2 className="display-playlist-title">Playlist: {playlist?.name || defaultName}</h2>
      <img src={playlist?.images?.length > 0 ? playlist.images[0].url : defaultImage} className="display-playlist-img" alt="playlist" />
      <ul>
        {tracks.map(({ track }) => (
          <div key={track.id} className="track">
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
              <div className="dropdown" ref={dropdownRef}>
                <button className="dropdown-button" onClick={() => toggleDropdown(track.id)}>
                  {isLoading && activeTrackId === track.id ? 'Adding...' : 'Add to Playlist'}
                </button>
                {activeTrackId === track.id && (
                  <div className="dropdown-menu">
                    {playlists.map(playlist => (
                      <div
                        key={playlist.id}
                        className="dropdown-item"
                        onClick={(e) => handleAddToPlaylist(e, playlist.id, track.uri)}
                      >
                        {playlist.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistDisplay;