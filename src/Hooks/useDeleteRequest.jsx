// Hooks/useDeleteRequest.js
import { useState } from "react";

const useDeleteRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendDeleteRequest = async (url, data) => {
    setIsLoading(true);
    setError(null);
    const accessToken = localStorage.getItem("access_token");

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      // to ensure that loading state is updated correctly
      const result = await response.json();
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  };

  return { sendDeleteRequest, isLoading, error };
};

export default useDeleteRequest;
