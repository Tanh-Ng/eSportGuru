import { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider?: "email" | "google" | "facebook";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  socialLogin: (provider: "google" | "facebook") => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("auth_user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Placeholder: simulate login
      if (email && password) {
        const newUser: User = {
          id: Math.random().toString(36).substring(7),
          name: email.split("@")[0],
          email,
          provider: "email",
        };
        setUser(newUser);
        localStorage.setItem("auth_user", JSON.stringify(newUser));
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Placeholder: simulate signup
      if (name && email && password) {
        const newUser: User = {
          id: Math.random().toString(36).substring(7),
          name,
          email,
          provider: "email",
        };
        setUser(newUser);
        localStorage.setItem("auth_user", JSON.stringify(newUser));
      }
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (provider: "google" | "facebook") => {
    setLoading(true);
    try {
      // Placeholder: simulate social login
      const mockEmails = {
        google: "user@gmail.com",
        facebook: "user@facebook.com",
      };
      const newUser: User = {
        id: Math.random().toString(36).substring(7),
        name: `${provider} User`,
        email: mockEmails[provider],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
        provider,
      };
      setUser(newUser);
      localStorage.setItem("auth_user", JSON.stringify(newUser));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggedIn: !!user,
        login,
        signUp,
        socialLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
