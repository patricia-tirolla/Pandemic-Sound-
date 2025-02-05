import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetRequest from '../../../../../Hooks/useGetRequest';
import AddToPlaylistButton from "../../PlaylistPage/AddTrackToPlaylist/AddToPlaylistButton";
import AddToSavedTracks from "../../PlaylistPage/AddTrackToPlaylist/AddToSavedTracks";
import { usePlaylists } from '../../../../../Hooks/PlaylistsProvider';
import "./artistpage.css";
const ArtistPage = () => {
    const { artistId } = useParams();
    const [activeTrackId, setActiveTrackId] = useState(null);
    const accessToken = localStorage.getItem("accessToken");
    
    const { data: artist, error: artistError } = useGetRequest(
        `https://api.spotify.com/v1/artists/${artistId}`,
        accessToken
    );

    const { data: topTracks, error: tracksError } = useGetRequest(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
        accessToken
    );

    const { data: albums, error: albumsError } = useGetRequest(
        `https://api.spotify.com/v1/artists/${artistId}/albums?limit=10`,
        accessToken
    );

    const { playlists } = usePlaylists();

    const toggleDropdown = (trackId) => {
        setActiveTrackId(prev => prev === trackId ? null : trackId);
    };

    if (artistError || tracksError || albumsError) 
        return <div>Error: {artistError || tracksError || albumsError}</div>;
    
    if (!artist || !topTracks || !albums) return <div>Loading...</div>;

    return (
        <div className="artist-search-container">
            <div className="artist-search-header">
                <img 
                    src={artist.images?.[0]?.url} 
                    alt={artist.name} 
                    className="artist-search-cover"
                />
                <div className="artist-search-info">
                    <h1>{artist.name}</h1>
                    <p>{artist.followers?.total.toLocaleString()} followers</p>
                </div>
            </div>

            <section className="top-tracks-section">
                <h2>Popular Tracks</h2>
                <div className="tracks-container">
                    {topTracks.tracks?.map((track) => (
                        <div key={track.id} className="track-item">
                            <div className="track-info">
                                <img 
                                    src={track.album?.images?.[2]?.url} 
                                    alt={track.name}
                                    className="track-thumbnail" 
                                />
                                <p className="track-name">{track.name}</p>
                            </div>
                            <div className="track-actions">
                                <AddToSavedTracks track={track} />
                                <AddToPlaylistButton
                                    track={track}
                                    playlists={playlists}
                                    activeTrackId={activeTrackId}
                                    toggleDropdown={toggleDropdown}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="albums-search-section">
                <h2>Albums</h2>
                <div className="albums-search-grid">
                    {albums.items?.map((album) => (
                        <div key={album.id} className="album-search-card">
                            <img 
                                src={album.images?.[1]?.url} 
                                alt={album.name}
                                className="album-search-cover" 
                            />
                            <p className="album-search-name">{album.name}</p>
                            <p className="album-search-year">
                                {new Date(album.release_date).getFullYear()}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ArtistPage;