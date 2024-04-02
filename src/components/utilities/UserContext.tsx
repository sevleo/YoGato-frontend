import React from "react";
import { useEffect, useState, useContext } from "react";

const UserContext = React.createContext();

export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState("test user");

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
