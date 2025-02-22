import React, { useEffect, useRef } from "react";
import {
  redirectToAuthCodeFlow,
  isUserAuthenticated,
} from "../AuthCallback/script";
import CLIENT_ID from "../AuthCallback/ClientId";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const backgroundVideoRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (await isUserAuthenticated()) {
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
        aria-hidden="true"
      />
      {/* div is redundant, cant keep section with the className, there will be a slight difference in UI but it could be adjusted with CSS */}
      <section className="landing-info-container">
        <video
          className="logo-video"
          src="/assets/ps-logo-video.mp4"
          type="video/mp4"
          autoPlay
          loop
          muted
          aria-label="Pandemic Sound Logo"
        />
        <h1 className="landing-page-description">
          Create, customize, and perfect your playlists using Spotify
          integration. Discover new music and stay updated on trending new
          releases.
        </h1>
        {!accessToken && (
          // update to follow constant convention
          <button onClick={() => redirectToAuthCodeFlow(CLIENT_ID)}>
            Log in with Spotify
          </button>
        )}
      </section>
    </main>
  );
};

export default LandingPage;
