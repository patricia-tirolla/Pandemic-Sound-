import React, { useState, useEffect } from "react";

const SearchResult = ({ url, token }) => {
    const [valueList, setValueList] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const SearchFetcher = async () => {
            if (url === "") {
                return;
            }
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
                setValueList(trackData);
            } catch (error) {
                console.error("Error fetching the track:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        SearchFetcher()
    }, [url, token])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (valueList) {
        return (
            <div>
                <ul>
                    {valueList?.albums?.items?.map((item) => (
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
                    {valueList?.artists?.items?.map((item) => (
                        <li key={item.id}>{item.name}</li>))}
                </ul>
                <ul>
                    {valueList?.tracks?.items?.map((item) => (
                        <li key={item.id}>{item.name}</li>))}
                </ul>
            </div>
        );
    }

};

export default SearchResult;
