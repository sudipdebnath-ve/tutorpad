import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgimage from "../../assets/images/bg.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../utils/config.js";
import axios from "axios";

const Signin = () => {
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

  const handleSubmit = async () => {
    const config = {
      method: "POST",
      url: `${API_URL}login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: userdetails.email,
        password: userdetails.password,
      },
      validateStatus: (status) => status !== 404,
    };
    await axios(config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("userPad", JSON.stringify(response.data.data));
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.success === false) {
          setError(error.response.data);
        }
      });
  };

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
                  <div className="form-group first">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="your-email@gmail.com"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group last mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Your Password"
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
                      <span className="caption">Remember me</span>
                      <input type="checkbox" />
                      <div className="control__indicator"></div>
                    </label>
                    <span className="ml-auto">
                      <Link to="#" className="forgot-pass">
                        Forgot Password
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
                Don't have an account?<Link to="/"> Register Here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
