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
import { storeToken, checkAuthAndRedirect } from '../../utils/helper.js';


const Signin = () => {

  const { t } = useTranslation();
  const { fetchData, setIsDarkMode } = useUserDataContext();
  const navigate = useNavigate();
  const [userdetails, setUserdetails] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setUserdetails({ ...userdetails, [name]: value });
  };

  function getDesiredSubdomain(url) {
    // Handle invalid or non-standard URLs gracefully
    if (!url || !url.startsWith('http')) {
      return 'Invalid URL';
    }
  
    // Parse the URL using URL object for robustness
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
  
    // Extract the desired part before localhost (including subdomains)
    const desiredSubdomainParts = hostname.split('.');
    desiredSubdomainParts.pop(); // Remove the last part (localhost)
  
    // Reconstruct the desired subdomain (including all subdomains)
    const desiredSubdomain = desiredSubdomainParts.join('.');
  
    // Concatenate with .tutorpad.co
    return `${desiredSubdomain}.${process.env.REACT_APP_DOMAIN}`;
  }


  const handleSubmit = async () => {

    const currentUrl = window.location.href;
    const portal = getDesiredSubdomain(currentUrl);

    console.log("url from browser tab---------",currentUrl , "after extract the url---------", portal );
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
    await axios(config)
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          // localStorage.setItem(
          //   "tutorPad",
          //   JSON.stringify(response.data.data.token)
          // );
          storeToken(response.data.data.token,portal);
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            fetchData();
            navigate("/starting/"+JSON.stringify(response.data.data.token));
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.success === false) {
          setError(error.response.data);
        }
      });
  };


  const handleClick = (e) => {
    i18next.changeLanguage(e.target.value);
  };

  useEffect(() => {
    document?.documentElement?.setAttribute("data-theme", "light");
    setIsDarkMode(false);
    localStorage.setItem("theme", "light");
    checkAuthAndRedirect(navigate, 'Signin');
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
                  <small style={{ color: "red" }}>
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
