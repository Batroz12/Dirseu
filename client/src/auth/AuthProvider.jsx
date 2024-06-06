import { useContext, createContext, useState, useEffect } from "react";

import { refreshTokenRequest, accessTokenRequest } from "../api/api";

const AuthContext = createContext({
  isAuthenticated: false,
  isAdmin: false,
  getAccesToken: () => {},
  getRefreshToken: () => {},
  saveUser: (userData) => {},
  getUser: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accesToken, setAccesToken] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    checkAuth();
  }, []);

  async function requestNewAccessToken(refreshToken) {
    try {
      const response = await refreshTokenRequest(refreshToken);

      if (response.ok) {
        const json = await response.json();

        if (json.error) {
          throw new Error(json.error);
        }

        return json.accessToken;
      }
      throw new Error(response.statusText);
    } catch (error) {
      console.log("Auth: ".error);
      return null;
    }
  }

  async function getUserInfo(accessToken) {
    try {
      const response = await accessTokenRequest(accessToken);

      if (response.ok) {
        const json = await response.json();

        if (json.error) {
          throw new Error(json.error);
        }

        return json.user;
      }
      throw new Error(response.statusText);
    } catch (error) {
      console.log("Auth: ".error);
      return null;
    }
  }

  async function checkAuth() {
    if (accesToken) {
      //El usuario ya esta autenticado
      const userInfo = await getUserInfo(accesToken);
      if (userInfo) {
        saveSessionInfo(userInfo, accesToken, getRefreshToken());
      }
    }

    //El usuario no esta autenticado
    const token = getRefreshToken();
    if (token) {
      const newAccessToken = await requestNewAccessToken(token);
      if (newAccessToken) {
        const userInfo = await getUserInfo(newAccessToken);
        if (userInfo) {
          saveSessionInfo(userInfo, newAccessToken, token);
          return;
        }
      }
    }
  }

  function signOut() {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setAccesToken("");
    setUser(undefined);
    localStorage.removeItem("token");
  }

  function saveSessionInfo(userInfo, accessToken, refreshToken) {
    setAccesToken(accessToken);
    localStorage.setItem("token", JSON.stringify(refreshToken));
    setIsAuthenticated(true);
    setUser(userInfo);

    if (userInfo.role && userInfo.role === "admin") {
      setIsAdmin(true);
    }
  }

  function getAccesToken() {
    return accesToken;
  }

  function getRefreshToken() {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const token = JSON.parse(tokenData);
      return token;
    }

    return null;
  }

  function saveUser(userData) {
    saveSessionInfo(userData.user, userData.accessToken, userData.refreshToken);
  }

  function getUser() {
    return user;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        getAccesToken,
        saveUser,
        getRefreshToken,
        getUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
