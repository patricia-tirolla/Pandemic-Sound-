import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useFetchTracks from "../Song/GetTrackUrl";
// import usePlaylistFetch from "../../Hooks/usePlaylistFetch";
import TrackList from "./TrackList";
import PlaylistHeader from "./PlaylistHeader";
import "./playlistDisplay.css";
import {useProfile} from "../../Hooks/Profile";
import useGetRequest from "../../Hooks/useGetRequest";

const PlaylistDisplay = () => {
  const location = useLocation();
  const profile = useProfile();
  const [accessToken] = useState(localStorage.getItem("accessToken"));

  const { playlist, trackUrl } = location.state || {};
  const { tracks, error } = useFetchTracks(trackUrl);
  const { playlists } = useGetRequest(`https://api.spotify.com/v1/users/${profile.id}/playlists`, accessToken);

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
