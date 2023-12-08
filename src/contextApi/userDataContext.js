import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/config.js";
import { useNavigate } from "react-router-dom";

const userDataContext = createContext();

export const useUserDataContext = () => useContext(userDataContext);
const token = JSON.parse(localStorage.getItem("tutorPad"));

const AppContext = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState("");
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [emailTemplateData, setEmailTemplateData] = useState([]);
  const [emailOnchange, setEmailOnchange] = useState(false);
  const [studentData, setStudentData] = useState(false);
  const [emailData, setEmailData] = useState({
    template_title: "",
    template_content: "",
  });

  const navigate = useNavigate();

  const fetchData = async () => {
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
          setUserId(response.data.id);
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

  // Email Template start
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

  const handleEmailTemplate = async (e) => {
    const token = JSON.parse(localStorage.getItem("tutorPad"));
    if (e.target.value === 0) {
      setEmailOnchange(false);
    } else {
      setEmailOnchange(true);
    }
    const validateconfig = {
      method: "GET",
      url: `${API_URL}user/et/${e.target.value}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        // console.log(response.data);
        if (response.data.success === true) {
          setEmailData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Email Template emd

  const fetchStudentData = async () => {
    const validateconfig = {
      method: "GET",
      url: `${API_URL}user/get-students?user_id=${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        console.log(response.data);
        if (response.data.success === true) {
          console.log(response.data);
          setStudentData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
        handleEmailTemplate,
        emailOnchange,
        emailData,
        setEmailData,
        token,
        fetchStudentData,
        studentData,
        userId,
      }}
    >
      {children}
    </userDataContext.Provider>
  );
};

export default AppContext;
