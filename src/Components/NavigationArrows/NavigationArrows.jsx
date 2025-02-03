import React from "react";
import { useNavigate } from "react-router-dom";
import "./navigationArrows.css"

const NavigationArrows = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    const goForward = () => {
        navigate(+1);
    }
    return (
        <div className="navigation-arrow-container">
            <button className="navigation-arrow-btn" onClick={goBack}>&lt;</button>
            <button className="navigation-arrow-btn" onClick={goForward}>&gt;</button>
        </div>
    )
}

export default NavigationArrows