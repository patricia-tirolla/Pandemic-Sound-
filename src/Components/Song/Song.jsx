import React, { useState } from "react";
import useSpotifyTrackData from "./SongHook";
import "./song.css";

const Song = () => {
  const [error] = useState(null);
  const [accessToken] = useState(localStorage.getItem("accessToken"));

  const trackId = "7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B";
  const { trackData, error: trackError } = useSpotifyTrackData(
    accessToken,
    trackId
  );

  if (error || trackError) {
    return <div>Error: {error || trackError}</div>;
  }

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="songContainer">
      {trackData && trackData.tracks && trackData.tracks.map((track) => (
         <div key={track.id} className="track">
         {track.album && track.album.images && track.album.images[0] && (
           <img
             className="trackImage"
             src={track.album.images[0].url}
             alt="Track Art"
           />
         )}
        <h3>{track.name}</h3>
        <p>Artist: {track.artists.map(artist => artist.name).join(", ")}</p>
        <p>Album: {track.album.name}</p>
        <p>Duration: {formatDuration(track.duration_ms)}</p>

            <button className="trackButtonHeart">heart</button>
            <button className="trackButtonAddtoPlaylist">
              add to playlist
            </button>
          </div>
      ))}
      </div >
  );
};

export default Song;

// const courses = [
//   "Full Stack Developement Program",
//   "Python Automation Testing Program",
//   "UI/UX Program",
// ];

// function App(props) {

//   /* Mapping the courses into a new array of JSX nodes as arrayDataItems */
//   const arrayDataItems = courses.map((course) => <li>{course}</li>);

//   return (
//     <div className="container">
//       <div>
//         <h1>Render List/Array of Items</h1>
//       </div>
//       {/* returning arrayDataItems wrapped in <ul> */}

//       <ul>{arrayDataItems}</ul>
//     </div>
//   );
// }
