import React, { useState } from "react"
import { useNavigate } from "react-router";
import "./searchbar.css"

const SearchBar = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");

    const handleInputValue = (e) => {
        setInputValue(e.target.value)
    }

    const handleSearchSubmit = (e) => {
         
            e.preventDefault();
            if (inputValue.trim() === "") {
                navigate("/home");
                return;
            }
            navigate("/search?q=" + inputValue)
        

    }

    return (
        <div className="searchContainer">
            <form className="searchBarWrapper" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    name="q"
                    value={inputValue}
                    onChange={handleInputValue}
                    placeholder="Search for music..."
                />
                <button className="searchButton" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar