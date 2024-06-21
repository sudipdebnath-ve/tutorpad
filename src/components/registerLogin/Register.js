import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { NON_LOGGED_IN_API_URL } from "../../utils/config.js";
import axios from "axios";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { checkAuthAndRedirect } from '../../utils/helper.js';
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import { getDomainName } from "../../services/loginService.js";
import i18next from "i18next";
import LanguageOption from "../LanguageOption.js";
import { useTranslation } from "react-i18next";
import "./style.css"

const Register = ( { subdomain, setSubdomain }) => {
  const { t } = useTranslation()
  const { setIsDarkMode } = useUserDataContext();
  const navigate = useNavigate();
  const [userdetails, setUserdetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    rpassword: "",
    domain: "",
    bname: "",
    business_size: "",
  });
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [error, setError] = useState({});
  const [centralPortalDomain, setCentralPortalDomain] = useState("");
  const [countryDetail, setCountryDetail] = useState({});


  const getDomainNameHandler  = async () => {
    const res = await getDomainName();
    setCentralPortalDomain(res?.data) 
    localStorage.setItem("centralPortalDomain", res?.data);

    try {
      // First, get the IP address
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();

      // Then, get the geolocation details using the IP
      const geoResponse = await fetch(`http://ip-api.com/json/${ipData.ip}`);
      const geoData = await geoResponse.json();

      const data = {
        ip: ipData.ip,
        city: geoData.city,
        country: geoData.country,
        countryCode: geoData.countryCode,
        region: geoData.region,
        regionName: geoData.regionName,
        status: geoData.status,
        timezone: geoData.timezone,
        zip: geoData.zip,
      };
      setCountryDetail(data);
    } catch (error) {
        console.error('Error fetching IP and country:', error);
    }
  };

  const multiLangHandler = (e) => {
    // i18next.changeLanguage(e.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setUserdetails({ ...userdetails, [name]: value });
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handleSubmit = async () => {
    const subdomain = userdetails.domain;
    const formData = {
      first_name: userdetails.firstname,
      email: userdetails.email,
      password: userdetails.password,
      c_password: userdetails.rpassword,
      last_name: userdetails.lastname,
      domain: subdomain,
      bname: userdetails.bname,
      business_size: userdetails.business_size,
      country_detail: countryDetail,
    };

    if (isTermsChecked) {
      formData.terms = isTermsChecked;
    }
    setSubdomain(subdomain);
    
    const config = {
      method: "POST",
      url: `${NON_LOGGED_IN_API_URL}register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(formData),
      // validateStatus: (status) => status !== 404,
    };
    await axios(config)
      .then(async (response) => {
        // console.log(response);
        if (response.status === 200) {
          var token = response.data.data.token;
          var role = response.data.data.role_id;

          //store token in localstorage
          var domain = `${subdomain}.${centralPortalDomain}`;
          localStorage.setItem("tutorPad", JSON.stringify(token));
          localStorage.setItem(`${domain}`, JSON.stringify(token));
          
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });

          const encodedToken = encodeURIComponent(token);
          const encodedDomain = encodeURIComponent(domain);
          const encodedRole = encodeURIComponent(role);
          
          window.location.href = `${process.env.REACT_APP_PROTOCOL}://${subdomain}.${centralPortalDomain}/dashboard#${encodedToken}#${encodedDomain}#${encodedRole}`;
        }
      })
      .catch((error) => {
        if (error?.response?.data?.success === false) {
          setError(error.response.data.data);
        }
      })
  };

  useEffect(() => {
    document?.documentElement?.setAttribute("data-theme", "light");
    setIsDarkMode(false);
    localStorage.setItem("theme", "light");
    getDomainNameHandler()
    checkAuthAndRedirect(navigate, 'Register');
  }, []);

  function validateInput(event) {
    console.log('test : ',event);
    const regex = /^[a-zA-Z0-9.-]*$/; // Only allow letters, digits, dot, and hyphen
    const key = String.fromCharCode(event.keyCode || event.which);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
    return true;
  }

  return (
    <div className="d-md-flex align-items-center justify-content-center primary-bg">
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
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("first name")}
                      name="firstname"
                      onChange={handleChange}
                      required
                    />
                    <small className="input-error-message" >
                      {error?.first_name?.length ? error.first_name[0] : <></>}
                    </small>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("last name")}
                      name="lastname"
                      onChange={handleChange}
                      required
                    />
                    <small className="input-error-message">
                      {error?.last_name?.length ? error.last_name[0] : <></>}
                    </small>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder={t("email placeholder")}
                      name="email"
                      onChange={handleChange}
                      required
                    />
                    <small className="input-error-message">
                      {error?.email?.length ? error.email[0] : <></>}
                    </small>
                  </div>
                  <div className="form-group last mb-3 pass">
                    <input
                      type={type}
                      className="form-control"
                      placeholder={t("password placeholder")}
                      name="password"
                      onChange={handleChange}
                      required
                    />
                    <span className="eyeball" onClick={handleToggle}>
                      <Icon className="absolute mr-10" icon={icon} size={15} />
                    </span>
                    <small className="input-error-message">
                      {error?.password?.length ? error.password[0] : <></>}
                    </small>
                  </div>
                  <div className="form-group last mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder={t("re-enter Password")}
                      name="rpassword"
                      onChange={handleChange}
                      required
                    />
                    <small className="input-error-message">
                      {error?.c_password?.length ? error.c_password[0] : <></>}
                    </small>
                  </div>
                  <div className="form-group last mb-3">
                    <div className="d-flex align-items-center">
                      <input
                        type="text"
                        className="form-control domain"
                        placeholder={t("domain")}
                        name="domain"
                        onChange={handleChange}
                        onKeyPress={(e) => validateInput(e)}
                      />
                      <span style={{ fontSize: "16px", paddingLeft:"10px" }}>{centralPortalDomain}</span>
                      {/* <span style={{ fontSize: "16px"}}>tutorpad.co</span> */}
                    </div>
                    <small className="input-error-message">
                      {error?.domain?.length ? error.domain[0] : <></>}
                    </small>
                  </div>

                  <div className="form-group last mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("Business Name (Optional)")}
                      name="bname"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group last mb-3">
                    <select
                      className="form-control"
                      name="business_size"
                      onChange={handleChange}
                      required
                    >
                      <option value="">{t("Business Size")}</option>
                      <option value="single">{t("It's just me!")}</option>
                      <option value="multi">
                        {t("I have a business with multiple tutors")}
                      </option>
                    </select>
                    <small className="input-error-message">
                      {error?.business_size?.length ? (
                        error.business_size[0]
                      ) : (
                        <></>
                      )}
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
                          checked={isTermsChecked}
                          onChange={() => setIsTermsChecked(!isTermsChecked)}
                        />
                        <div className="control__indicator"></div>
                      </label>
                      {/* <span className="ml-auto">
                      <Link to="#" className="forgot-pass">
                        Forgot Password
                      </Link>
                    </span> */}
                    </div>
                    <small className="input-error-message">
                      {error?.terms?.length ? error.terms[0] : <></>}
                    </small>
                  </div>

                  <input
                    type="button"
                    value={t("Create My Tutor Account")}
                    className="btn btn-block btn-primary"
                    onClick={handleSubmit}
                  />
                </form>
                <br></br>
                {t("Already have an account?")}<Link to="/domain-signin"> {t("sign in")}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
