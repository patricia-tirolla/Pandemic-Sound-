import clientId from "./ClientId";

export const redirectToAuthCodeFlow = async (clientId) => {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", `${window.location.origin}/callback`);
    params.append("scope", "user-library-modify user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    window.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const getAccessToken = async (clientId, code) => {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", `${window.location.origin}/callback`);
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
    });

    const response = await result.json();

    localStorage.setItem("access_token", response.access_token);
    if (response.refresh_token) {
        localStorage.setItem("refresh_token", response.refresh_token);
    }

    return response.access_token;
};

export const fetchProfile = async () => {
    let accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
        accessToken = await getRefreshToken(clientId);
        if (!accessToken) {
            return null;
        }
    }

    try {
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (result.status === 401) {
            accessToken = await getRefreshToken(clientId);
            if (!accessToken) return null;

            return await fetchProfile();
        }

        return await result.json();
    } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
};

const generateCodeVerifier = (length) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const generateCodeChallenge = async (codeVerifier) => {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
};

export const isUserAutheticated = async () => {
    let accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
        accessToken = await getRefreshToken(clientId);
    }

    return !!accessToken;
}

export const getRefreshToken = async (clientId) => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return null;

    const url = "https://accounts.spotify.com/api/token";
    const payload = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: clientId,
        }),
    };

    try {
        const response = await fetch(url, payload);
        if (response.status === 400) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.replace("/");
            
        }
        const body = await response.json();

        if (body.access_token) {
            localStorage.setItem("access_token", body.access_token);

            if (body.refresh_token) {
                localStorage.setItem("refresh_token", body.refresh_token);
            }
            return body.access_token;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Failed to refresh token:", error);
        return null;
    }
};