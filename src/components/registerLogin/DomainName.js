import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgimage from "../../assets/images/bg.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NON_LOGGED_IN_API_URL } from "../../utils/config.js";
import axios from "axios";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import LanguageOption from "../LanguageOption.js";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { getDomainName, validateDomainName } from "../../services/loginService.js";
import "./style.css";
import { checkAuthAndRedirect } from '../../utils/helper.js';


const DomainRegister = () => {

  const { t } = useTranslation();
  const { fetchData, setIsDarkMode } = useUserDataContext();
  const navigate = useNavigate();
  const [userdetails, setUserdetails] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [centralPortalDomain, setCentralPortalDomain] = useState("");
  const [domain, setDomain] = useState ("");
  const [errorMessage, setErrorMessage] = useState("");

  const getDomainNameHandler  =  async() => {
    const res =  await getDomainName();
    console.log("Domain name ----------", res);
    setCentralPortalDomain(res?.data)
    console.log("Central portal domain ----------", centralPortalDomain);
  };

  const handleDomainChange = async () => {
    var fullDomain = `${domain}.${process.env.REACT_APP_DOMAIN}`;
    const data = {
      domain: `${domain}.${process.env.REACT_APP_DOMAIN}`,
    };
    try {
      const response = await validateDomainName(data);
      if (response && response.success) {
        localStorage.setItem("domain", fullDomain);
        return response.success;
      } else {
        setErrorMessage(response.data.domain);
        return false;
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
        const domainExists = await handleDomainChange();
        if(domainExists) {
          window.location.href = `http://${domain}.${process.env.REACT_APP_DOMAIN}/signin`; 
        }
      
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };
  
  const handleClick = (e) => {
    i18next.changeLanguage(e.target.value);
  };

  useEffect(() => {
    document?.documentElement?.setAttribute("data-theme", "light");
    setIsDarkMode(false);
    localStorage.setItem("theme", "light");
    getDomainNameHandler()
    checkAuthAndRedirect(navigate,'DomainName');
  });

  return (
    <div className="d-md-flex justify-content-center align-items-center h-100 primary-bg">
      <ToastContainer />

      <div className="contents">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12">
              <div className="form-block mx-auto">
                <div className="text-center mb-5">
                  <h3>
                    <strong>TutorPad</strong>
                  </h3>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form>
                <div className="form-group last mb-3">
                    <div className="d-flex align-items-center">
                      <input
                        type="text"
                        className="form-control domain"
                        placeholder="domain"
                        value = {domain}
                        name="domain"
                        onChange={(e) =>
                            setDomain(e.target.value)
                          }
                        // value={centralPortalDomain}
                        // onChange={handleChange}
                      />
                      <span style={{ fontSize: "16px" , paddingLeft:"10px" }}>{centralPortalDomain}</span>
                      {/* <span style={{ fontSize: "16px" , paddingLeft:"10px" }}>tutorpad.co</span> */}
                    </div>
                    <small style={{ color: "red" }}>
                      {error?.domain?.length ? error.domain[0] : <></>}
                    </small>
                  </div>

                  <input
                    type="button"
                    value="Submit"
                    className="btn btn-block btn-primary"
                    onClick={handleSubmit}
                  />
                </form>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainRegister;
