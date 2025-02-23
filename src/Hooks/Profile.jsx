import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchProfile,
  getRefreshToken,
} from "../Components/AuthCallback/script";

const ProfileContext = createContext();

// context provider is not a hook

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetProfile = async () => {
      setLoading(true);

      //   can be simplified to one line
      let accessToken =
        localStorage.getItem("access_token") || (await getRefreshToken());

      if (accessToken) {
        const fetchedProfile = await fetchProfile();
        //   can be refactored to
        setProfile(fetchedProfile || null);
        if (fetchedProfile) {
          localStorage.setItem("profileId", fetchedProfile.id);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    };

    fetchAndSetProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
