import { useState } from 'react';

const useSaveTrack = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveTrack = async (trackId) => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");

    try {
        const response = await fetch(`https://api.spotify.com/v1/me/tracks`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: [trackId] })
        });

        if (response.status === 401) {
            // Token expired - redirect to login
            window.location.href = '/';
            return;
        }

        if (!response.ok) {
            throw new Error('Failed to save track. Please try logging in again.');
        }

        console.log('Track saved successfully!');
        alert('Track added to your Liked Songs');
    } catch (err) {
        console.error('Error saving track:', err.message);
        setError('Failed to save track. Please try logging in again.');
        alert('Failed to save track. Please try logging in again.');
    } finally {
        setIsLoading(false);
    }
};

  return { saveTrack, isLoading, error };
};

export default useSaveTrack;