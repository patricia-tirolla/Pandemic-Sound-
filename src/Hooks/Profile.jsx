import { createContext, useContext, useEffect, useState } from "react";
import { fetchProfile } from "../Components/AuthCallback/script";

const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
    const [profile, setProfile] = useState(null);
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        (async () => {
          if (accessToken) {
            const fetchedProfile = await fetchProfile(accessToken);
            setProfile(fetchedProfile);
            localStorage.setItem("profileId", fetchedProfile.id);
          }
        })();
      }, [accessToken]);

    return <ProfileContext.Provider value={profile}>
        {children}
    </ProfileContext.Provider>
}

export const useProfile = () => useContext(ProfileContext)
    


