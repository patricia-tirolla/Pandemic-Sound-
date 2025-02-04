import React, { useState, useEffect, useRef } from "react";
import Track from "./Track";

  const TrackList = ({ tracks, playlists, playlistId, onDeleteTrack }) => {
    const [activeTrackId, setActiveTrackId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isDropdownItem = event.target.closest('.dropdown-item');
      
      if (activeTrackId && 
          dropdownRef.current && 
          !dropdownRef.current.contains(event.target) && 
          !isDropdownItem) {
        setActiveTrackId(null);
      }
    };

    if (activeTrackId) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [activeTrackId]);

 

  return (
    <ul>
      {tracks && tracks.map(({ track }) => ( // Check if tracks exists and is not null or undefined
        <Track 
          key={track.id} 
          track={track} 
          playlists={playlists} 
          activeTrackId={activeTrackId}
          playlistId={playlistId} 
          onDeleteTrack={onDeleteTrack} 
        />
      ))}
    </ul>
  );
};

export default TrackList;
