import React from "react";
import SearchBar from "./SearchBar/SearchBarComponent";
import { useProfile } from "../../../Hooks/Profile";
import { isUserAutheticated } from "../../AuthCallback/script";
import "./nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  const profile = useProfile(); 

  return (
    <div className="Nav">
  <Link to="/">
        <h1 className="logo">Pandemic Sound</h1>
        </Link>
        <SearchBar />
      {isUserAutheticated() && profile?.images?.[0]?.url && (
        <div className="profile-container">
      <Link to="/home" >
          <img
            src={profile.images[0].url}
            alt="Profile"
            className="profile-image"
          />
      </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
