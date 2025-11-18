import { useState } from "react";
import { login } from "../services/authService";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  const handleLogin = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const loggedInUser = await login(username, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, loading, error, handleLogin, handleLogout };
};
