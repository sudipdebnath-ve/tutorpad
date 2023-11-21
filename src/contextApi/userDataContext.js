import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/config.js";
import { useNavigate } from "react-router-dom";

const userDataContext = createContext();

export const useUserDataContext = () => useContext(userDataContext);

const AppContext = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [emailTemplateData, setEmailTemplateData] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem("tutorPad"));
    const validateconfig = {
      method: "GET",
      url: `${API_URL}user`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
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

  const emailTemplate = async () => {
    const token = JSON.parse(localStorage.getItem("tutorPad"));
    const validateconfig = {
      method: "GET",
      url: `${API_URL}user/ets`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        // console.log(response.data);
        if (response.data.success === true) {
          setEmailTemplateData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOut = () => {
    localStorage.removeItem("tutorPad");
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  return (
    <userDataContext.Provider
      value={{
        fetchData,
        userData,
        logOut,
        sidebarToggle,
        setSidebarToggle,
        emailTemplate,
        emailTemplateData,
      }}
    >
      {children}
    </userDataContext.Provider>
  );
};

export default AppContext;
