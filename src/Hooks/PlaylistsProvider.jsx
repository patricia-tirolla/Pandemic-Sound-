import { useContext, useState, useEffect, useCallback } from "react";
import PlaylistsContext from "../Context/Playlists";
import { useProfile } from "./Profile";

export function usePlaylists() {
  return useContext(PlaylistsContext);
}

// a provider isn't a hook

function PlaylistsProvider({ children }) {
  const [playlists, setPlaylists] = useState([]);
  const profile = useProfile();
  const accessToken = localStorage.getItem("access_token");

  const fetchPlaylists = useCallback(
    async function () {
      //   can be simplified to one line
      if (!profile || !accessToken) return;
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/playlists`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.ok) {
          const json = await response.json();
          setPlaylists(json.items);
        } else {
          console.error("failed to feth", response.status);
        }
      } catch (err) {
        console.error("Couldn't fetch:", err);
      }
    },
    [profile, accessToken]
  );

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return (
    <PlaylistsContext.Provider
      value={{ playlists, fetchPlaylists, setPlaylists }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
}

export default PlaylistsProvider;
