import { useState, useEffect } from "react";
import {useProfile} from "./Profile";

const usePlaylistFetch = () => {
  const [playlists, setPlaylists] = useState([]);
  const profile = useProfile();

  useEffect(() => {
    const fetchPlaylists = async () => {
      const token = localStorage.getItem("accessToken");
      if (!profile || !token) return;

      try {
        const response = await fetch(`https://api.spotify.com/v1/users/${profile.id}/playlists`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setPlaylists(data.items);
      } catch (error) {
        console.log("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, [profile]);

  return { playlists };
};

export default usePlaylistFetch;
