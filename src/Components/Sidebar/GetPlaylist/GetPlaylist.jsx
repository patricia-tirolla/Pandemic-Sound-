import "./getPlaylist.css";
import PlaylistButton from "../PlaylistButton/PlaylistButton";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetPlaylist = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
    useEffect(() => {
   
     setTimeout(() => {
       
        const profileId = localStorage.getItem("profileId");
        const token = localStorage.getItem("accessToken");
  
        // they exist? yesss
        if (profileId && token) {
          console.log("Token:", token);
          console.log("Profile ID:", profileId);
          
          const playlistUrl = `https://api.spotify.com/v1/users/${profileId}/playlists`;
  
          const playlistParameters = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
  
        fetch(playlistUrl, playlistParameters)
          .then((response) => response.json())
          .then((data) => setData(data.items),console.log(data)) 
          .catch((error) => {
            console.error("Error fetching playlists:", error);
          })
          .finally(() => setLoading(false));
        } else {
          console.error("Profile ID or token is missing!");
          setLoading(false)
        }
      }, 3000); 
  
  
    }, []); 
    if (loading) {
      return <h2>Loading...</h2>; 
    }
  
    const displayPlaylist = (name) => {
      navigate(`/playlist/${name}`); 
    }
  return (

    <div>
      {/* <PlaylistButton/> */}
      <div className="playlistContainer">
      {data.length > 0 ? (
        data.map((playlist) => (
          <div key={playlist.id} className="single-playlist-container" onClick={()=>displayPlaylist(playlist.name)}>
            <img src={playlist.images[0].url} className="playlist-image"/>
            <div className="playlist-info">
            <h4>{playlist.name}</h4>
            <p>{playlist.tracks.total} songs</p>
            </div>
          </div>
        ))
      ) : (
        <p>No playlists found</p>
      )}
    </div> 
    </div>

  );
};
export default GetPlaylist;
