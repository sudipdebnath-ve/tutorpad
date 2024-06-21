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
import { useTokenStorage, checkAuthAndRedirect } from '../../utils/helper.js';
import { getDomainName } from "../../services/loginService.js";


const Signin = () => {

  const { t } = useTranslation();
  const { fetchData, setIsDarkMode } = useUserDataContext();
  const navigate = useNavigate();
  const [userdetails, setUserdetails] = useState({
    email: "",
    password: "",
  });
  const [centralPortalDomain, setCentralPortalDomain] = useState("");
  const [error, setError] = useState({});
  const storeToken = useTokenStorage();

  const getDomainNameHandler  =  async() => {
    const res =  await getDomainName();
    setCentralPortalDomain(res?.data)
    localStorage.setItem("centralPortalDomain", res?.data);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setUserdetails({ ...userdetails, [name]: value });
  };

  const handleSubmit = async () => {
    const portal = window.location.hostname;
    const config = {
      method: "POST",
      url: `${NON_LOGGED_IN_API_URL}login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: userdetails.email,
        password: userdetails.password,
        portal: portal,
      },
      validateStatus: (status) => status !== 404,
    };
    try{
      const response = await axios(config);
      if (response.status === 200) {
        storeToken(response.data.data.token, portal, response.data.data.role_id)
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate('/dashboard');    
      }
    } catch (error)  {
      console.log(error);
      if (error?.response?.data?.success === false) {
        setError(error.response.data.data);
        
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  const multiLangHandler = (e) => {
    i18next.changeLanguage(e.target.value);
    console.log("change language-----------");
  };



  useEffect(() => {
    document?.documentElement?.setAttribute("data-theme", "light");
    setIsDarkMode(false);
    localStorage.setItem("theme", "light"); 
    getDomainNameHandler();
    checkAuthAndRedirect(navigate, 'Signin');
  });

  return (
    
    <div className="d-md-flex justify-content-center align-items-center h-100 primary-bg">
      <ToastContainer />
        <div className="contents">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-12">
              {/* <LanguageOption onChange={(e) => multiLangHandler(e)} /> */}
                <div className="form-block mx-auto">
                  <div className="text-center mb-5">
                    <h3>
                      <strong>TutorPad</strong>
                    </h3>
                  </div>
                  <form>
                    <div className="form-group first">
                      <label htmlFor="email">{t("email")}</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder={t("email placeholder")}
                        name="email"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group last mb-3">
                      <label htmlFor="password">{t("password")}</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder={t("password placeholder")}
                        name="password"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <small className="input-error-message">
                      {error?.message?.length ? error.message : <></>}
                    </small>

                    <div className="d-sm-flex mb-5 align-items-center justify-content-between">
                      <label className="control control--checkbox mb-3 mb-sm-0">
                        <span className="caption">{t("remember me")}</span>
                        <input type="checkbox" />
                        <div className="control__indicator"></div>
                      </label>
                      <span className="ml-auto">
                        <Link to="/forget-password" className="forgot-pass">
                          {t("forgot password")}
                        </Link>
                      </span>
                    </div>

                    <input
                      type="button"
                      value="Sign In"
                      className="btn btn-block btn-primary"
                      onClick={handleSubmit}
                    />
                  </form>
                  <br></br>
                  {t("don't have an account?")}
                  <Link to="/"> {t("register here")}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    
  );
};

export default Signin;
