import { redirectToAuthCodeFlow, getAccessToken } from "./script";
import clientId from "./ClientId";
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
                        localStorage.setItem("accessToken", accessToken);
                    }

                    navigate("/");
                } catch (err) {
                    console.error("Error during authentication:", err);
                }
            }
        };

        authFlow();
    }, [navigate]);
}

export default AuthCallback