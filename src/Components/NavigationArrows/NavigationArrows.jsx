import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationArrows = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    const goForward = () => {
        navigate(+1);
    }
    return (
        <div>
            <button onClick={goBack}>&lt;</button>
            <button onClick={goForward}>&gt;</button>
        </div>
    )
}

export default NavigationArrows