import React, { useEffect, useState } from "react";

// userID =
//URL to fetch
//token

const GetPlaylist = () => {
    const[searchPlaylist, setPlaylist] = useState("")

    useEffect(() => {
        //the token
        var playlistParameters ={
            method:"GET",
            headers: {
                'Authorization': 'Bearer BQAsUoenGNgd_jHQgLmz4sqsiRyHXrppvgpQubhTTCPp8HsWp9eJ144i8-EuDxpx6C1IWjihNzclwlPPSBpy9zeeibIQaP9GVCsDkyVgwZZOTPb4fv4TLz-9WC9SAtq86xx8U675Y5fWWGjtLUG2wj_97X9yf-f66XeiVQFneNHnKeSLGFOzXUF5b2N8UQUI0rwNA1NavSk'
            },
        }
        fetch("https://api.spotify.com/v1/users/nat.torres9/playlists ", playlistParameters)
        .then(result => result.json())
        .then(data => console.log(data))
    })


    return (
      <div className="playlist">
        {/* map() and return a div */}
         <div className="playlistContainer">
            <h3>Title</h3>
            <p>Songs n°</p>
         </div>


      </div>
    );

}
  export default GetPlaylist;