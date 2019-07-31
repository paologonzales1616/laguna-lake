import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext({});

const store = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const admin = localStorage.getItem("admin");

    if (name && email && token) {
      setUser({ name, email, token, admin });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default store;