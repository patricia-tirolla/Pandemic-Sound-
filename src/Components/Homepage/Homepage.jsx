import "./homepage.css"
import SpotifyAuth from '../../Api-auth/ApiAuthComponent';
import React from "react";
import clientId from "../../Api-auth/ClientId";

function Homepage() {
    return (
      <div className="homepage">
        <SpotifyAuth clientId={clientId} />
        
      </div>
    );

  }
  console.log(clientId)
  
  export default Homepage;