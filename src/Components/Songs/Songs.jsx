import React from "react";
import { useState, useEffect } from "react";

// curl --request GET \
//   --url https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl
//   --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'

// export default function Songs() {
//   return (
//     <div className="songs">
//       <h2>sdddsongs</h2>
//     </div>
//   );
// }

// fetch("https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl", {
//   method: "GET",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + accessToken,
//   },
// }).then((response) => {
//   console.log(
//     response.json().then((data) => {
//       console.log(data);
//     })
//   );
// });

const Songs = () => {
  const [Songs, setSongs] = useState([]);
  useEffect(() => {
    fetch("https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setSongs(data);
      });
  }, []);
  return (
    <div>
    </div>
  );
};
export default Songs;