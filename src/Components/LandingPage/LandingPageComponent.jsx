import React, { useEffect, useRef } from "react";
import {
  redirectToAuthCodeFlow,
  isUserAutheticated,
} from "../AuthCallback/script";
import clientId from "../AuthCallback/ClientId";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const backgroundVideoRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (await isUserAutheticated()) {
        navigate("/home");
      }
      if (backgroundVideoRef.current) {
        backgroundVideoRef.current.playbackRate = 0.9;
      }
    })();
  }, [navigate]);

  return (
    <main className="landing-page">
      <video
        className="background-video"
        ref={backgroundVideoRef}
        src="/assets/pandemic-sound-bakcground.mp4"
        type="video/mp4"
        autoPlay
        muted
      />
      <div className="landing-info-container">
        <video
          className="logo-video"
          src="/assets/ps-logo-video.mp4"
          type="video/mp4"
          autoPlay
          loop
          muted
        />
        <h1 className="landing-page-description">
          Create, customize, and perfect your playlists using Spotify
          integration. Discover new music and stay updated on trending new
          releases.
        </h1>
        {!accessToken && (
          <button onClick={() => redirectToAuthCodeFlow(clientId)}>
            Log in with Spotify
          </button>
        )}
      </div>
    </main>
  );
};

export default LandingPage;
