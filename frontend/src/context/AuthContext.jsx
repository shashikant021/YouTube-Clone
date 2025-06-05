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
        .then(async (res) => {
          setUser(res.data);

          // Fetch the user's channel after setting user
          try {
            const channelRes = await axios.get(
              `/channels/user/${res.data._id}`,
              {
                headers: { Authorization: `JWT ${token}` },
              }
            );
            localStorage.setItem("channelId", channelRes.data._id);
          } catch (err) {
            console.log("No channel found for this user.");
            localStorage.removeItem("channelId");
          }
        })
        .catch(() => {
          setToken(null);
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  const login = (newtoken) => {
    setToken(newtoken);
    localStorage.setItem("token", newtoken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("channelId");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
