import "./playlistButton.css";
import { NavLink } from "react-router";

const  PlaylistButton =(props) =>{
    return (
        <NavLink to={props.to}>
        <div className="playlistButtonContainer">
          <p className="playlist-title">{props.title}</p>
          {/* <button className="playlistButton">playlist</button> */}
        </div>
      </NavLink>
    )
  }
  
  export default PlaylistButton;