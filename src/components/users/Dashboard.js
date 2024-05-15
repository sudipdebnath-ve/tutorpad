import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import study from "./assets/images/study.png";
import createAccount from "./assets/images/create-account.png";
import createInvoice from "./assets/images/create-invoice.png";
import addStudent from "./assets/images/add-student.png";
import scheduleEvent from "./assets/images/schedule-event.png";
import youGotIt from "./assets/images/got-it.png";
import eventIcon from "./assets/images/event.svg";
import paymentIcon from "./assets/images/payment.svg";
import projectIcon from "./assets/images/project.svg";
import activeIcon from "./assets/images/active-student.svg";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import { storeToken } from '../../utils/helper.js';
import LanguageOption from "../LanguageOption.js";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useTokenStorage } from '../../utils/helper.js';
import { AuthContext } from '../registerLogin/AuthContext.js';
import BusinessDashboard from './BusinessDashboard.js';
import TutorDashboard from './TutorDashboard.js';
import StudentDashboard from './StudentDashboard.js';


const Dashboard = () => {
  const { userData, fetchData, sidebarToggle } = useUserDataContext();
  const { role, setRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation()
  const storeToken = useTokenStorage();

  useEffect(() => {
    //get token and domain from url and set it into localstorage
      getTokenData();
  }, []);

  const getTokenData = async () => {

    // Get hash fragment from URL //use params
    const hash = window.location.hash;

    // Check if hash fragment is empty or doesn't contain parameters
    if (!hash || hash.indexOf('#') === -1) {
      return; // Exit the function early if parameters are not present
    }

    // Remove the '#' character
    const hashWithoutSharp = hash.slice(1);

    // Split the hash fragment into token and domain
    const [encodedToken, encodedDomain, encodedRole] = hashWithoutSharp.split('#');

    // Decode the encoded values
    var token = decodeURIComponent(encodedToken);
    var domain = decodeURIComponent(encodedDomain);
    var role = decodeURIComponent(encodedRole);

    //store token in localstorage
    storeToken(token, domain, role);

    // Optionally, you may want to clear the hash fragment after reading it
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  return (
    <div className="wrapper">
      {sidebarToggle ? (
        <>
          <MiniSidebar />
        </>
      ) : (
        <>
          <Sidebar />
        </>
      )}

      <div className="main main-content">
      
        <TopBar />

        <main className="content">
          { role === `${process.env.REACT_APP_BUSINESS_ROLE}` ?
            <BusinessDashboard /> : role === `${process.env.REACT_APP_TUTOR_ROLE}` ?  
            <TutorDashboard /> : role === `${process.env.REACT_APP_TUTOR_ROLE}` ?  
            <StudentDashboard /> : 'User Not Found!'
          }
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
