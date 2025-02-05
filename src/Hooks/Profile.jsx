import { createContext, useContext, useEffect, useState } from "react";
import { fetchProfile, getRefreshToken } from "../Components/AuthCallback/script";

const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchAndSetProfile = async () => {
        setLoading(true);
        let accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
            accessToken = await getRefreshToken();
        }

        if (accessToken) {
            const fetchedProfile = await fetchProfile();
            if (fetchedProfile) {
                setProfile(fetchedProfile);
                localStorage.setItem("profileId", fetchedProfile.id);
            } else {
                setProfile(null);
            }
        } else {
            setProfile(null);
        }
        setLoading(false);
    };

    fetchAndSetProfile();
}, []);

if (loading) return <div>Loading...</div>;

    return <ProfileContext.Provider value={profile}>
        {children}
    </ProfileContext.Provider>
}

export const useProfile = () => useContext(ProfileContext)
    


