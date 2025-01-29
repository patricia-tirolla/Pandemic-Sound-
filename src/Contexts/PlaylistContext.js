import { createContext, useState, useContext } from "react";

const PlaylistContext = createContext();

export const usePlaylist = () => {
  return useContext(PlaylistContext);
};

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  //fetching playlists!
  const fetchPlaylists = async (profileId, token) => {
    const playlistUrl = `https://api.spotify.com/v1/users/${profileId}/playlists`;
    const playlistParameters = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(playlistUrl, playlistParameters);
      const data = await response.json();
      setPlaylists(data.items);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setLoading(false);
    }
  };

  //fetching tracks for specific playlist!
  const fetchTracks = async (playlistId, token) => {
    const tracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const tracksParameters = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(tracksUrl, tracksParameters);
      const data = await response.json();
      // Update the playlist with the fetched tracks
      setPlaylists((prevState) =>
        prevState.map((playlist) =>
          playlist.id === playlistId
            ? { ...playlist, tracks: data.items }
            : playlist
        )
      );
    } catch (error) {
      console.error("Error fetching tracks for playlist:", error);
    }
  };

  //edit playlist fx here
  //add a track
  //remove a track

  return (
    <PlaylistContext.Provider value={{ playlists, fetchPlaylists,fetchTracks, loading }}>
      {children}
    </PlaylistContext.Provider>
  );
};
