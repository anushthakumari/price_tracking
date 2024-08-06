import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUserData = localStorage.getItem("userData");
        return storedUserData
          ? JSON.parse(storedUserData)
          : {
              firstName: "",
              lastName: "",
              email: "",
              username: "",
            };
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        return {
          token: "",
          firstName: "",
          lastName: "",
          email: "",
          username: "",
        };
      }
    } else {
      return {
        token:"",
        firstName: "",
        lastName: "",
        email: "",
        username: "",
      };
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("userData", JSON.stringify(userData));
      } catch (error) {
        console.error("Failed to save user data to localStorage", error);
      }
    }
    console.log(userData);
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
