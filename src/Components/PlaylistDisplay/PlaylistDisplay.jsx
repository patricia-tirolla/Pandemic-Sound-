import React from "react";
import { useLocation } from "react-router-dom";
import useFetchTracks from "../Song/GetTrackUrl";
import usePlaylistFetch from "../../Hooks/usePlaylistFetch";
import TrackList from "./TrackList";
import PlaylistHeader from "./PlaylistHeader";
import "./playlistDisplay.css";


const PlaylistDisplay = () => {
  const location = useLocation();
  const { playlist, trackUrl } = location.state || {};
  const { tracks, error } = useFetchTracks(trackUrl);
  const { playlists } = usePlaylistFetch();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!trackUrl) {
    return <div>No track URL provided</div>;
  }

  return (
    <div className="display-playlist-container">
      <PlaylistHeader playlist={playlist} />
      <TrackList tracks={tracks} playlists={playlists} />
    </div>
  );
};

export default PlaylistDisplay;
