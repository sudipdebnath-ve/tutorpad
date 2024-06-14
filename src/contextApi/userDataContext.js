import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/config.js";
import { useNavigate } from "react-router-dom";

const userDataContext = createContext();

export const useUserDataContext = () => useContext(userDataContext);

const AppContext = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState("");
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [emailTemplateData, setEmailTemplateData] = useState([]);
  const [emailOnchange, setEmailOnchange] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [privileges, setPrivileges] = useState([]);
  const [studentGroupData, setStudentGroupData] = useState(false);
  const [tutorData, setTutorData] = useState(false);
  const [allChargeCategory, setAllChargeCategory] = useState([]);
  const [allFamilies, setAllFamilies] = useState([]);
  const [accountInvoices, setAccountInvoices] = useState([]);
  const [allInvoicesByDate, setAllInvoicesByDate] = useState([]);
  const [allTutors, setAllTutors] = useState([]);
  const [getAvailabilityData, setGetAvailabilityData] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allLocation, setAllLocation] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [emailData, setEmailData] = useState({
    template_title: "",
    template_content: "",
  });
  const [allTransactionsByFamily, setAllTransactionsByFamily] = useState([]);
  const [allTransactionsByDates, setAllTransactionsByDates] = useState([]);
  const storedMode = localStorage.getItem("isDarkMode");
  const initialMode = storedMode ? JSON.parse(storedMode) : false;
  const [isDarkMode, setIsDarkMode] = useState(initialMode);

  const [token, setToken] = useState(JSON.parse(localStorage.getItem("tutorPad")));

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Store mode in localStorage
      localStorage.setItem("isDarkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  const theme = isDarkMode ? "dark" : "light";

  useEffect(() => {
    document?.documentElement?.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDarkMode]);

  
  // manageSidebar navbar navbar-expand
  useEffect(() => {
    if(sidebarToggle){
      const element = document.querySelector('.wrapperBody');
      if (element) {
        element.classList.add('manageSidebar');
      }
  
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.add('manageNavbar');
      }
    }else{
      const element = document.querySelector('.wrapperBody');
      if (element) {
        element.classList.remove('manageSidebar');
      }

      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.remove('manageNavbar');
      }
    }
    
  }, [sidebarToggle]);

  const navigate = useNavigate();

  const fetchData = async () => {
    console.log('call fetch data');
  };

  // getDashboardData
  const getDashboardData = async () => {
    const validateconfig = {
      method: "GET",
      url: `${API_URL}data`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        // console.log(response.data);
        if (response.data.success === true) {
          setDashboardData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //getPrivileges
  const getPrivileges = async () => {
    const validateconfig = {
      method: "GET",
      url: `${API_URL}all-permissions`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        // console.log(response.data);
        if (response.data.success === true) {
          setPrivileges(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //getStudentStatus
  const getStudentStatus = async () => {
    const validateconfig = {
      method: "GET",
      url: `${API_URL}student-statuses`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        console.log('test :',response.data);
        if (response.data.success === true) {
          setStatusList(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOut = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  // Email Template start
  const emailTemplate = async () => {
    const token = JSON.parse(localStorage.getItem("tutorPad"));
    const validateconfig = {
      method: "GET",
      url: `${API_URL}ets`,
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
      url: `${API_URL}et/${e.target.value}`,
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
      url: `${API_URL}get-students?user_id=${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        // console.log(response.data);
        if (response.data.success === true) {
          setStudentData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchStudentGroupData = async () => {
    const validateconfig = {
      method: "GET",
      url: `${API_URL}student-groups`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        // console.log(response.data);
        if (response.data.success === true) {
          console.log('setstudentGroupData : ',response.data.data)
          setStudentGroupData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchTutorData = async () => {
    const validateconfig = {
      method: "GET",
      url: `${API_URL}tutors`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        // console.log(response.data);
        if (response.data.success === true) {
          setTutorData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchChargeCategory = async () => {
    const validateconfig = {
      method: "GET",
      url: `${API_URL}chargecats`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        // console.log(response.data);
        if (response.data.success === true) {
          setAllChargeCategory(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchFamilies = async () => {
    const familyToken = JSON.parse(localStorage.getItem("tutorPad"));
    console.log("token.................", familyToken);
    const validateconfig = {
      method: "GET",
      url: `${API_URL}family-accounts`,
      headers: {
        Authorization: `Bearer ${familyToken}`,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        // console.log(response.data);
        if (response.data.success === true) {
          setAllFamilies(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchInvoices = async (id) => {
    const validateconfig = {
      method: "GET",
      url: `${API_URL}account-invoices/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        // console.log(response.data);
        if (response.data.success === true) {
          setAccountInvoices(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchInvoicesByDate = async (date_from, date_to) => {
    const validateconfig = {
      method: "GET",
      url: `${API_URL}invoices?date_from=${date_from}&date_to=${date_to}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        // console.log(response.data);
        if (response.data.success === true) {
          setAllInvoicesByDate(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Availability start

  const allAvailabilityData = async () => {
    const config = {
      method: "GET",
      url: `${API_URL}get-availabilities`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(config)
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          setGetAvailabilityData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Availability end

  //Tutor

  const getTutor = async () => {
    const config = {
      method: "GET",
      url: `${API_URL}tutors`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(config)
      .then((response) => {
        // console.log(response);
        if (response.data.success === true) {
          setAllTutors(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Calendar Events Start

  // const fetchEvent = async () => {
  //   const config = {
  //     method: "GET",
  //     url: `${API_URL}events`,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   await axios(config)
  //     .then((response) => {
  //       console.log(response.data.data);
  //       setAllEvents(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const fetchEvent = async (startDate, endDate) => {
    const config = {
      method: "GET",
      url: `${API_URL}events?start_date=${startDate}&end_date=${endDate}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(config)
      .then((response) => {
        setAllEvents(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Calendar Events End

  // Event Category

  const fetchCategory = async () => {
    const config = {
      method: "GET",
      url: `${API_URL}eventcats`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(config)
      .then((response) => {
        setAllCategory(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchLocation = async () => {
    const config = {
      method: "GET",
      url: `${API_URL}eventlocs`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(config)
      .then((response) => {
        setAllLocation(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchTransactionsByFamily = async (id) => {
    const validateconfig = {
      method: "GET",
      url: `${API_URL}account-transactions/` + id,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        // console.log(response.data);
        if (response.data.success === true) {
          console.log("response-----------", response);
          setAllTransactionsByFamily(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchTransactionsByDates = async (fromDate, toDate) => {
    const validateconfig = {
      method: "GET",
      url: `${API_URL}transactions?date_from=${fromDate}&date_to=${toDate}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        // console.log(response.data);
        if (response.data.success === true) {
          setAllTransactionsByDates(response.data.data);
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
        setUserData,
        logOut,
        sidebarToggle,
        setSidebarToggle,
        emailTemplate,
        emailTemplateData,
        handleEmailTemplate,
        emailOnchange,
        emailData,
        setEmailData,
        getStudentStatus,
        statusList,
        token,
        setToken,
        fetchStudentData,
        fetchStudentGroupData,
        studentGroupData,
        studentData,
        tutorData,
        userId,
        setUserId,
        allAvailabilityData,
        getAvailabilityData,
        privileges,
        getPrivileges,
        allTutors,
        getTutor,
        fetchEvent,
        allEvents,
        fetchTutorData,
        fetchCategory,
        allCategory,
        fetchLocation,
        allLocation,
        fetchChargeCategory,
        allChargeCategory,
        allFamilies,
        setAllFamilies,
        fetchFamilies,
        fetchInvoices,
        dashboardData,
        getDashboardData,
        accountInvoices,
        allTransactionsByFamily,
        fetchTransactionsByFamily,
        allTransactionsByDates,
        fetchTransactionsByDates,
        fetchInvoicesByDate,
        allInvoicesByDate,
        allTransactionsByDates,
        fetchTransactionsByDates,
        isDarkMode,
        setIsDarkMode,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </userDataContext.Provider>
  );
};

export default AppContext;
