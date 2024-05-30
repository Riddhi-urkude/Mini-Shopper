import React, { Children, createContext, useEffect, useState } from 'react'
import apiService from '../services/apiService';

const AuthContext = createContext();

export const AuthProvider = ({ Children }) => {
    const [user, setUser] = useState(null);

    const login = async (userId, password) => {
        const response = await apiService.login(userId, password);
        setUser(response.data);
    };

    const logout = () => {
        setUser(null);
    };

    useEffect(() => {
        // check if user is already logged in
        const storedUser = localStorage.getItem('user');
        if(storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if(user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
        {Children}
    </AuthContext.Provider>
  );
};

export default AuthContext
