import React from "react"
import { Link } from "react-router";
import "./searchbar.css"

const SearchBar = ({handleSearchSubmit, searchValue, onChange}) => {
    
    return (
        <div className="searchContainer">
            <form className="searchBarWrapper" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={searchValue}
                        onChange={onChange}
                        placeholder="Search for music..."
                    />
                    <button className="searchButton" type="submit">Search</button>
                    <Link to="/home" className="goHome">Go to home</Link>
            </form>
        </div>
    )
}

export default SearchBar
