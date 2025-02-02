import { useState } from "react";

const useAddTrackToPlaylist = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addTrackToPlaylist = async (playlistId, trackUri) => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: [trackUri] })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to add track to playlist: ${errorData.error.message}`);
      }

      alert('Track added successfully');
      console.log('Track added successfully');
    } catch (error) {
      console.error('Error adding track to playlist:', error);
      alert('Failed to add track. Please check the console for more details.');
    } finally {
      setIsLoading(false);
    }
  };

  return { addTrackToPlaylist, isLoading };
};

// export default useAddTrackToPlaylist;
