import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("emart_user")) || null; }
    catch { return null; }
  });

  useEffect(() => {
    localStorage.setItem("emart_user", JSON.stringify(user));
  }, [user]);

  const signIn = (nameOrEmail) => setUser({ name: nameOrEmail });
  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


