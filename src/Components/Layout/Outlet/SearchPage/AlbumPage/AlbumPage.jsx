import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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

  const toggleDropdown = (trackId) => {
    setActiveTrackId(prev => prev === trackId ? null : trackId);
  };

  if (error) return <div>Error: {error}</div>;
  if (!album) return <div>Loading...</div>;
  

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
          <div key={track.id} className="album-album-track-item">
            <div className="album-album-track-info">
              <p className="album-album-track-name">{track.name}</p>
              <p className="album-album-track-duration">
                {Math.floor(track.duration_ms / 60000)}:
                {((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
              </p>
            </div>
            <div className="album-album-button-add-results-container">

            <div className="album-album-track-actions">
              <AddToSavedTracks track={track} 
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