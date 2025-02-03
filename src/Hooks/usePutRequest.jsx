import {useState} from "react"

const usePutRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendPutRequest = async (url, bodyData) => {
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
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendPutRequest, isLoading, error };
};

export default usePutRequest;