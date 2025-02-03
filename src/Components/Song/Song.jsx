import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {useProfile} from "../../Hooks/Profile";
import useGetRequest from "../../Hooks/useGetRequest";
import usePutRequest from "../../Hooks/usePutRequest";
import AddToSavedTracks from "../AddSongToPlaylist/AddToSavedTracks";
import AddToPlaylistButton from "../AddSongToPlaylist/AddToPlaylistButton";
import { usePlaylists } from "../PlaylistsProvider/PlaylistsProvider";
import "./song.css";

const Song = () => {
  const [accessToken] = useState(localStorage.getItem("accessToken"));
  const profile = useProfile();
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [embedUrl, setEmbedUrl] = useState();
  const { trackId } = useParams();
  const { data: trackData, error: trackError } = useGetRequest(`https://api.spotify.com/v1/tracks/${trackId}`, accessToken);
  const {playlists} = usePlaylists();
  const { error } = usePutRequest();

  useEffect(() => {  
    if (trackData) {
      fetch("https://open.spotify.com/oembed?url=" + trackData.external_urls.spotify)
        .then((resp) => resp.json())
        .then((json) => setEmbedUrl(json.iframe_url))
        .catch((err) => console.error(err));
    }
  }, [trackData, trackId, accessToken]);

  const toggleDropdown = (trackId) => {
    setActiveTrackId(prevId => prevId === trackId ? null : trackId);
  };

  if(!profile) return <div>Loading...</div>
  
  if (error || trackError) {
    return <div>Error: {error || trackError}</div>;
  }
  
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  
  return (
    <div className="songContainer">
      {trackData && (
        <div className="trackDetails">
          <div className="trackInfo">
            <p className="trackName">{trackData.name}</p>
            <p className="trackArtistName">{trackData.artists[0].name}</p>
            <p className="trackLength">
              Duration: {formatDuration(trackData.duration_ms)}
            </p>
            <AddToSavedTracks
                        track={trackData}
                        playlists={playlists}
                        activeTrackId={activeTrackId}
                      />
      {error && <p>Error: {error}</p>}
            <AddToPlaylistButton
              track={trackData}
              activeTrackId={activeTrackId}
              toggleDropdown={toggleDropdown}
            />
            {embedUrl &&
              <iframe src={embedUrl} title="Spotify Embed"></iframe>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Song;