import "./errorPage.css"
import { Link } from "react-router-dom";

const ErrorPage =()=> {
    return (
      <main className="error-container">
        <h2 className="error-page-title">404! Page cannot be found :(</h2>
        <Link to="/home" className="error-page-link-home">
             <h3>Go back to Pandemic Sound</h3>
            </Link>
      </main>
    );
  }
  
  export default ErrorPage;
  