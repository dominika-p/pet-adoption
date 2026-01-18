import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("volunteer");
    return savedUser ? JSON.parse(savedUser) : null;
  });

 
  useEffect(() => {
    if (user) {
      localStorage.setItem("volunteer", JSON.stringify(user));
    } else {
      localStorage.removeItem("volunteer");
    }
  }, [user]);


  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
