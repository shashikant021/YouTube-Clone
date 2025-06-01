import axios from "../api/axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      axios
        .get("/auth/me", {
          headers: { Authorization: `JWT ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          // setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        });
    }
    // console.log("Token loaded:", token);
    // console.log("User updated:", user);
  }, [token]);

  const login = (newtoken) => {
    setToken(newtoken);
    localStorage.setItem("token", newtoken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
