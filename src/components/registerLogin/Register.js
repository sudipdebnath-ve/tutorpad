import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bgimage from "../../assets/images/bg.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/config.js";
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
    bussiness_size: "",
  });
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (name === "bussiness_size") {
      if (value !== "multi") {
        value = "single";
      }
    }
    setUserdetails({ ...userdetails, [name]: value });
    // console.log(name, value);
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
    const config = {
      method: "POST",
      url: `${API_URL}register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        first_name: userdetails.firstname,
        email: userdetails.email,
        password: userdetails.password,
        c_password: userdetails.rpassword,
        last_name: userdetails.lastname,
        domain: userdetails.domain,
        bname: userdetails.bname,
        bussiness_size: userdetails.bussiness_size,
      }),
      // validateStatus: (status) => status !== 404,
    };
    await axios(config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem(
            "tutorPad",
            JSON.stringify(response.data.data.token)
          );
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            fetchData();
            navigate("/dashboard");
          }, 2000);
        }
      })
      .catch((error) => {
        if (error.response.data.success === false) {
          setError(error.response.data.data);
        }
      });
  };

  useEffect(() => {
    if (localStorage.getItem("tutorPad")) {
      navigate("/signin");
    }
  });

  return (
    <div className="d-md-flex half">
      <ToastContainer />
      <div className="bg" style={{ backgroundImage: `url(${bgimage})` }}></div>
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
                  <div className="form-group d-flex align-items-center last mb-3">
                    <input
                      type="text"
                      className="form-control domain"
                      placeholder="domain"
                      name="domain"
                      onChange={handleChange}
                    />
                    <span style={{ fontSize: "16px" }}>.tutorpad.com</span>
                  </div>
                  <div className="form-group last mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Bussiness Name (Optional)"
                      name="bname"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group last mb-3">
                    <select
                      className="form-control"
                      name="bussiness_size"
                      onChange={handleChange}
                    >
                      <option value="single">It's just me!</option>
                      <option value="multi">
                        I have a business with multiple tutors
                      </option>
                    </select>
                  </div>

                  <div className="d-sm-flex mb-5 align-items-center justify-content-between">
                    <label className="control control--checkbox mb-3 mb-sm-0">
                      <span className="caption">
                        I agree to the <Link to="/">Terms of Service</Link> and{" "}
                        <Link to="/">Privacy Policy</Link>
                      </span>
                      <input type="checkbox" />
                      <div className="control__indicator"></div>
                    </label>
                    {/* <span className="ml-auto">
                      <Link to="#" className="forgot-pass">
                        Forgot Password
                      </Link>
                    </span> */}
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
