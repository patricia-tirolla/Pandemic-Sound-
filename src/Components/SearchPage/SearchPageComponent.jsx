import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import SearchBar from "./SearchBarComponent";

import "./searchpage.css"

const SearchPage = () => {
    const token = localStorage.getItem("accessToken");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("");
    const [searchValue, setSearchValue] = useState("");
    // const [trackId, setTrackId] = useState();
    const navigate = useNavigate();

    function handleSearchSubmit(e) {
        e.preventDefault();
        setUrl("https://api.spotify.com/v1/search?q=" + searchValue + "&type=artist%2Ctrack%2Calbum&limit=5");
    }

    function onSearchChange(e) {
        setSearchValue(e.target.value)
    }

    function onTrackClick() {
        navigate("track/:trackId");
    }

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
                setResult(trackData);
                console.log("track data: ", trackData);

            } catch (error) {
                console.error("Error fetching the track:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        SearchFetcher()
    }, [url, token])

    return (
        <div className="search-container">
            <div className="search-bar-container">
                <SearchBar
                    handleSearchSubmit={handleSearchSubmit}
                    searchValue={searchValue}
                    onChange={onSearchChange} />
            </div>
            {error &&
                <div className="error-message">Error: {error}</div>
            }
            {result && !loading &&
                <div className="search-results">
                    <ul className="search-list">
                        {result?.tracks?.items?.map((item) => (
                            <li key={item.id} className="single-track-container">
                                <a href={item.id} target="_blank" rel="noopener noreferrer" onClick={onTrackClick}>
                                    <div className="track-info">
                                        <img
                                            className="track-image"
                                            src={item.album?.images?.[0]?.url || "https://via.placeholder.com/150"}
                                            alt="Album Art"
                                        />
                                        <div className="track-details">
                                            <p className="track-name">{item.name}</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
};

export default SearchPage;
