import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/config.js";

const userDataContext = createContext();

export const useUserDataContext = () => useContext(userDataContext);

const AppContext = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("tutorPad"));
  const [userData, setUserData] = useState({});
  const validateconfig = {
    method: "GET",
    url: `${API_URL}user`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    await axios(validateconfig)
      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOut = () => {
    localStorage.removeItem("tutorPad");
  };

  return (
    <userDataContext.Provider value={{ fetchData, userData, logOut }}>
      {children}
    </userDataContext.Provider>
  );
};

export default AppContext;
