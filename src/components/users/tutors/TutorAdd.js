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
  const { fetchData, sidebarToggle, token, userId } = useUserDataContext();
  const [additionalDetails, setAdditionalDetails] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    loginAccess: "",
    address: "",
    payroll: "No automatic payroll calculation",
    price: "",
    makeup_credits: "",
    virtual_meeting_link: "",
    subjects: "",
    privileges: "",
  });

  const [privileges, setPrivileges] = useState({
    administrator: false,
    manage_self_mileage: false,
    manage_self_take_attendance: true,
    manage_self_record_payments: false,
    manage_self_edit: true,
    manage_self_payroll: false,
    manage_tutor_lesson: false,
    manage_view_tutor: false,
    manage_student_tutor: false,
    manage_student_parent: false,
    manage_student_parent_email: false,
    download_student_profile: false,
    add_invoices: false,
    add_expenses: false,
    update_online_resources: false,
    edit_website: false,
    view_reports: false,
    others: false,
  });

  const getSelectedPrivileges = () => {
    // Extract the selected privileges from the privileges state
    return Object.keys(privileges).filter((privilege) => privileges[privilege]);
  };

  const handlePrivilegesChange = (e) => {
    const { name, checked } = e.target;
    if (name === "administrator" && checked) {
      // If "Administrator" checkbox is checked, set all other checkboxes to true
      setPrivileges({
        administrator: checked,
        manage_self_mileage: checked,
        manage_self_take_attendance: checked,
        manage_self_record_payments: checked,
        manage_self_edit: checked,
        manage_self_payroll: checked,
        manage_tutor_lesson: checked,
        manage_view_tutor: checked,
        manage_student_tutor: checked,
        manage_student_parent: checked,
        manage_student_parent_email: checked,
        download_student_profile: checked,
        add_invoices: checked,
        add_expenses: checked,
        update_online_resources: checked,
        edit_website: checked,
        view_reports: checked,
        others: checked,
      });
    } else {
      // Otherwise, update the specific checkbox
      setPrivileges((prevPrivileges) => ({
        ...prevPrivileges,
        [name]: checked,
      }));
    }
  };

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
    // if (name === "phone") {
    //   formData["phone"] = value;
    // } else if (name === "student_status") {
    //   formData["student_status"] = value;
    // } else if (name === "studentType") {
    //   formData["studentType"] = value;
    // } else if (name === "billing") {
    //   formData["billing"] = value;
    // } else if (name === "dob") {
    //   formData["dob"] = value;
    //   console.log(value);
    // }
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };
  const formSubmit = async (e) => {
    const selectedPrivileges = getSelectedPrivileges();
    // Include selected privileges in the formData
    formData["privileges"] = selectedPrivileges;
    console.log(userId);
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
        setTimeout(() => {
          navigate("/tutors");
        }, 2000);
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
                              name="loginAccess"
                              onChange={handleChange}
                            />
                            <label htmlFor="loginAccess">
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
                        {formData.payroll !==
                          "No automatic payroll calculation" && (
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
                              name="administrator"
                              onChange={handlePrivilegesChange}
                              checked={privileges.administrator}
                            />
                            <label
                              htmlFor="administrator"
                              className="form-form-label"
                            >
                              {" "}
                              Administrator (all privileges)
                            </label>
                            <br />
                            <span>
                              Administrators can access all parts of TutorBird
                              and create other users.
                            </span>
                          </div>
                        </div>
                        <h6 className="formbold-form-label">Manage Self</h6>
                        <div className="formbold-input-flex diff">
                          <div>
                            <input
                              type="checkbox"
                              className="manage"
                              name="manage_self_take_attendance"
                              onChange={handlePrivilegesChange}
                              checked={privileges.manage_self_take_attendance}
                              disabled={true}
                            />
                            <label
                              htmlFor="manage_self_take_attendance"
                              className="form-form-label"
                            >
                              {" "}
                              Take attendance
                            </label>
                            <br></br>
                            <input
                              type="checkbox"
                              className="manage"
                              name="manage_self_record_payments"
                              onChange={handlePrivilegesChange}
                              checked={privileges.manage_self_record_payments}
                            />
                            <label
                              htmlFor="manage_self_record_payments"
                              className="form-form-label"
                            >
                              {" "}
                              Record payments with attendance
                            </label>

                            <br></br>
                            <input
                              type="checkbox"
                              className="manage"
                              name="manage_self_edit"
                              onChange={handlePrivilegesChange}
                              checked={privileges.manage_self_edit}
                              disabled={true}
                            />
                            <label
                              htmlFor="manage_self_edit"
                              className="form-form-label"
                            >
                              {" "}
                              Edit own lessons/events
                            </label>

                            <br></br>
                            <input
                              type="checkbox"
                              className="manage"
                              name="manage_self_payroll"
                              onChange={handlePrivilegesChange}
                              checked={privileges.manage_self_payroll}
                            />
                            <label
                              htmlFor="manage_self_payroll"
                              className="form-form-label"
                            >
                              {" "}
                              View own payroll privileges
                            </label>

                            <br></br>
                            <input
                              type="checkbox"
                              className="manage"
                              name="manage_self_mileage"
                              onChange={handlePrivilegesChange}
                              checked={privileges.manage_self_mileage}
                            />
                            <label
                              htmlFor="manage_self_mileage"
                              className="form-form-label"
                            >
                              {" "}
                              Add/edit mileage
                            </label>
                          </div>
                        </div>

                        <h6 className="formbold-form-label">
                          Manage Other Tutors
                        </h6>
                        <div className="formbold-input-flex diff">
                          <div>
                            <input
                              type="checkbox"
                              className="manage"
                              name="manage_view_tutor"
                              onChange={handlePrivilegesChange}
                              checked={privileges.manage_view_tutor}
                            />
                            <label
                              htmlFor="manage_view_tutor"
                              className="form-form-label"
                            >
                              {" "}
                              View other tutor and user contact info
                            </label>
                            <br></br>
                            <input
                              type="checkbox"
                              className="manage"
                              name="manage_student_tutor"
                              onChange={handlePrivilegesChange}
                              checked={privileges.manage_student_tutor}
                            />
                            <label
                              htmlFor="manage_student_tutor"
                              className="form-form-label"
                            >
                              {" "}
                              Manage students and other tutors' lesson/events
                            </label>

                            <br></br>
                            <input
                              type="checkbox"
                              className="manage"
                              name="manage_tutor_lesson"
                              onChange={handlePrivilegesChange}
                              checked={privileges.manage_tutor_lesson}
                            />
                            <label
                              htmlFor="manage_tutor_lesson"
                              className="form-form-label"
                            >
                              {" "}
                              View other tutors' lesson/events
                            </label>
                          </div>
                        </div>

                        <h6 className="formbold-form-label">
                          Manage Student and Parents
                        </h6>
                        <div className="formbold-input-flex diff">
                          <div>
                            <input
                              type="checkbox"
                              className="manage"
                              name="manage_student_parent"
                              onChange={handlePrivilegesChange}
                              checked={privileges.manage_student_parent}
                            />
                            <label
                              htmlFor="manage_student_parent"
                              className="form-form-label"
                            >
                              {" "}
                              View student/parent addresses and phone numbers
                            </label>
                            <br></br>
                            <input
                              type="checkbox"
                              className="manage"
                              name="manage_student_parent_email"
                              onChange={handlePrivilegesChange}
                              checked={privileges.manage_student_parent_email}
                            />
                            <label
                              htmlFor="manage_student_parent_email"
                              className="form-form-label"
                            >
                              {" "}
                              View student/parent email addresses
                            </label>

                            <br></br>
                            <input
                              type="checkbox"
                              className="manage"
                              name="download_student_profile"
                              onChange={handlePrivilegesChange}
                              checked={privileges.download_student_profile}
                            />
                            <label
                              htmlFor="download_student_profile"
                              className="form-form-label"
                            >
                              {" "}
                              View/download student profile attachments
                            </label>
                          </div>
                        </div>

                        <h6 className="formbold-form-label">
                          Other Privileges
                        </h6>
                        <div className="formbold-input-flex diff">
                          <div>
                            <input
                              type="checkbox"
                              className="manage"
                              name="add_invoices"
                              onChange={handlePrivilegesChange}
                              checked={privileges.add_invoices}
                            />
                            <label
                              htmlFor="add_invoices"
                              className="form-form-label"
                            >
                              {" "}
                              Add/view invoices and accounts
                            </label>
                            <br></br>
                            <input
                              type="checkbox"
                              className="manage"
                              name="add_expenses"
                              onChange={handlePrivilegesChange}
                              checked={privileges.add_expenses}
                            />
                            <label
                              htmlFor="add_expenses"
                              className="form-form-label"
                            >
                              {" "}
                              Add/edit expenses and other revenue
                            </label>

                            <br></br>
                            <input
                              type="checkbox"
                              className="manage"
                              name="update_online_resources"
                              onChange={handlePrivilegesChange}
                              checked={privileges.update_online_resources}
                            />
                            <label
                              htmlFor="update_online_resources"
                              className="form-form-label"
                            >
                              {" "}
                              Can add/edit/delete online resources from the
                              school space
                            </label>

                            <br></br>
                            <input
                              type="checkbox"
                              className="manage"
                              name="edit_website"
                              onChange={handlePrivilegesChange}
                              checked={privileges.edit_website}
                            />
                            <label
                              htmlFor="edit_website"
                              className="form-form-label"
                            >
                              {" "}
                              Edit website and post news
                            </label>

                            <br></br>
                            <input
                              type="checkbox"
                              className="manage"
                              name="view_reports"
                              onChange={handlePrivilegesChange}
                              checked={privileges.view_reports}
                            />
                            <label
                              htmlFor="view_reports"
                              className="form-form-label"
                            >
                              {" "}
                              Create/View reports
                            </label>
                            <br></br>
                            <span>
                              Gives access to reports created by other
                              tutors/admins in the business (may contain
                              sensitive data).
                            </span>
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

export default StudentAdd;
