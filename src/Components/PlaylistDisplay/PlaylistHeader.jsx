import React from "react";
import { useState, useEffect } from "react";
import usePutRequest from "../../Hooks/usePutRequest";

const PlaylistHeader = ({ playlist, tracks }) => {
  const defaultImage =
    "https://static.vecteezy.com/system/resources/thumbnails/002/249/673/small/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg";
  const defaultName = "Untitled Playlist";

  const [title, setTitle] = useState(playlist?.name || defaultName);
  const [isEditing, setEdit] = useState(false);
  const { sendPutRequest } = usePutRequest();

  useEffect(() => {
    setTitle(playlist?.name || defaultName);
  }, [playlist]);

  const handleEditClick = () => {
    setEdit(true);
  };
  const handleSave = async () => {
    setEdit(false);
    const bodyData = { name: title };
    const url = `https://api.spotify.com/v1/playlists/${playlist.id}`;
    await sendPutRequest(url, bodyData);
    // Spotify takes around 30 secs to the change take effect, refetch the playlist will return old name
  };

  return (
    <>
      <h3 className="display-playlist-title">
        {isEditing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            className="playlist-title-input"
          ></input>
        ) : (
          <>
          {title}
          <p>{tracks?.length || 0} songs</p>
          </>
        )}
        <button
          onClick={handleEditClick}
          className="edit-playlist-btn"
        ></button>
      </h3>
      <img
        src={
          playlist?.images?.length > 0 ? playlist.images[0].url : defaultImage
        }
        className="display-playlist-img"
        alt="playlist"
      />
    </>
  );
};

export default PlaylistHeader;
