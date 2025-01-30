import React from "react"
import "./nav.css";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/home");
  };


    return (
      <div className="Nav">
        <h1 className="logo">Pandemic Sound</h1>
        <button onClick={handleButtonClick}>Go to Home</button>

      </div>
    );
  }
  
  export default Nav;