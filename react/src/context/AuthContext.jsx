import React, { createContext, useCallback, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: null,
  member: null,
  login: () => {},
  logout: () => {},
});

const AUTH_TOKEN_KEY = 'authToken';
const AUTH_MEMBER_KEY = 'authMember';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [member, setMember] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedToken = window.localStorage.getItem(AUTH_TOKEN_KEY);
    const storedMember = window.localStorage.getItem(AUTH_MEMBER_KEY);

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedMember) {
      try {
        const parsed = JSON.parse(storedMember);
        setMember(parsed);
      } catch (error) {
        setMember(null);
      }
    }
  }, []);

  const login = useCallback((newToken, newMember) => {
    setToken(newToken);
    setMember(newMember || null);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(AUTH_TOKEN_KEY, newToken);
      window.localStorage.setItem(AUTH_MEMBER_KEY, JSON.stringify(newMember || null));
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setMember(null);

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
      window.localStorage.removeItem(AUTH_MEMBER_KEY);
    }
  }, []);

  const value = {
    token,
    member,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  return context;
}
