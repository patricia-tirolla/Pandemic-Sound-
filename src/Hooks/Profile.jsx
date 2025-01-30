import { createContext, useContext, useEffect, useState } from "react";
import { fetchProfile } from "../Components/AuthCallback/script";

const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
    const [profile, setProfile] = useState(null);
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        (async () => {
          if (token) {
            const fetchedProfile = await fetchProfile(token);
            setProfile(fetchedProfile);
            localStorage.setItem("profileId", fetchedProfile.id);
          }
        })();
      }, [token]);

    return <ProfileContext.Provider value={profile}>
        {children}
    </ProfileContext.Provider>
}

export const useProfile = () => useContext(ProfileContext)
    


