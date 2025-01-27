import React, { useState }from "react"
import "./nav.css";
import SearchResult from "../SearchBar/SearchResultComponent";

function Nav() {
  const [searchValue, setSearchValue] = useState("");
  const url = "https://api.spotify.com/v1/search?q=" + searchValue + "&type=artist%2Ctrack%2Calbum&limit=3"
  const token = localStorage.getItem("accessToken")

  function handleInputChange(e) {
    setSearchValue( e.target.value );
  }

  return (
    <div className="Nav">

      <h1>Nav</h1>
      <label>
        <input
          type="text"
          name="name"
          value={searchValue}
          onChange={handleInputChange}
        />
      </label>
      {searchValue && token && (
        <SearchResult url={url} token={token} />
      )}
    </div>
  );
}

export default Nav;