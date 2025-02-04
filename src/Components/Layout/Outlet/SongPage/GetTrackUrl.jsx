import { useState, useEffect } from "react";

const useFetchTracks = (trackUrl) => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("Access token is missing");
        return;
      }

      try {
        const response = await fetch(`${trackUrl}?limit=100`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching track data: ${response.statusText}`);
        }

        const data = await response.json();
        setTracks(data.items);
      } catch (err) {
        setError(err.message);
      }
    };

    if (trackUrl) {
      fetchTracks();
    }
  }, [trackUrl]);

  return { tracks, error };
};

export default useFetchTracks;