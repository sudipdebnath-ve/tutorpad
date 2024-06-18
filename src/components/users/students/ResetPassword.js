import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NON_LOGGED_IN_API_URL } from "../../../utils/config.js";
import axios from "axios";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./style.css"

const ResetPasswordSetup = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [getError, setError] = useState({});
  const [portal, setPortal] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [key, setKey] = useState("");
  const [getAllow, setAllow] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handleSubmit = async () => {
    if (password !== c_password) {
      setError("Passwords do not match.");
      return;
    }
    const loginApi = axios.create({
      baseURL: NON_LOGGED_IN_API_URL,
    });
    const data = {
      key: key,
      portal: portal,
      password: password,
      c_password: c_password,
    };
    loginApi.post ("user/setup-password", data).then((response) =>{
      console.log('response : ',response);
      if (response && response.data.success) {
        setPasswordChanged(true);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        // navigate('/signin');  
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        setError(error.response.data.data.password);
        return;
      }
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "rpassword") {
      setC_password(value);
    }
  }

  const verifyKey = async (data) => {
    try {
      const loginApi = axios.create({
        baseURL: NON_LOGGED_IN_API_URL,
      });
      loginApi.post ("user/verify/password-setup-portal", data).then((response) =>{
        console.log('response.data.success : ',response.data.success);
        if (response && response.data.success) {
          console.log('gsdsd : ', response.data.success);
            setAllow(true);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setError(error.response.data.message);
          return;
          } else {
          return "An unknown error occurred.";
        }
      });
    } catch (error) {
      console.error("An error occurred:", error);
      return false;
    }
  };

  useEffect(() => {
    // Extract the key from the URL
    const queryParams = new URLSearchParams(location.search);
    const key = queryParams.get('key');
    const portal = window.location.hostname;
    setKey(key);
    setPortal(portal);
    if (key) {
      const data = {
        key: key,
        portal: portal,
      }; 
      verifyKey(data);
      }
  }, []);

  return (
    <div className="d-md-flex justify-content-center align-items-center h-100 primary-bg">
      <ToastContainer />
      <div className="container">
        {passwordChanged ? (
          <div className="row align-items-center justify-content-center">
          <div className="col-md-12">
            <div className="form-block mx-auto">
              <div className="text-center mb-5">
                <h3><strong>TutorPad</strong></h3>
              </div>
              <div className="text-center mb-5">
                <h3><strong>Password Setup</strong></h3>
              </div>

              <div className="container text-center">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-12">
                <i className="fas fa-check" style={{ color: 'green', fontSize: '48px' }}></i>
                <h3>Your password has been changed successfully.</h3>
                <Link to="/signin">Back to login</Link>
              </div>
            </div>
          </div>
              </div>
              </div>
              </div>
          
        ) : (
          <div className="container">
            {getAllow ? (
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                  <div className="form-block mx-auto">
                    <div className="text-center mb-5">
                      <h3><strong>TutorPad</strong></h3>
                    </div>
                    <div className="text-center mb-5">
                      <h3><strong>Password Setup</strong></h3>
                    </div>
                    <div>
                      <p>Please enter and confirm your new password below:</p>
                    </div>
                    <form>
                      <div className="form-group last mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder={t("New Password")}
                          name="password"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group last mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder={t("Confirm Password")}
                          name="rpassword"
                          onChange={handleChange}
                          required
                        />
                        <small className="token-expired-wrapper" style={{ color: "red" }}>
                          {getError?.length ? getError : <></>}
                        </small>
                      </div>
                      <div className="form-group last mb-5">
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
                            />
                            <div className="control__indicator"></div>
                          </label>
                        </div>
                        <small className="token-expired-wrapper" style={{ color: "red" }}>
                          {getError?.terms?.length ? getError.terms[0] : <></>}
                        </small>
                      </div>
                      <input
                        type="button"
                        value="Save Password"
                        className="btn btn-block btn-primary save-password"
                        onClick={handleSubmit}
                      />
                    </form>
                    <br />
                    <Link to="/">{t("back to login")}</Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                  <small className="token-expired-wrapper" style={{ color: "red" }}>
                    {getError?.length ? getError : 'Loading ...'}
                  </small>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordSetup;
