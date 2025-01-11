import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadAuthData = async () => {
      const storedAuth = await AsyncStorage.getItem("auth");
      const storedUser = await AsyncStorage.getItem("user");
      const storedToken = await AsyncStorage.getItem("token");

      setIsAuthenticated(storedAuth === "true");
      setUser(storedUser);
      setToken(storedToken);
    };
    loadAuthData();
  }, []);

  const login = async (userData: string, tokenData: string) => {
    await AsyncStorage.setItem("auth", "true");
    await AsyncStorage.setItem("user", userData);
    await AsyncStorage.setItem("token", tokenData);

    setIsAuthenticated(true);
    setUser(userData);
    setToken(tokenData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("auth");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");

    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
