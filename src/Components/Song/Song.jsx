import React, { useState, useEffect } from "react";
import "./song.css";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

const Song = () => {
  const [error] = useState(null);
  const [embedUrl, setEmbedUrl] = useState();
  const [accessToken] = useState(localStorage.getItem("accessToken"));
  const { trackId } = useParams();
  const { data: trackData, error: trackError } = useFetch(`https://api.spotify.com/v1/tracks/${trackId}`, accessToken);

  useEffect(() => {
    if (trackData) {
      console.log(trackData)

      fetch("https://open.spotify.com/oembed?url=" + trackData.external_urls.spotify)
        .then((resp) => resp.json())
        .then((json) => setEmbedUrl(json.iframe_url))
        .catch((err) => console.error(err));
    }
  }, [trackData]);

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
            <button className="trackButtonHeart">heart</button>
            <button className="trackButtonAddtoPlaylist">
              add to playlist
            </button>
            {embedUrl && 
              <iframe src={embedUrl} title="Preview Player"></iframe>
            }
          </div>
        </div>
      )}         
    </div>
  );
};

export default Song;