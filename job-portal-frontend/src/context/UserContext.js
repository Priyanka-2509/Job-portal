// src/context/UserContext.js
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stores user info like email, role
  const [resumeUrl, setResumeUrl] = useState(""); // optional, for candidates

  return (
    <UserContext.Provider value={{ user, setUser, resumeUrl, setResumeUrl }}>
      {children}
    </UserContext.Provider>
  );
};
