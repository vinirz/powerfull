import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const user = await AuthService.retrieveSession();

      if (user) {
        setUser(user);
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error]);

  async function login(email, password) {
    const loginSuccess = await AuthService.login({ email, password });

    if (loginSuccess.error) {
      const errorMessage = loginSuccess.error.message;
      setError(errorMessage);

      return;
    }

    setUser(loginSuccess.data);

    return loginSuccess.data;
  }

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  return (
    <SessionContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </SessionContext.Provider>
  );
};
