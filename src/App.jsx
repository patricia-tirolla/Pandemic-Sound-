import { Routes, Route } from "react-router";
import Main from './Components/Main/Main';
import AuthCallback from "./Components/AuthCallback/AuthCallbackComponent";
import LandingPage from "./Components/LandingPage/LandingPageComponent";
import SearchPage from "./Components/SearchPage/SearchPageComponent";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/callback" element={<AuthCallback />} />
        <Route path="/home" element={<Main />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </>

  );
}

export default App;

