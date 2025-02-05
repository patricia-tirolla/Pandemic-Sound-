import "./errorPage.css"
import { Link } from "react-router-dom";

const ErrorPage =()=> {
    return (
      <main className="error-container">
      <section className="error-content">
          <h2 className="error-page-title">404! Page cannot be found &#9785;</h2>
          
          <nav className="error-navigation">
              <Link to="/home" className="error-page-link-home">
                  Return to Pandemic Sound
              </Link>
          </nav>
      </section>
    </main>
    );
  }
  
  export default ErrorPage;
  