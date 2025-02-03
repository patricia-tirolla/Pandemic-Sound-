import React, { useState, useEffect } from "react";
import "./song.css";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import AddToPlaylistButton from "../AddSongToPlaylist/AddToPlaylistButton";
import usePlaylistFetch from "../../Hooks/usePlaylistFetch";
import useSaveTrack from "../../Hooks/useSaveTrack";

const Song = () => {
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [embedUrl, setEmbedUrl] = useState();
  const [accessToken] = useState(localStorage.getItem("accessToken"));
  const { trackId } = useParams();
  const { data: trackData, error: trackError } = useFetch(`https://api.spotify.com/v1/tracks/${trackId}`, accessToken);
  const { playlists } = usePlaylistFetch();
  const { saveTrack, isLoading, error } = useSaveTrack();

  useEffect(() => {
    if (trackData) {

      fetch("https://open.spotify.com/oembed?url=" + trackData.external_urls.spotify)
        .then((resp) => resp.json())
        .then((json) => setEmbedUrl(json.iframe_url))
        .catch((err) => console.error(err));
    }
  }, [trackData]);

  const toggleDropdown = (trackId) => {
    setActiveTrackId(prevId => prevId === trackId ? null : trackId);
  };

  if (error || trackError) {
    return <div>Error: {error || trackError}</div>;
  }
  const handleLike = () => {
    saveTrack(trackData.id);
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  
  return (
    <div className="songContainer">
      {trackData && (
        <div className="trackDetails">
          {/* <img
            className="trackImage"
            src={trackData.album.images[0].url}
            alt="Track Art"
          /> */}
          <div className="trackInfo">
            <p className="trackName">{trackData.name}</p>
            <p className="trackArtistName">{trackData.artists[0].name}</p>
            <p className="trackLength">
              Duration: {formatDuration(trackData.duration_ms)}
            </p>
            <button onClick={handleLike} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Like'}
      </button>
      {error && <p>Error: {error}</p>}


            <AddToPlaylistButton
              track={trackData}
              playlists={playlists}
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