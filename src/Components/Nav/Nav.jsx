import React from "react"
import SearchBar from "../SearchPage/SearchBarComponent";
import "./nav.css";


function Nav() {

    return (
      <div className="Nav">
        <h1 className="logo">Pandemic Sound</h1>
        <SearchBar />
      </div>
    );
  }
  
  export default Nav;