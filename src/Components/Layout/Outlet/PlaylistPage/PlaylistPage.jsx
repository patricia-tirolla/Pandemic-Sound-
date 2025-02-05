import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TrackList from "./TrackList/TrackList";
import PlaylistHeader from "./PlaylistHeader/PlaylistHeader";
import "./playlistPage.css";
import { useProfile } from "../../../../Hooks/Profile";
import { usePlaylists } from "../../../../Hooks/PlaylistsProvider";

const PlaylistDisplay = () => {
  const { playlistId } = useParams();
  const profile = useProfile();
  const accessToken = localStorage.getItem("accessToken");
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState();
  const { playlists, fetchPlaylists } = usePlaylists();
  const [playlist, setPlaylist] = useState();

  useEffect(() => {
    setPlaylist(playlists.find(playlist => playlist.id === playlistId));

    (async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (response.ok) {
            const json = await response.json();
            setTracks(json.items);
        } else {
            console.error("failed to feth", response.status);
        }
    } catch (err) {
        console.error("Couldn't fetch:", err);
        setError(err);
    }
    })()

  }, [playlists, playlistId, accessToken]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile || !playlist) return <div>Loading...</div>;

  return (
    <div className="playlist-page">
      <PlaylistHeader playlist={playlist} tracks={tracks} />
      <TrackList tracks={tracks} playlistId={playlistId} onDeleteTrack={fetchPlaylists} />
    </div>
  );
};

export default PlaylistDisplay;