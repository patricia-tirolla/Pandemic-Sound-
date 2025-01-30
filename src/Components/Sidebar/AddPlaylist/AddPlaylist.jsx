import { useProfile } from "../../../Hooks/Profile";
import { useState } from "react";  
import "./addPlaylist.css"

const AddPlaylist = () => {
  const profile = useProfile();
  const [loading, setLoading] = useState(false);

  const createPlaylist = () => {  
    const token = localStorage.getItem("accessToken");

    if (profile !== null) {
      const addPlaylistURL = `https://api.spotify.com/v1/users/${profile.id}/playlists`;

      const playlistData = {
        name: "New plalist",
        description: "", // optional
      };

      const addPlaylistURLParameters = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playlistData),
      };

      setLoading(true);

      fetch(addPlaylistURL, addPlaylistURLParameters)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error.message);
          }
          console.log("Playlist created:", data);
        })
        .catch((error) => {
          console.error("Error creating playlist:", error);
        })
        .finally(() => {
          setLoading(false);  
        });
    }
  };

  return (
    <>
      <button className="add-new-playlist" onClick={createPlaylist} disabled={loading}>
        {loading ? "Creating Playlist..." : "+"}
      </button>
     </> 
  );
};

export default AddPlaylist;
