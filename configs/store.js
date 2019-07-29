import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext({});

const store = ({ children }) => {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default store;
