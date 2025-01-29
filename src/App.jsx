import {Route, Routes, useNavigate} from "react-router-dom";
import React, { useEffect } from 'react';

import Main from './Components/Main/Main';
import Nav from './Components/Nav/Nav';
import Sidebar from './Components/Sidebar/Sidebar';
import SpotifyAuth from "./Api-auth/ApiAuthComponent";
import PlaylistDisplay from "./Components/PlaylistDisplay/PlaylistDisplay"
import "./styles/reset.css"
import './styles/App.css';


const clientId = "bab8a1bc1b6348759c3cd4efb8b959e9";

function App() {

  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      
      navigate("/callback");
    }
  }, [navigate]);


  return (
    <div className="App">
         <Nav/>
         <Sidebar/>

      <Routes>
        {/* here all the path with the components, to actually diaplay the component and the path you need to event on click to link to this path */}
      <Route path="/" element={<Main />}>
          <Route path="//callback" element={<SpotifyAuth clientId={clientId} />} />
          <Route path="/Playlist/:name" element ={ <PlaylistDisplay/>}/>
        </Route>

      </Routes>
    </div>
   
  );
}

export default App;

