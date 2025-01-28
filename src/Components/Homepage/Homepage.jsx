import "./homepage.css"
import SpotifyAuth from '../../Api-auth/ApiAuthComponent';
import React from "react";

function Homepage() {
  const clientId = "bab8a1bc1b6348759c3cd4efb8b959e9";
  return (
    <div className="homepage">
      <SpotifyAuth clientId={clientId} />
    </div>
  );
}
export default Homepage;