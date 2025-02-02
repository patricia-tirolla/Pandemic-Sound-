import { useState } from "react";

const usePost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const sendPostRequest = async (playlistId, trackUri) => {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem("accessToken");
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    
        if (!token) {
            setError("No access token found");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uris: [trackUri] })
            });

            // if (response.status === 401) {
            //     localStorage.removeItem("accessToken");
            //     window.location.href = '/';
            //     throw new Error("Session expired - Please login again");
            // }

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

    return { sendPostRequest, isLoading, error };
};

export default usePost;