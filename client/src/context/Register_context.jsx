import { useContext, createContext, useState, useEffect } from "react";

const RegisterContext = createContext({
  userData: {},
  setUserData: () => {},
});

export function RegisterProvider({ children }) {
  const [userData, setUserData] = useState();

  return (
    <RegisterContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export const useRegister = () => {
  const context = useContext(RegisterContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
