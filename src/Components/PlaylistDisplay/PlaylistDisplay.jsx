import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchTracks from "../Song/GetTrackUrl";
import TrackList from "./TrackList";
import PlaylistHeader from "./PlaylistHeader";
import "./playlistDisplay.css";
import {useProfile} from "../../Hooks/Profile";
import { usePlaylists } from "../PlaylistsProvider/PlaylistsProvider";

const PlaylistDisplay = () => {
  const {playlistId} = useParams();
  const profile = useProfile();
  const { tracks, error } = useFetchTracks(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`);
  const {playlists}  = usePlaylists();
  const [playlist, setPlaylist] = useState();
  
  useEffect(() => {
    setPlaylist(playlists.find(playlist => playlist.id === playlistId))
  }, [playlists, playlistId])

  if (error) {
    return <div>Error: {error}</div>;
  }
  if(!profile) return <div>Loading...</div>

  return (
    <div className="display-playlist-container">
      <PlaylistHeader tracks={tracks} playlist={playlist} />
      <TrackList tracks={tracks} playlists={playlists} />
    </div>
  );
};

export default PlaylistDisplay;

