import React, { useEffect, useState } from "react";



const GetPlaylist = () => {
    const[userPlaylists, setPlaylists] = useState([])
    const profileId = localStorage.getItem("profileId")
    const token = localStorage.getItem("accessToken")

    useEffect(() => {
        if (!profileId || !token) {
            console.error("Missing profileId or token");
            return;
          }
     
    
        var playlistParameters ={
            method:"GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
        const playlistUrl = `https://api.spotify.com/v1/users/${profileId}/playlists`;
        fetch(playlistUrl, playlistParameters)
        .then(result => result.json())
        .then(data => setPlaylists(data.items))
        .catch((error) => console.error("Error fetching playlists:", error));
     
    })


    return (
      <div className="playlistList">
      
        <div className="playlistContainer">
        <h3>Playlists</h3>
        {userPlaylists.length > 0 ? (
          userPlaylists.map((userPlaylists, index) => (
            <div key={index}>
              <h4>{userPlaylists.name}</h4>
              <p>Songs: {userPlaylists.tracks.total}</p>
            </div>
          ))
        ) : (
          <p>No playlists found</p>
        )}
      </div>
      </div>
    );

}
  export default GetPlaylist;