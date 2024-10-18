import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');

    return(
        <AuthContext.Provider value={{ token, setToken, userId, setUserId, username, setUsername}}>
            {children}
        </AuthContext.Provider>
    );
};