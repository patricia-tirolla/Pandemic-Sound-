import React from "react";

const PlaylistHeader = ({ playlist }) => {
  const defaultImage = "https://static.vecteezy.com/system/resources/thumbnails/002/249/673/small/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg";
  const defaultName = "Untitled Playlist";

  return (
    <>
      <h2 className="display-playlist-title">Playlist: {playlist?.name || defaultName}</h2>
      <img 
        src={playlist?.images?.length > 0 ? playlist.images[0].url : defaultImage} 
        className="display-playlist-img" 
        alt="playlist" 
      />
    </>
  );
};

export default PlaylistHeader;
