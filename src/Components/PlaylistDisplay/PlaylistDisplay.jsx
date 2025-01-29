
import { useParams } from "react-router-dom";
import {useEffect, useState} from"react"
import "./playlistDisplay.css" 
// this will need the props from get playlist 
const PlaylistDisplay = () => {

  const { name } = useParams();
  // const [playlistDetails, setPlaylistDetails] = useState(null);

  // useEffect(()=>{
  //   const getPlaylistDetails = async () => {
  //     const response = await fetch(`https://api.spotify.com/v1/playlists/${name}`);
  //     const data = await response.json();
  //     setPlaylistDetails(data);
  //   };
  //   getPlaylistDetails();
  // },[name])

  // if (!playlistDetails) {
  //   return <h2>Loading...</h2>;
  // }

  return (
    <div>
      <h2>Playlist: {name}</h2>
     
    </div>
  );

  }
  export default PlaylistDisplay;