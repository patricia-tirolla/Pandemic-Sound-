import CLIENT_ID from "./ClientId";

export const redirectToAuthCodeFlow = async (clientId) => {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  // can be simplified to
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: `${window.location.origin}/callback`,
    scope:
      "user-library-modify user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private",
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  window.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const getAccessToken = async (clientId, code) => {
  const verifier = localStorage.getItem("verifier");

  // can be simplified to
  const params = new URLSearchParams({
    client_id: clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: `${window.location.origin}/callback`,
    code_verifier: verifier,
  });

  // can be simplified to
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  }).then((res) => res.json());

  localStorage.setItem("access_token", response.access_token);
  if (response.refresh_token) {
    localStorage.setItem("refresh_token", response.refresh_token);
  }

  return response.access_token;
};

export const fetchProfile = async () => {
  // can be refactored and simplified
  let accessToken =
    localStorage.getItem("access_token") || (await getRefreshToken(CLIENT_ID));
  if (!accessToken) return null;

  try {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (result.status === 401) {
      accessToken = await getRefreshToken(CLIENT_ID);
      if (!accessToken) return null;

      return await fetchProfile();
    }

    return await result.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

// can be refactored
const generateCodeVerifier = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((x) => possible[x % possible.length])
    .join("");
};

const generateCodeChallenge = async (codeVerifier) => {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

// can be refactored and simplified
export const isUserAuthenticated = async () => {
  let accessToken =
    localStorage.getItem("access_token") || (await getRefreshToken(CLIENT_ID));
  return !!accessToken;
};

export const getRefreshToken = async (clientId) => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return null;

  // can be refactored for better readability
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
  });

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    }).then((res) => res.json());

    if (response.access_token) {
      localStorage.setItem("access_token", response.access_token);
      if (response.refresh_token) {
        localStorage.setItem("refresh_token", response.refresh_token);
      }
      return response.access_token;
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.replace("/");
      return null;
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};
