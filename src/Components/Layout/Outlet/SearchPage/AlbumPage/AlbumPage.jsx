import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGetRequest from '../../../../../Hooks/useGetRequest';
import AddToPlaylistButton from "../../PlaylistPage/AddTrackToPlaylist/AddToPlaylistButton";
import AddToSavedTracks from "../../PlaylistPage/AddTrackToPlaylist/AddToSavedTracks";
import { usePlaylists } from '../../../../../Hooks/PlaylistsProvider';
import "./albumpage.css";

const AlbumPage = () => {
  const { albumId } = useParams();
  const [activeTrackId, setActiveTrackId] = useState(null);
  const accessToken = localStorage.getItem("access_token");
  const { data: album, error } = useGetRequest(
    `https://api.spotify.com/v1/albums/${albumId}`,
    accessToken
  );
  const { playlists } = usePlaylists();
  const navigate = useNavigate();

  const toggleDropdown = (trackId) => {
    setActiveTrackId(prev => prev === trackId ? null : trackId);
  };

  if (error) return <div>Error: {error}</div>;
  if (!album) return <div>Loading...</div>;
  
  const handleTrackClick = (trackId, e) => {
    if (e.target.closest('.album-album-button-add-results-container')) {
      return;
    }
    navigate(`/track/${trackId}`);
  };
  return (
    <div className="album-album-container">
      <div className="album-album-header">
        <img 
          src={album.images?.[0]?.url} 
          alt={album.name} 
          className="album-album-cover"
        />
        <div className="album-album-info">
          <h1>{album.name}</h1>
          <p>{album.artists?.[0]?.name}</p>
          <p>{album.release_date}</p>
        </div>
      </div>

      <div className="album-album-tracks">
        {album.tracks?.items?.map((track) => (
          <div key={track.id} className="album-album-track-item" onClick={(e) => handleTrackClick(track.id, e)}style={{ cursor: 'pointer' }}>
            <div className="album-album-track-info">
              <p className="album-album-track-name">{track.name}</p>
             
            </div>
            <div className="album-album-button-add-results-container">

            <div className="album-album-track-actions">
              <AddToSavedTracks track={track} 
              className="album-page-button"
              />
              <AddToPlaylistButton
                track={track}
                playlists={playlists}
                activeTrackId={activeTrackId}
                toggleDropdown={toggleDropdown}
              />
            </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumPage;