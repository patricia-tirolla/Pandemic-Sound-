import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFetchTracks from "../Song/GetTrackUrl";
import TrackList from "./TrackList";
import PlaylistHeader from "./PlaylistHeader";
import "./playlistDisplay.css";
import { useProfile } from "../../Hooks/Profile";
import useGetRequest from "../../Hooks/useGetRequest";

const PlaylistDisplay = () => {
  const location = useLocation();
  const profile = useProfile();
  const [accessToken] = useState(localStorage.getItem("accessToken"));
  const [tracks, setTracks] = useState([]);

  const { playlist, trackUrl } = location.state || {};
  const { tracks: fetchedTracks, error } = useFetchTracks(trackUrl);
  const { data: playlistsData } = useGetRequest(profile ? `https://api.spotify.com/v1/users/${profile.id}/playlists` : null, accessToken);
  const playlists = playlistsData ? playlistsData.items : [];

  useEffect(() => {
    if (fetchedTracks) {
      setTracks(fetchedTracks);
    }
  }, [fetchedTracks]);

  const handleDeleteTrack = (trackId) => {
    setTracks(prevTracks => prevTracks.filter(track => track.id !== trackId));
  };


  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!profile) return <div>Loading...</div>;

  if (!trackUrl) {
    return <div>No track URL provided</div>;
  }


   
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!profile) return <div>Loading...</div>;

  if (!trackUrl) {
    return <div>No track URL provided</div>;
  }

  return (
    <div className="display-playlist-container">
      <PlaylistHeader playlist={playlist} />
      <TrackList 
      tracks={tracks}
       playlists={playlists}
       playlistId={playlist.id} 
       onDeleteTrack={handleDeleteTrack} 
       />
    </div>
  );
};

export default PlaylistDisplay;
