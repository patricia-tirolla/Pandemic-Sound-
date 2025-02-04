
import { Route, Routes } from "react-router-dom";
import React from "react";
import Layout from "./Components/Layout/Layout";
import { Navigate } from "react-router-dom";
import Homepage from "./Components/Layout/Outlet/Homepage/Homepage";
import PlaylistPage from "./Components/Layout/Outlet/PlaylistPage/PlaylistPage";
import AuthCallback from "./Components/AuthCallback/AuthCallbackComponent";
import LandingPage from "./Components/LandingPage/LandingPageComponent";
import SearchPage from "./Components/Layout/Outlet/SearchPage/SearchPageComponent";
import Song from "./Components/Layout/Outlet/SongPage/SongPage";
import ErrorPage from "./Components/404/ErrorPage"
import "./styles/reset.css";
import "./styles/App.css";

function App() {
  return (

    <Routes>
      <Route path="/welcome" element={<LandingPage />} />
      <Route path="/callback" element={<AuthCallback />} />
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/welcome" replace />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="playlist/:playlistId" element={<PlaylistPage />} />
        <Route path="track/:trackId" element={<Song />} />
        <Route path="search" element={<SearchPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
