import React, { useState, useEffect } from "react";
import MiniSidebar from "../../sidebar/MiniSidebar.js";
import Sidebar from "../../sidebar/Sidebar.js";
import TopBar from "../../sidebar/TopBar.js";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import "./assets/css/style.css";
import { Link } from "react-router-dom";
import { API_URL } from "../../../utils/config.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StudentAdd = () => {
  const { fetchData, sidebarToggle, token, userId, getPrivileges, privileges } = useUserDataContext();
  const [checkedPrivileges, setCheckedPrivileges] = useState([]);
  const [error, setError] = useState({});
  const [val, setVal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    first_name: "",
    last_name: "",
    name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    remember_token: "",
    enable_login_access: "",
    gender: "",
    dob: "",
    skype: "",
    facetime: "",
    address: "",
    payroll: "No automatic payroll calculation",
    payrate_on_revenue: "",
    payrate_flat_hourly: "",
    makeup_credits: "",
    virtual_meeting_link: "",
    subjects: "",
    lesson: "Lesson",
    privileges: "",
    preferred_locatio: "",
    tutor_status: "tutor",
  });

  const handlePrivilegesChange = (event) => {
    const { name, checked } = event.target;
  
    if (name === "all") {
      if (checked) {
        // Add all permission IDs to checkedPrivileges
        const allPrivileges = privileges.flatMap(group => group.permissions.map(permission => permission.id));
        setCheckedPrivileges(allPrivileges);
      } else {
        // Clear all privileges
        setCheckedPrivileges([]);
      }
    } else {
      const id = parseInt(name, 10);
      setCheckedPrivileges((prevChecked) => {
        if (checked) {
          return [...prevChecked, id];
        } else {
          return prevChecked.filter((privilegeId) => privilegeId !== id);
        }
      });
    }
  };

  useEffect(() => {
    fetchData(token);
    getPrivileges();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const stepMenuOne = document.querySelector(".formbold-step-menu1");
    const stepMenuTwo = document.querySelector(".formbold-step-menu2");

    const stepOne = document.querySelector(".formbold-form-step-1");
    const stepTwo = document.querySelector(".formbold-form-step-2");

    // const formSubmitBtn = document.querySelector(".formbold-btn");
    const formBackBtn = document.querySelector(".formbold-back-btn");

    let input = document.querySelectorAll("input[type=text]");
    let emailfield = document.querySelectorAll("input[type=email]");

    let req = false;
    let flagemail = false;

    for (let [key, value] of Object.entries(input)) {
      // console.log("value", value.value);
      if (
        value.required === true &&
        (value.value === "" || value.value === undefined)
      ) {
        value.className = "border-2 border-danger form-control";
        let label = document.getElementById(value.name);
        label.className = "formbold-form-label text-danger";
        req = true;

        label.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
      } else if (value.required && value.value) {
        value.className = "form-control";
        let label = document.getElementById(value.name);
        label.className = "formbold-form-label";
      }
    }
    for (let [key, value] of Object.entries(emailfield)) {
      // console.log("value", value.value);
      if (
        value.required === true &&
        (value.value === "" || value.value === undefined)
      ) {
        // console.log("value.name", value.name);
        // console.log("value.value", value.value);

        value.className = "border-2 border-danger form-control";
        let label = document.getElementById(value.name);
        label.className = "formbold-form-label text-danger";
        flagemail = true;
        label.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
      } else if (value.required && value.value) {
        console.log("value", value.value);

        value.className = "form-control";
        let label = document.getElementById(value.name);
        label.className = "formbold-form-label";
      }
    }
    if (req === false && flagemail === false) {
      stepMenuOne.classList.remove("active");
      stepMenuTwo.classList.add("active");

      stepOne.classList.remove("active");
      stepTwo.classList.add("active");

      formBackBtn.classList.add("active");
      formBackBtn.addEventListener("click", function (event) {
        event.preventDefault();

        stepMenuOne.classList.add("active");
        stepMenuTwo.classList.remove("active");

        stepOne.classList.add("active");
        stepTwo.classList.remove("active");

        formBackBtn.classList.remove("active");
      });
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "phone") {
      formData["phone"] = value;
    } else if (name === "enable_login_access") {
      var newVal = (value == "on") ? 1 : 0;
      formData["enable_login_access"] = newVal;
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const formSubmit = async (e) => {
    formData["privileges"] = checkedPrivileges;
    formData["user_id"] = userId;
    e.preventDefault();
    const config = {
      method: "POST",
      url: `${API_URL}new-tutor`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    };
    await axios(config)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/tutors");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.success === false) {
          setError(error.response.data.data);
        }
      });
  };

  return (
    <div className="wrapper">
      {sidebarToggle ? (
        <>
          <MiniSidebar />
        </>
      ) : (
        <>
          <Sidebar />
        </>
      )}

      <div className="main">
        <TopBar />

        <main className="content studentadd">
          <ToastContainer />
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
                <div className="formbold-main-wrapper">
                  <div className="back-link">
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    <Link to="/tutors"> Back to Tutors</Link>
                  </div>
                  <h1>Create a New Tutor</h1>
                  <div className="formbold-form-wrapper">
                    <form name="myForm">
                      <div className="formbold-steps">
                        <ul>
                          <li className="formbold-step-menu1 active">
                            <span>1</span>
                            Tutor Details
                          </li>
                          <li className="formbold-step-menu2">
                            <span>2</span>
                            Confirm
                          </li>
                        </ul>
                      </div>
                      <div className="formbold-form-step-1 active">
                        <div className="formbold-input-flex diff">
                          <div>
                            <label
                              htmlFor="title"
                              className="formbold-form-label"
                              id="title"
                            >
                              Title <span className="d-inline">Optional</span>
                            </label>
                            <input
                              type="text"
                              name="title"
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="formbold-input-flex diff">
                          <div>
                            <label
                              htmlFor="first_name"
                              className="formbold-form-label"
                              id="first_name"
                            >
                              First name
                            </label>
                            <input
                              type="text"
                              name="first_name"
                              className="form-control"
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="last_name"
                              className="formbold-form-label"
                              id="last_name"
                            >
                              Last name
                            </label>
                            <input
                              type="text"
                              name="last_name"
                              className="form-control"
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="formbold-input-flex">
                          <div>
                            <label
                              htmlFor="email"
                              className="formbold-form-label"
                              id="email"
                            >
                              Email Address
                            </label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              required
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <div>
                              <label
                                htmlFor="phone"
                                className="formbold-form-label"
                                id="phone"
                              >
                                Phone Number
                              </label>
                              <input
                                type="text"
                                name="phone"
                                className="form-control"
                                required
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="formbold-input-flex diff">
                          <div>
                            <input
                              type="checkbox"
                              className="sms"
                              name="enable_login_access"
                              onChange={handleChange}
                              id="enable_login_access"
                            />
                            <label htmlFor="enable_login_access">
                              {" "}
                              Enable login access
                            </label>
                            <br />
                            <span>
                              An email will be sent with a link to set up their
                              password
                            </span>
                          </div>
                        </div>
                        <div className="formbold-input-flex diff">
                          <div>
                            <label
                              htmlFor="address"
                              className="formbold-form-label"
                            >
                              Address <span>Optional</span>
                            </label>
                            <br></br>

                            <textarea
                              name="address"
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <hr></hr>

                        <div className="formbold-input-flex diff">
                          <div>
                            <label
                              htmlFor="payroll"
                              className="formbold-form-label"
                            >
                              Payroll
                            </label>
                            <br></br>
                            <div className="preference">
                              <input
                                type="radio"
                                name="payroll"
                                onChange={handleChange}
                                value="No automatic payroll calculation"
                                checked={
                                  formData.payroll ===
                                  "No automatic payroll calculation"
                                }
                              />
                              No automatic payroll calculation
                            </div>
                            <div className="preference">
                              <input
                                type="radio"
                                name="payroll"
                                onChange={handleChange}
                                value="Percentage of tutor's revenue"
                                checked={
                                  formData.payroll ===
                                  "Percentage of tutor's revenue"
                                }
                              />
                              Percentage of tutor's revenue
                            </div>
                            <div className="preference">
                              <input
                                type="radio"
                                name="payroll"
                                onChange={handleChange}
                                value="Flat hourly rate"
                                checked={
                                  formData.payroll === "Flat hourly rate"
                                }
                              />
                              Flat hourly rate
                            </div>
                          </div>
                        </div>
                        {formData.payroll ===
                          "Percentage of tutor's revenue" && (
                          <>
                            <div className="formbold-input-flex">
                              <div>
                                <label
                                  htmlFor="payrate_on_revenue"
                                  className="formbold-form-label"
                                >
                                  Pay Rate <span>% of Revenue</span>
                                </label>
                                <input
                                  type="text"
                                  name="payrate_on_revenue"
                                  className="form-control"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </>
                        )}
                        {formData.payroll === "Flat hourly rate" && (
                          <>
                            <div className="formbold-input-flex">
                              <div>
                                <label
                                  htmlFor="payrate_flat_hourly"
                                  className="formbold-form-label"
                                >
                                  Pay Rate <span>per hour</span>
                                </label>
                                <input
                                  type="text"
                                  name="payrate_flat_hourly"
                                  className="form-control"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </>
                        )}
                        {formData.payroll !==
                          "No automatic payroll calculation" && (
                          <>
                            <div className="formbold-input-flex diff">
                              <div>
                                <label
                                  htmlFor="makeup_credits"
                                  className="formbold-form-label"
                                >
                                  Make-Up Credits
                                </label>
                                <br></br>
                                <div className="preference">
                                  <input
                                    type="radio"
                                    name="makeup_credits"
                                    onChange={handleChange}
                                    value="Pay when a make-up credit is issued"
                                  />
                                  Pay when a make-up credit is issued
                                </div>
                                <div className="preference">
                                  <input
                                    type="radio"
                                    name="makeup_credits"
                                    onChange={handleChange}
                                    value="Pay when a make-up credit is used"
                                  />
                                  Pay when a make-up credit is used
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        <hr></hr>
                        <div className="formbold-input-flex diff">
                          <div>
                            <label
                              htmlFor="virtual_meeting_link"
                              className="formbold-form-label"
                            >
                              Virtual Meeting <span>Optional</span>
                            </label>
                            <br></br>
                            <span>
                              Share a link to Zoom, Google Meet, or any other
                              video conferencing application.
                              <Link to="#">Click Here</Link> to learn more
                            </span>
                            <input
                              type="text"
                              name="virtual_meeting_link"
                              className="form-control mt-2"
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="formbold-input-flex diff">
                          <div>
                            <label
                              htmlFor="subjects"
                              className="formbold-form-label"
                            >
                              Subjects <span>Optional</span>
                            </label>
                            <br></br>
                            <span>
                              Use a semicolon or press the Enter key to separate
                              entries
                            </span>
                            <input
                              type="text"
                              name="subjects"
                              className="form-control mt-2"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="formbold-form-btn-wrapper">
                          <div className="btn-end">
                            <Link className="cancel" to="/tutors">
                              Cancel
                            </Link>

                            <button
                              className="formbold-btn"
                              onClick={handleSubmit}
                            >
                              Next Step
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_1675_1807)">
                                  <path
                                    d="M10.7814 7.33312L7.20541 3.75712L8.14808 2.81445L13.3334 7.99979L8.14808 13.1851L7.20541 12.2425L10.7814 8.66645H2.66675V7.33312H10.7814Z"
                                    fill="white"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1675_1807">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="formbold-form-step-2">
                        <div className="text-center">
                          <small style={{ color: "red" }}>
                            {error?.email?.length ? error.email[0] : <></>}
                          </small>
                        </div>
                        <h5>Tutor Privileges</h5>
                        <div className="formbold-input-flex diff">
                          <div>
                            <input
                                type="checkbox"
                                className="administrator"
                                name="all"
                                id="administrator-privileges"
                                onChange={handlePrivilegesChange}
                                checked={
                                  checkedPrivileges.length === privileges.flatMap(group => group.permissions.map(permission => permission.id)).length
                                }
                                style={{ cursor: 'pointer'}}
                              />
                              <label
                                htmlFor="administrator-privileges"
                                className="form-form-label"
                                style={{ cursor: 'pointer'}}
                              >
                                {" "}
                                Administrator (all privileges)
                              </label>
                              <br />
                              <span>
                                Administrators can access all parts of
                                TutorBird and create other users.
                              </span>
                            </div>
                          </div>

                        {privileges.map((group) => {
                          return (
                          <div>
                            <h6 className="formbold-form-label">{ group.group_label }</h6>
                            <div className="formbold-input-flex diff" style={{ display: 'flex', flexWrap: 'wrap' }}>
                              { group.permissions.map((permission) => {
                                return (
                                  <div>
                                    <input
                                      type="checkbox"
                                      className="manage"
                                      name={permission.id.toString()}
                                      id={`permission-${permission.id}`}
                                      onChange={handlePrivilegesChange}
                                      checked={checkedPrivileges.includes(permission.id)}
                                      disabled={!permission.status}
                                      style={{ cursor: 'pointer'}}
                                    />
                                    <label
                                      htmlFor={`permission-${permission.id}`}
                                      className="form-form-label"
                                      style={{ cursor: 'pointer'}}
                                    >
                                      {" "}
                                      {permission.label}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          );
                        })}

                        <div className="formbold-form-btn-wrapper">
                          <button className="formbold-back-btn">Back</button>
                          <div className="btn-end">
                            <Link className="cancel" to="/tutors">
                              Cancel
                            </Link>

                            <button
                              className="formbold-btn"
                              onClick={formSubmit}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentAdd;
