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
import { getdomain, validateDomain } from "../../services/loginService.js";

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
  const [domain, setDomain] = useState ("sd.tutorpad.co");

  const getDomainNameHandler  = async () => {
    const res = await getdomain();
    setCentralPortalDomain(res?.data)

    // console.log("res is here--------",res.data);
  };

  const handleDomainChange = async () => {
    const data = {
        domain: domain
      };

      const response = await validateDomain(data);
      console.log("response is here------------->",response );
  }

  const handleSubmit = async () => {
    try {
      await handleDomainChange();
      // If handleDomainChange() completes successfully, navigate to "/signin"
      navigate("/signin");
    } catch (error) {
      // If handleDomainChange() encounters an error, handle it here
      console.error("An error occurred:", error);
      // Handle the error accordingly, e.g., display an error message to the user
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
                      <span style={{ fontSize: "16px" }}>{centralPortalDomain}</span>
                    </div>
                    <small style={{ color: "red" }}>
                      {error?.domain?.length ? error.domain[0] : <></>}
                    </small>
                  </div>

                  <input
                    type="button"
                    value="Sign In"
                    className="btn btn-block btn-primary"
                    onClick={handleSubmit}
                  />
                </form>
                <br></br>
                {/* <Link to="/signin" className="btn btn-block btn-primary">Sign In</Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainRegister;
