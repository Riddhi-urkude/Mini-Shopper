import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import apiService from '../../services/apiService';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await apiService.getUserProfile(user.id);
            setProfile(response.data);
        };
        if (user) {
            fetchProfile();
        }
    }, [user]);

    if (!profile) return <div>Loading...</div>

  return (
    <div>
        <h1>Welcom, {profile.userId}</h1>
      
    </div>
  );
};

export default Profile
