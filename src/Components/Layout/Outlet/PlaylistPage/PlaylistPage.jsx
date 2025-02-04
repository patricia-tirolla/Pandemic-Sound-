import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TrackList from "./TrackList/TrackList";
import PlaylistHeader from "./PlaylistHeader/PlaylistHeader";
import "./playlistPage.css";
import { useProfile } from "../../../../Hooks/Profile";
import { usePlaylists } from "../../../../Hooks/PlaylistsProvider";
import useGetRequest from "../../../../Hooks/useGetRequest";

const PlaylistDisplay = () => {
  const { playlistId } = useParams();
  const profile = useProfile();
  const accessToken = localStorage.getItem("accessToken");
  const { data: tracks, error } = useGetRequest(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`,
    accessToken
  );
  const { playlists } = usePlaylists();
  const [playlist, setPlaylist] = useState();

  useEffect(() => {
    setPlaylist(playlists.find(playlist => playlist.id === playlistId));
  }, [playlists, playlistId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile || !playlist) return <div>Loading...</div>;

  return (
    <div className="playlist-page">
      <PlaylistHeader playlist={playlist} tracks={tracks?.items} />
      <TrackList tracks={tracks?.items} playlistId={playlistId} />
    </div>
  );
};

export default PlaylistDisplay;