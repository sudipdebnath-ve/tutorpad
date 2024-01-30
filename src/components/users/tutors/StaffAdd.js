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

const StaffAdd = () => {
  const { fetchData, sidebarToggle, token, userId } = useUserDataContext();
  const [additionalDetails, setAdditionalDetails] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    skype: "",
    facetime: "",
    school: "",
    studentsince: "",
    referrer: "",
    subjects: "",
    skill: "",
    student_status: "",
    studentType: "",
    studentFamily: "",
    parentfirstname: "",
    parentlastname: "",
    parentemail: "",
    parentmobile: "",
    sms: "",
    parentaddress: "",
    parentemailpreference: "",
    parentsmspreference: "",
    lessoncat: "",
    lessonlen: "",
    billing: "",
    price: "",
    note: "",
    invoicing: "",
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tutorPad"));
    if (!token) {
      navigate("/signin");
    } else {
      fetchData(token);
    }
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
    } else if (name === "student_status") {
      formData["student_status"] = value;
    } else if (name === "studentType") {
      formData["studentType"] = value;
    } else if (name === "billing") {
      formData["billing"] = value;
    } else if (name === "dob") {
      formData["dob"] = value;
      console.log(value);
    }
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };
  const formSubmit = async (e) => {
    console.log(userId);
    formData["user_id"] = userId;
    e.preventDefault();
    const config = {
      method: "POST",
      url: `${API_URL}create-student`,
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
        setTimeout(() => {
          navigate("/students");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAdditionalDetails = () => {
    if (additionalDetails === true) {
      setAdditionalDetails(false);
    } else {
      setAdditionalDetails(true);
    }
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

      <div className="main bg-color">
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
                  <h1>Create a New Staff Member</h1>
                  <div className="formbold-form-wrapper">
                    <form name="myForm">
                      <div className="formbold-steps">
                        <ul>
                          <li className="formbold-step-menu1 active">
                            <span>1</span>
                            Staff Member Details
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
                              name="sms"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="sms"> Enable login access
                            </label>
                            <br/>
                            <span>An email will be sent with a link to set up their password</span>
                            </div>
                        </div>
                        <div className="formbold-input-flex diff">
                          <div>
                            <label
                              htmlFor="parentaddress"
                              className="formbold-form-label"
                            >
                              Address <span>Optional</span>
                            </label>
                            <br></br>

                            <textarea
                              name="parentaddress"
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <hr></hr>
                       
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
                        <h5>Staff Member Privileges</h5>

                        <div className="formbold-input-flex diff">
                          <div>
                          <input
                              type="checkbox"
                              className="administrator"
                              name="administrator"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="administrator"
                            className="form-form-label"> Administrator (all privileges)
                            </label>
                            <br/>
                             <span>Administrators can access all parts of TutorBird and create other users.</span>
                            </div>
                        </div>
                        <h6 className="formbold-form-label">Manage Self</h6>
                        <div className="formbold-input-flex diff">
                          <div>
                          <input
                              type="checkbox"
                              className="manage"
                              name="manage"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="manage"
                            className="form-form-label"> Take attendance
                            </label>
                            <br></br>
                          <input
                              type="checkbox"
                              className="manage"
                              name="manage"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="manage"
                            className="form-form-label"> Record payments with attendance
                            </label>

                            <br></br>
                          <input
                              type="checkbox"
                              className="manage"
                              name="manage"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="manage"
                            className="form-form-label"> Edit own lessons/events
                            </label>

                            <br></br>
                          <input
                              type="checkbox"
                              className="manage"
                              name="manage"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="manage"
                            className="form-form-label"> View own payroll privileges
                            </label>

                            <br></br>
                          <input
                              type="checkbox"
                              className="manage"
                              name="manage"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="manage"
                            className="form-form-label"> Add/edit mileage
                            </label>
                            </div>
                        </div>


                        <h6 className="formbold-form-label">Manage Other Tutors</h6>
                        <div className="formbold-input-flex diff">
                          <div>
                          <input
                              type="checkbox"
                              className="manage"
                              name="manage"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="manage"
                            className="form-form-label"> View other tutor and user contact info
                            </label>
                            <br></br>
                          <input
                              type="checkbox"
                              className="manage"
                              name="manage"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="manage"
                            className="form-form-label"> Manage students and other tutors' lesson/events
                            </label>

                            <br></br>
                          <input
                              type="checkbox"
                              className="manage"
                              name="manage"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="manage"
                            className="form-form-label"> View other tutors' lesson/events
                            </label>
                            </div>
                        </div>

                        <h6 className="formbold-form-label">Manage Student and Parents</h6>
                        <div className="formbold-input-flex diff">
                          <div>
                          <input
                              type="checkbox"
                              className="manage"
                              name="manage"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="manage"
                            className="form-form-label"> View student/parent addresses and phone numbers
                            </label>
                            <br></br>
                          <input
                              type="checkbox"
                              className="manage"
                              name="manage"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="manage"
                            className="form-form-label"> View student/parent email addresses
                            </label>

                            <br></br>
                          <input
                              type="checkbox"
                              className="manage"
                              name="manage"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="manage"
                            className="form-form-label"> View/download student profile attachments
                            </label>
                            </div>
                        </div>

                        <h6 className="formbold-form-label">Other Privileges</h6>
                        <div className="formbold-input-flex diff">
                          <div>
                          <input
                              type="checkbox"
                              className="manage"
                              name="manage"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="manage"
                            className="form-form-label"> Add/view invoices and accounts
                            </label>
                            <br></br>
                          <input
                              type="checkbox"
                              className="manage"
                              name="manage"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="manage"
                            className="form-form-label"> Add/edit expenses and other revenue
                            </label>

                            <br></br>
                          <input
                              type="checkbox"
                              className="manage"
                              name="manage"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="manage"
                            className="form-form-label"> Can add/edit/delete online resources from the school space
                            </label>

                            <br></br>
                          <input
                              type="checkbox"
                              className="manage"
                              name="manage"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="manage"
                            className="form-form-label"> Edit website and post news
                            </label>

                            <br></br>
                          <input
                              type="checkbox"
                              className="manage"
                              name="manage"
                              onChange={handleChange}
                            />
                            <label
                            htmlFor="manage"
                            className="form-form-label"> Create/View reports
                            </label>
                            <br></br>
                            <span>Gives access to reports created by other tutors/admins in the business (may contain sensitive data).</span>
                            </div>
                        </div>


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

export default StaffAdd;
