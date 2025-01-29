import { redirectToAuthCodeFlow, getAccessToken, clientId } from "./script";
import { useEffect } from "react"
import { useNavigate } from "react-router";

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const authFlow = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            if (!code) {
                redirectToAuthCodeFlow(clientId);
            } else {
                try {
                    let accessToken = await getAccessToken(clientId, code);
                    if (!localStorage.getItem("accessToken")) {
                        console.log("access token = " + accessToken)
                        localStorage.setItem("accessToken", accessToken);
                    }

                    navigate("/home");
                } catch (err) {
                    console.error("Error during authentication:", err);
                }
            }
        };

        authFlow();
    }, [navigate]);
}

export default AuthCallback