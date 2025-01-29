import "./homepage.css"
import SpotifyAuth from '../../Api-auth/ApiAuthComponent';
import SearchResult from "../SearchBar/SearchResultComponent";
import React from "react";
import Song from '../Song/Song';

function Homepage({searchValue, token, url}) {
  const clientId = "bab8a1bc1b6348759c3cd4efb8b959e9";

  return (
    <div className="homepage">
      <SpotifyAuth clientId={clientId} />
      {searchValue && token && (
        <SearchResult url={url} token={token} />
      )}
      <Song/>
    </div>
  );
}
export default Homepage;