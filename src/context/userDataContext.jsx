import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the combined context
const UserContext = createContext();

// Hook for consuming the context
export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  // State for login success and username
  const [loginSuccess, setloginSuccess] = useState(false);
  const [username, setUsername] = useState("");

  // State for user data
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    profession: "",
    img: "",
    blogs: [],
  });

  // Fetch user data when username changes and login is successful
  useEffect(() => {
    if (loginSuccess && username) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_PATH}/api/user/userInfo/${username}`
          );
          setUserData({
            name: response.data.userInfo.name,
            username: response.data.userInfo.username,
            email: response.data.userInfo.email,
            profession: response.data.userInfo.profession,
            img: response.data.userInfo.img,
            blogs: response.data.userInfo.blogs,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [loginSuccess, username]);

  return (
    <UserContext.Provider
      value={{
        loginSuccess,
        setloginSuccess,
        username,
        setUsername,
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
