import { useState } from "react";

const usePost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendPostRequest = async (url, bodyData) => {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem("accessToken");

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

            if (response.status === 401) {
                localStorage.removeItem("accessToken");
                window.location.href = '/';
                throw new Error("Session expired - Please login again");
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
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

export default usePost;