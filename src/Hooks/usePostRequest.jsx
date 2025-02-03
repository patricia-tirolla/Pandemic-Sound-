import { useState, useCallback } from 'react';

function usePostRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendPostRequest = async (url, bodyData) => {
    setIsLoading(true);
    setError(null);

    if (!bodyData?.uris?.length) {
        setError("No track URIs provided");
        setIsLoading(false);
        return;
      }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        setError("No access token found");
        setIsLoading(false);
        return;
      }
      try {
        const requestBody = JSON.stringify({
            uris: Array.isArray(bodyData.uris) ? bodyData.uris : [bodyData.uris]
          });
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: requestBody
          });
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch (error) {
        console.error('Request failed:', error);
        setError(error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

  return { sendPostRequest, isLoading, error };
}

export default usePostRequest;
