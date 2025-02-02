import { useState, useEffect } from "react";

const useGetRequest = (url, token) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await fetch(url, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    const json = await response.json();
                    setData(json);
                } else {
                    console.error("failed to feth", response.status);
                }
            } catch (err) {
                setError(err);
                console.error("Couldn't fetch:", err);
            } finally {
                setLoading(false);
            }
        })()

    }, [url, token]);

    return { data, error, loading };
}

export default useGetRequest;