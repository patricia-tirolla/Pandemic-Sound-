import { redirectToAuthCodeFlow, getAccessToken } from "./script";
// update import to follow constant convention
import CLIENT_ID from "./ClientId";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authFlow = async () => {
      // can be simplified to one line
      const code = new URLSearchParams(window.location.search).get("code");
      if (!code) {
        redirectToAuthCodeFlow(CLIENT_ID);
      } else {
        try {
          // update to follow constant convention
          let accessToken = await getAccessToken(CLIENT_ID, code);
          if (!localStorage.getItem("access_token")) {
            localStorage.setItem("access_token", accessToken);
          }

          navigate("/home");
        } catch (err) {
          console.error("Error during authentication:", err);
        }
      }
    };

    authFlow();
  }, [navigate]);

  // should return null if there is no JSX to return
  return null;
};

export default AuthCallback;
