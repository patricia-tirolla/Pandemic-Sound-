import React from "react";
import SearchBar from "./SearchBar/SearchBarComponent";
import { useProfile } from "../../../Hooks/Profile";
import { isUserAuthenticated } from "../../AuthCallback/script";
import "./nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  const profile = useProfile();

  return (
    <nav className="Nav">
      <Link to="/">
        <h1 className="logo">Pandemic Sound</h1>
      </Link>
      <SearchBar />
      {isUserAuthenticated() && profile?.images?.[0]?.url && (
        <div className="profile-container">
          <Link to="/home">
            <img
              src={profile.images[0].url}
              alt="Profile"
              className="profile-image"
            />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
