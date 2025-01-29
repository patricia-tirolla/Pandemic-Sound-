import {useLocation} from"react-router-dom"
import "./playlistDisplay.css" 


const PlaylistDisplay = () => {

  const {state} = useLocation();
  const playlist = state?.playlist;
  console.log(playlist)

  if (!playlist) {
    return <h2>Loading...</h2>;
  }


  return (
    <div className="display-playlist-container">
      <h2 className="display-playlist-title">Playlist: {playlist.name}</h2>
      <img src={playlist.images[0].url} className="display-playlist-img"></img>
     
    </div>
  );

  }
  export default PlaylistDisplay;