import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bgimage  from "../../../assets/images/bg.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NON_LOGGED_IN_API_URL } from "../../../utils/config.js";
import axios from "axios";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import LanguageOption from "../../LanguageOption.js";
import { useTranslation } from "react-i18next";
// import i18next from "i18next";
import { useTokenStorage, checkAuthAndRedirect } from '../../../utils/helper.js';
import { getDomainName, passwordSetupPortal } from "../../../services/loginService.js";
import "./style.css"

const ResetPasswordSetup = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState({});
  const [portal, setPortal] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [key, setKey] = useState("");


//   const multiLangHandler = (e) => {
//     i18next.changeLanguage(e.target.value);
//     console.log("change language-----------");
//   };
   const resetPassword = async () =>{

    if(userdetails.password !== userdetails.rpassword){

    }

   }


  useEffect(() => {
    // Extract the key from the URL
    const queryParams = new URLSearchParams(location.search);
    const key = queryParams.get('key');
    const portal = window.location.hostname;
    if (key) {
        data: {
            email: userdetails.email,
            password: userdetails.password,
            portal: portal,
          }, 
        passwordSetupPortal()
      }

  }, [location]);

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
                  <div className="text-center mb-5">
                    <h3>
                      <strong>Password Setup</strong>
                    </h3>
                  </div>
                  <div>
                  <p>Please enter and confirm your new password below:</p>
                  </div>
                  <form>
                    <div className="form-group last mb-3">
                      {/* <label htmlFor="password">{t("password")}</label> */}
                      <input
                        type="password"
                        className="form-control"
                        placeholder={t("New Password")}
                        name="password"
                        // onChange={handleChange}
                        required
                      />
                    </div>
                    <small style={{ color: "red" }}>
                      {error?.message?.length ? error.message : <></>}
                    </small>

                    <div className="form-group last mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder={t("Confirm Password")}
                      name="rpassword"
                    //   onChange={handleChange}
                      required
                    />
                    <small style={{ color: "red" }}>
                      {error?.c_password?.length ? error.c_password[0] : <></>}
                    </small>
                  </div>

                  <div className="form-group  last mb-5">
                    <div className="d-sm-flex align-items-center justify-content-between">
                      <label className="control control--checkbox mb-3 mb-sm-0">
                        <span className="caption">
                          {t("I agree to the")} <Link to="/">{t("Terms of Service")}</Link>{" "}
                          and <Link to="/">{t("Privacy Policy")}</Link>
                        </span>
                        <input
                          type="checkbox"
                          name="terms"
                          required
                        //   checked={isTermsChecked}
                        //   onChange={() => setIsTermsChecked(!isTermsChecked)}
                        />
                        <div className="control__indicator"></div>
                      </label>
                    </div>
                    <small style={{ color: "red" }}>
                      {error?.terms?.length ? error.terms[0] : <></>}
                    </small>
                  </div>
                    <input
                      type="button"
                      value="Save Password"
                      className="btn btn-block btn-primary save-password"
                    //   onClick={handleSubmit}
                    />
                  </form>
                  <br></br>
                  <Link to="/"> {t("back to login")}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    
  );
};

export default ResetPasswordSetup;
