import React, { createContext, useContext, useState } from "react";

// Create the combined context
const UserContext = createContext();

// Hook for consuming the context
export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  // State for login success
  const [loginSuccess, setloginSuccess] = useState(false);
  const [signinSuccess, setsigninSuccess] = useState(false);

  // State for user data
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    profession: "",
    img: "",
    blogs: [],
  });

  return (
    <UserContext.Provider
      value={{
        loginSuccess,
        setloginSuccess,
        userData,
        setUserData,
        setsigninSuccess,
        signinSuccess,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
