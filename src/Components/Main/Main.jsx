import "./main.css"
import SpotifyAuth from '../../Api-auth/ApiAuthComponent';
import {Route} from "react-router-dom"
import { Outlet } from 'react-router-dom';

function Main() {




  // const clientId = "bab8a1bc1b6348759c3cd4efb8b959e9";
  return (
    <div className="main">
     
     {/* <Route path="/callback" element={<SpotifyAuth clientId={clientId} />} /> */}
      {/* <SpotifyAuth clientId={clientId} /> */}
      <Outlet />
    </div>
  );
}
export default Main;