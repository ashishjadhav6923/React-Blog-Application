import React, { useState } from "react";

const logInContext = React.createContext();

const LogInContextProvider = ({ children }) => {
  const [loginSuccess, setloginSuccess] = useState(false);
  const [profileName, setprofileName] = useState("");
  return (
    <logInContext.Provider
      value={{ loginSuccess, setloginSuccess, setprofileName, profileName }}
    >
      {children}
    </logInContext.Provider>
  );
};

export default LogInContextProvider;
export { logInContext };
