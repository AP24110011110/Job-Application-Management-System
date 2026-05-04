import { createContext, useContext, useMemo, useState } from "react";
import api from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    const stored = localStorage.getItem("talentflow_user");
    return stored ? JSON.parse(stored) : null;
  });

  async function login(credentials) {
    const { data } = await api.post("/auth/login", credentials);
    localStorage.setItem("talentflow_user", JSON.stringify(data));
    setSession(data);
  }

  async function register(payload) {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("talentflow_user", JSON.stringify(data));
    setSession(data);
  }

  function logout() {
    localStorage.removeItem("talentflow_user");
    setSession(null);
  }

  const value = useMemo(() => ({ session, login, register, logout }), [session]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
