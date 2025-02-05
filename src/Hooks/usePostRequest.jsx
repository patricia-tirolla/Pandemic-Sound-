import { useState } from 'react';

const usePostRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendPostRequest = async (url, bodyData) => {
        setIsLoading(true);
        setError(null);
        
        const token = localStorage.getItem("access_token");
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
                body: JSON.stringify(bodyData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { sendPostRequest, isLoading, error };
};

export default usePostRequest;