import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgimage from "../../assets/images/bg.jpg";
import "react-toastify/dist/ReactToastify.css";
import { NON_LOGGED_IN_API_URL } from "../../utils/config.js";
import axios from "axios";
import "./assets/css/style.css";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import LanguageOption from "../LanguageOption.js";
import { checkAuthAndRedirect } from '../../utils/helper.js';
import { getDomainName } from "../../services/loginService.js";
import { ToastContainer, toast } from "react-toastify";



const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [centralPortalDomain, setCentralPortalDomain] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const portal = window.location.hostname;
    const config = {
      method: "POST",
      url: `${NON_LOGGED_IN_API_URL}forgetpass`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        portal: portal,
      },
      // validateStatus: (status) => status !== 404,
    };
    await axios(config)
      .then((response) => {
        // console.log(response.data);
        if (response.status === 200) {
          setSuccess(true);
          setMaskedEmail(
            email.replace(
              /(?<=.)(.+?)(?=.@)/gi,
              "X".repeat(email.split("@")[0].length - 2)
            )
          );
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        // console.log(error.response.data.data);
        if (error.response.data.success === false) {
          setError(error.response.data.data);
        }
      });
  };

  const multiLangHandler = (e) => {
    i18next.changeLanguage(e.target.value);
  };

  const getDomainNameHandler  =  async() => {
    const res =  await getDomainName();
    setCentralPortalDomain(res?.data)
    localStorage.setItem("centralPortalDomain", res?.data);
  };

  useEffect(() => {
    getDomainNameHandler();
    checkAuthAndRedirect(navigate, 'ForgotPass');
  });

  return (
    <div className="d-md-flex justify-content-center align-items-center h-100 primary-bg">
      <ToastContainer />
      <div className="contents">
        <div className="container">
          <div className="row align-items-center justify-content-center reset">
            <div className="col-md-12">
            {/* <LanguageOption onChange={(e) => multiLangHandler(e)} /> */}
              <div className="form-block mx-auto">
                <div className="text-center mb-4">
                  <h3>
                    <strong>{t("TutorPad")}</strong>
                  </h3>
                </div>
                {success ? (
                  <>
                    {/* <form>
                      <div className="form-group first">
                        <p>
                          An OTP has been sent to you on this {maskedEmail},
                          please check your inbox.
                        </p>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="XXX_XXX"
                          name="otp"
                          required
                        />
                      </div>

                      <small style={{ color: "red" }}>
                        {error?.message?.length ? error.message : <></>}
                      </small>

                      <input
                        type="button"
                        value="Submit OTP"
                        className="btn btn-block btn-primary"
                      />
                    </form> */}
                    <h5>{message}</h5>
                  </>
                ) : (
                  <>
                    <form>
                      <div className="form-group first">
                        <label htmlFor="email">{t("Email")}</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder={t("email placeholder")}
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="pb-2">
                        <small className="input-error-message">
                          {error?.email?.length ? error.email[0] : <></>}
                        </small>
                      </div>
                      <input
                        type="button"
                        value={t("Reset Password")}
                        className="btn btn-block btn-primary"
                        onClick={handleSubmit}
                      />
                    </form>
                  </>
                )}
                <br></br>
                {t("Already have an account?")}<Link to="/signin"> {t("Sign In")} </Link>here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
