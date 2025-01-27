import React, { useState, useEffect } from "react";

const TrackDataFetcher = ({ url, token }) => {
    const [trackData, setTrackData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const trackSearch = async () => {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const trackData = await response.json();
                setTrackData(trackData);
                console.log(trackData);
            } catch (error) {
                console.error("Error fetching the track:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        trackSearch()
    }, [url, token])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (trackData) {
        return (
            <div>
                <ul>
                    {trackData?.albums?.items?.map((item) => (
                        <li key={item.id}>
                            {item.name}
                            {/* <img
                                src={trackData.album?.images?.[0]?.url || "https://via.placeholder.com/150"}
                                alt="Album Art"
                                width={150}
                            /> */}
                        </li>))}
                </ul>
                <ul>
                    {trackData?.artists?.items?.map((item) => (
                        <li key={item.id}>{item.name}</li>))}
                </ul>
                <ul>
                    {trackData?.tracks?.items?.map((item) => (
                        <li key={item.id}>{item.name}</li>))}
                </ul>
            </div>
        );
    }

};

export default TrackDataFetcher;
