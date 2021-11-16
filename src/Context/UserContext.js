import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { URL } from 'src/config';
import axios from 'axios';

export const UserContext = createContext(null);

const setAuthHeader = () => {
  const getToken = JSON.parse(localStorage.getItem('currentUser')).token;
  axios.defaults.headers.common['Authorization'] = `Bearer ${getToken}`;
};

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    axios.defaults.headers.common['Authorization'] = undefined;
    navigate(`${URL}/login`);
  };

  useEffect(() => {
    if (!currentUser & !localStorage.getItem('currentUser')) {
      return;
    }

    if (localStorage.getItem('currentUser') && !currentUser) {
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
      setAuthHeader();
    }

    if (currentUser && !localStorage.getItem('currentUser')) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      setAuthHeader();
    }

    if (currentUser && localStorage.getItem('currentUser')) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};

export default UserProvider;
