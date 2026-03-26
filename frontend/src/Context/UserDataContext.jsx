import React, { createContext, useState, useContext } from "react";

export const UserDataContext = createContext(null);

export function UserDataProvider({ children }) {
  const [user,setuser] = useState(null);
  const [saveReels,setsaveReels] = useState([]);

  return (

    <UserDataContext.Provider value={{ user, setuser,saveReels,setsaveReels }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
}

