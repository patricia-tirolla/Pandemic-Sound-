import React from "react";
import { useNavigate } from "react-router-dom";
import "./navigationArrows.css";

const NavigationArrows = () => {
  // refactor for readability
  const navigate = useNavigate();

  return (
    <div className="navigation-arrow-container">
      <button className="navigation-arrow-btn" onClick={() => navigate(-1)}>
        &lt;
      </button>
      <button className="navigation-arrow-btn" onClick={() => navigate(1)}>
        &gt;
      </button>
    </div>
  );
};

export default NavigationArrows;
