import React, { createContext, useState , type JSX } from "react";
import { useCookies } from "react-cookie";

interface UserSession {
    id: string;
    email: string;
}

export interface AppContextType {
  setSession: (token: string) => void;
  getSession: () => string | null;
  setUserData: (userData: UserSession | undefined) => void;
  getUserData: () => UserSession | undefined;
  logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider = ({ children }: AppContextProviderProps): JSX.Element => {

    const [cookies, setCookie, removeCookie] = useCookies<"appToken">(["appToken"]);
    interface UserSession {
        id: string;
        email: string;
    }

    const [userSessionData, setUserSessionData] = useState<UserSession | undefined>(undefined);
    const setSession = (token: string): void => {
            setCookie("appToken", token, {
            path: "/",
            maxAge: 900, // 15 minutes
         });
        };

    const getSession = (): string | null => {
  const token: string | null = cookies.appToken || null;
  return token;
};

    const setUserData = (userData: UserSession): void => setUserSessionData(userData);

    const getUserData = (): UserSession | undefined => userSessionData;

    const logout = (): void => {
    removeCookie("appToken", { path: "/" });
  setUserData(undefined); 
};

    return (
      <AppContext.Provider
        value={{
          setSession,
          getSession,
          setUserData,
          getUserData,
          logout,
        }}
      >
        {children}
      </AppContext.Provider>
    );
};

export { AppContext };
export default AppContextProvider;