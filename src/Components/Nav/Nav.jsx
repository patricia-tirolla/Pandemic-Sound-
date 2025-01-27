import "./nav.css";
import TrackDataFetcher from "../SearchBar/SearchBarComponent";

function Nav() {
  const artist = "Beyonce"
  const url = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist%2Ctrack%2Calbum&limit=3"
  const token = localStorage.getItem("accessToken")
  return (
    <div className="Nav">
      <h1>Nav</h1>
      < TrackDataFetcher url={url} token={token} />
    </div>
  );
}

export default Nav;