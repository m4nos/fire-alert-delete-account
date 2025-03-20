import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [credentials, setCredentials] = useState(null);

  const setAuthCredentials = (email, password) => {
    setCredentials({ email, password });
  };

  const clearAuthCredentials = () => {
    setCredentials(null);
  };

  return (
    <AuthContext.Provider
      value={{ credentials, setAuthCredentials, clearAuthCredentials }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
