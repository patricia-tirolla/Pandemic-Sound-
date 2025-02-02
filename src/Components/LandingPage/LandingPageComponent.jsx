import React, { useEffect } from "react"
import { redirectToAuthCodeFlow, isUserAutheticated } from "../AuthCallback/script";
import clientId from "../AuthCallback/ClientId";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"

const LandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserAutheticated()) {
            navigate("/home");
        }
    }, [navigate]);

    return (
        <main className="landing-page">
            <h1 className="landing-page-title">Welcome to Pandemic Sound!</h1>
            {!isUserAutheticated() &&
                <button onClick={() => redirectToAuthCodeFlow(clientId)}>Loging to Spotify</button>
            }
        </main>
    )
}

export default LandingPage