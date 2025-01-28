import React from "react"
import "./nav.css";
import SearchBar from "../SearchBar/SearchBarComponent";

function Nav({handleSearchSubmit, searchValue, onSearchChange}) {

  return (
    <div className="Nav">
      <h1>Nav</h1>
      <SearchBar handleSearchSubmit={handleSearchSubmit} value={searchValue} onChange={onSearchChange}/>
    </div>
  );
}

export default Nav;