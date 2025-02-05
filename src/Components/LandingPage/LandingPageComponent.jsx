import React, { useEffect } from "react"
import { redirectToAuthCodeFlow, isUserAutheticated } from "../AuthCallback/script";
import clientId from "../AuthCallback/ClientId";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"

const LandingPage = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("access_token");

    useEffect(() => {
        (async () => {
            if (await isUserAutheticated()) {
                navigate("/home");
            }
        })();
    }, [navigate]);

    return (
        <main className="landing-page">
            <h1 className="landing-page-title">Welcome to Pandemic Sound!</h1>
            {!accessToken &&
                <button onClick={() => redirectToAuthCodeFlow(clientId)}>Log in with Spotify</button>
            }
        </main>
    )
}

export default LandingPage