import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBarComponent";
import { Link } from "react-router";

const SearchPage = () => {
    const token = localStorage.getItem("accessToken");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [url, setUrl] = useState("");
    const [searchValue, setSearchValue] = useState("");

    function handleSearchSubmit(e) {
        e.preventDefault();
        setUrl("https://api.spotify.com/v1/search?q=" + searchValue + "&type=artist%2Ctrack%2Calbum&limit=5");
    }

    function onSearchChange(e) {
        setSearchValue(e.target.value)
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
        <div>
            <nav>
                <SearchBar handleSearchSubmit={handleSearchSubmit} searchValue={searchValue} onChange={onSearchChange} />
            </nav>
            {error &&
                <div>Error: {error}</div>
            }
            {result && !loading &&
                <div>
                    <ul>
                        {result?.tracks?.items?.map((item) => (
                            <li key={item.id}>
                                {item.name}
                                <img src={item.album?.images?.[0]?.url || "https://via.placeholder.com/150"} alt="Album Art" width={80} />
                            </li>))}
                    </ul>
                </div>
            }
            <Link to="/home">Go to home</Link>
        </div>
    );
};

export default SearchPage;
