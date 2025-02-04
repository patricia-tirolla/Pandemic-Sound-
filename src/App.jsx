
import { Route, Routes } from "react-router-dom";
import React from "react";
import Main from "./Components/Main/Main";

import GetNewReleases from "./Components/Homepage/GetNewReleases";
import PlaylistDisplay from "./Components/PlaylistDisplay/PlaylistDisplay";
import AuthCallback from "./Components/AuthCallback/AuthCallbackComponent";
import LandingPage from "./Components/LandingPage/LandingPageComponent";
import SearchPage from "./Components/SearchPage/SearchPageComponent";
import Song from "./Components/Song/Song";
import ErrorPage from "./Components/404/ErrorPage"
import "./styles/reset.css";
import "./styles/App.css";

function App() {
  return (

    <Routes>
      <Route path="/welcome" element={<LandingPage />} />
      <Route path="/callback" element={<AuthCallback />} />
        <Route element={<Main />}>
          <Route path="/" element={<GetNewReleases />} />
          <Route path="playlist/:playlistId" element={<PlaylistDisplay />} />
          <Route path="track/:trackId" element={<Song />}/>
          <Route path="search" element={<SearchPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
