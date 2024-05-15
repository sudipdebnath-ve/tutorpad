import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgimage from "../../assets/images/bg.jpg";
import "react-toastify/dist/ReactToastify.css";
import { NON_LOGGED_IN_API_URL } from "../../utils/config.js";
import axios from "axios";
import "./assets/css/style.css";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import LanguageOption from "../LanguageOption.js";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  const handleSubmit = async () => {
    const config = {
      method: "POST",
      url: `${NON_LOGGED_IN_API_URL}forgetpass`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email,
      }),
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
  return (
    <div className="d-md-flex half">
      <div className="bg" style={{ backgroundImage: `url(${bgimage})` }}></div>
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

                      <small style={{ color: "red" }}>
                        {error?.email?.length ? error.email[0] : <></>}
                      </small>

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
