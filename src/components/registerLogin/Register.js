import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bgimage from "../../assets/images/bg.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { NON_LOGGED_IN_API_URL } from "../../utils/config.js";
import axios from "axios";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useUserDataContext } from "../../contextApi/userDataContext.js";

const Register = () => {
  const { fetchData } = useUserDataContext();
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

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setUserdetails({ ...userdetails, [name]: value });
    console.log(name, value);
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
    const formData = {
      first_name: userdetails.firstname,
      email: userdetails.email,
      password: userdetails.password,
      c_password: userdetails.rpassword,
      last_name: userdetails.lastname,
      domain: userdetails.domain,
      bname: userdetails.bname,
      business_size: userdetails.business_size,
    };

    if (isTermsChecked) {
      formData.terms = isTermsChecked;
    }
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
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          localStorage.setItem(
            "tutorPad",
            JSON.stringify(response.data.data.token)
          );
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.success === false) {
          setError(error.response.data.data);
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  useEffect(() => {
    document?.documentElement?.setAttribute("data-theme", "light");
  });

  console.log("checked", isTermsChecked);

  return (
    <div className="d-md-flex align-items-center justify-content-center primary-bg">
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
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      name="firstname"
                      onChange={handleChange}
                      required
                    />
                    <small style={{ color: "red" }}>
                      {error?.first_name?.length ? error.first_name[0] : <></>}
                    </small>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      name="lastname"
                      onChange={handleChange}
                      required
                    />
                    <small style={{ color: "red" }}>
                      {error?.last_name?.length ? error.last_name[0] : <></>}
                    </small>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="your-email@gmail.com"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                    <small style={{ color: "red" }}>
                      {error?.email?.length ? error.email[0] : <></>}
                    </small>
                  </div>
                  <div className="form-group last mb-3 pass">
                    <input
                      type={type}
                      className="form-control"
                      placeholder="Your Password"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                    <span className="eyeball" onClick={handleToggle}>
                      <Icon className="absolute mr-10" icon={icon} size={15} />
                    </span>
                    <small style={{ color: "red" }}>
                      {error?.password?.length ? error.password[0] : <></>}
                    </small>
                  </div>
                  <div className="form-group last mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Re-enter Password"
                      name="rpassword"
                      onChange={handleChange}
                      required
                    />
                    <small style={{ color: "red" }}>
                      {error?.c_password?.length ? error.c_password[0] : <></>}
                    </small>
                  </div>
                  <div className="form-group last mb-3">
                    <div className="d-flex align-items-center">
                      <input
                        type="text"
                        className="form-control domain"
                        placeholder="domain"
                        name="domain"
                        onChange={handleChange}
                      />
                      <span style={{ fontSize: "16px" }}>.tutorpad.co</span>
                    </div>
                    <small style={{ color: "red" }}>
                      {error?.domain?.length ? error.domain[0] : <></>}
                    </small>
                  </div>

                  <div className="form-group last mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Business Name (Optional)"
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
                      <option value="">Business Size</option>
                      <option value="single">It's just me!</option>
                      <option value="multi">
                        I have a business with multiple tutors
                      </option>
                    </select>
                    <small style={{ color: "red" }}>
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
                          I agree to the <Link to="/">Terms of Service</Link>{" "}
                          and <Link to="/">Privacy Policy</Link>
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
                    <small style={{ color: "red" }}>
                      {error?.terms?.length ? error.terms[0] : <></>}
                    </small>
                  </div>

                  <input
                    type="button"
                    value="Create My Tutor Account"
                    className="btn btn-block btn-primary"
                    onClick={handleSubmit}
                  />
                </form>
                <br></br>
                Already have an account?<Link to="/signin"> Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
