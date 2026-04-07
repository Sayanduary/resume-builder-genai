import { useContext } from "react";
import { AuthContext } from "../services/auth.context";
import { login, register, logout } from "../services/api.auth";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  const { User, setUser, Loading, setLoading } = context;

  /* ================= LOGIN ================= */
  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });

      if (!data || !data.user) {
        throw new Error("Invalid login response");
      }

      setUser(data.user);

    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= REGISTER ================= */
  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });

      if (!data || !data.user) {
        throw new Error("Data Not Found");
      }

      setUser(data.user);

    } catch (error) {
      console.error(
        "REGISTER ERROR:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogOut = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error(
        "LOGOUT ERROR:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    User,
    Loading,
    handleLogOut,
    handleLogin,
    handleRegister,
  };
};