import { useState } from "react";

const useSaveTrack = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveTrack = async (trackId) => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("No access token found");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/tracks`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: [trackId] })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Track saved successfully!');
    } catch (error) {
      console.error("Error saving track:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { saveTrack, isLoading, error };
};

export default useSaveTrack;
