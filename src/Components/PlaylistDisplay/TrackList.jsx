import React, { useState, useEffect, useRef } from "react";
import Track from "./Track";

const TrackList = ({ tracks, playlists }) => {
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

  const toggleDropdown = (trackId) => {
    setActiveTrackId(prevId => prevId === trackId ? null : trackId);
  };

  return (
    <ul>
      {tracks.map(({ track }) => (
        <Track 
          key={track.id} 
          track={track} 
          playlists={playlists} 
          activeTrackId={activeTrackId}
          // dropdownRef={dropdownRef}
        />
      ))}
    </ul>
  );
};

export default TrackList;
