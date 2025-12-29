import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/auth.api";

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: "LEARNER" | "SHERPA" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await authApi.login({ email, password });

      localStorage.setItem("access_token", res.accessToken);
      localStorage.setItem("auth_user", JSON.stringify(res.user));

      setUser(res.user);
    } catch (err: any) {
      throw err; // 🔥 ném lỗi cho page
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const res = await authApi.register({
        displayName: name,
        email,
        password,
      });

      localStorage.setItem("access_token", res.accessToken);
      localStorage.setItem("auth_user", JSON.stringify(res.user));

      setUser(res.user);
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggedIn: !!user,
        login,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
