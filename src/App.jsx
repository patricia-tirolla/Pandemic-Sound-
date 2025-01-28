import React, {useState} from "react"
import Homepage from './Components/Homepage/Homepage';
import Nav from './Components/Nav/Nav';
import Sidebar from './Components/Sidebar/Sidebar';
import './styles/App.css';
import Song from './Components/Song/Song';

function App() {
  const token = localStorage.getItem("accessToken");
  const [searchValue, setSearchValue] = useState("");
  const [url, setUrl] = useState("");

  function handleSearchSubmit(e) {
    e.preventDefault();
    setUrl("https://api.spotify.com/v1/search?q=" + searchValue + "&type=artist%2Ctrack%2Calbum&limit=3")
  }

  function onSearchChange(e) {
    setSearchValue(e.target.value)
  }

  return (
    <div className="App">
        <Nav handleSearchSubmit={handleSearchSubmit} searchValue={searchValue} onSearchChange={onSearchChange}/>
        <Sidebar/>
        <Homepage searchValue={searchValue} token={token} url={url} />
        <Song />
    </div>
  );
}

export default App;