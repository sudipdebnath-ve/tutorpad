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
import { getParentDetailsList } from "../../../services/calenderService.js";
const StudentAdd = () => {
  const { fetchData, sidebarToggle, token, userId, fetchFamilies, allFamilies,  
    getStudentStatus,
    statusList, } = useUserDataContext();
  const [studentType, setStudentType] = useState("Child");
  const [studentFamily, setStudentFamily] = useState("New Family");
  const [showParentDetails, setShowParentDetails] = useState(true);
  const [getAllfamiliesDetails, showAllfamiliesDetails] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState(false);
  const [parentList, setParentList] = useState([]);
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("1");
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
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
    enable_login_access: "",
    referrer: "",
    subjects: "",
    skill: "",
    student_status: "active",
    studentType: "Child",
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
    family_account_id: "",
  });

  useEffect(() => {
    fetchFamilies();
    getStudentStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = `${formData.parentfirstname} ${formData.parentlastname}`;

    if (formData.studentType == "Child" && formData.studentFamily == "New Family") {
      const parentInfo = await getParentDetailsList(name);
      setParentList(parentInfo.data);
    }
    const stepMenuOne = document.querySelector(".formbold-step-menu1");
    const stepMenuTwo = document.querySelector(".formbold-step-menu2");

    const stepOne = document.querySelector(".formbold-form-step-1");
    const stepTwo = document.querySelector(".formbold-form-step-2");

    // const formSubmitBtn = document.querySelector(".formbold-btn");
    const formBackBtn = document.querySelector(".formbold-back-btn");

    let input = document.querySelectorAll("input[type=text]");
    let selectElements = document.querySelectorAll("select.form-control[name='family_account_id']");
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
        console.log("label", label.innerText);
        label.className = "formbold-form-label text-danger";
        req = true;

        label.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });

        setError((prev) => ({
          ...prev,
          [value?.name]: `The ${label.innerText} is required`,
        }));
      } else if (value.required && value.value) {
        console.log("value", value.value);
        value.className = "form-control";
        let label = document.getElementById(value.name);
        label.className = "formbold-form-label";
        setError((prev) => ({ ...prev, [value?.name]: "" }));
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
        let label = document?.getElementById(value?.name);
        label.className = "formbold-form-label text-danger";
        flagemail = true;
        label.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
        console.log("value?.name", value?.name);
        setError((prev) => ({
          ...prev,
          [value?.name]: `The ${label.innerText} is required`,
        }));
      } else if (value.required && value.value) {
        console.log("value", value.value);

        value.className = "form-control";
        let label = document.getElementById(value.name);
        label.className = "formbold-form-label";
        setError((prev) => ({ ...prev, [value?.name]: "" }));
      }
    }
    for (let [key, value] of Object.entries(selectElements)) {
      // console.log("value", value.value);
      if (
        value.required === true &&
        (value.value === "" || value.value === undefined)
      ) {
        // console.log("value.name", value.name);
        // console.log("value.value", value.value);

        value.className = "border-2 border-danger form-control";
        let label = document?.getElementById(value?.name);
        label.className = "formbold-form-label text-danger";
        flagemail = true;
        label.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
        console.log("value?.name", value?.name);
        setError((prev) => ({
          ...prev,
          [value?.name]: `The ${label.innerText} is required`,
        }));
      } else if (value.required && value.value) {
        console.log("value", value.value);

        value.className = "form-control";
        let label = document.getElementById(value.name);
        label.className = "formbold-form-label";
        setError((prev) => ({ ...prev, [value?.name]: "" }));
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

    if (name === "student_status") {
      setSelectedStatus(value);
    }
    if (name === "studentType") {
      setStudentType(value);
      if (value === "Adult") {
        setShowParentDetails(false);
        if(studentFamily === "New Family"){
          showAllfamiliesDetails(false);
        }
      } else {
        if(studentFamily === "New Family"){
          setShowParentDetails(true);
          showAllfamiliesDetails(false);
        }else{
          setShowParentDetails(false);
          showAllfamiliesDetails(true);
        }
        let emailfield = document?.querySelectorAll("input[type=email]");
        for (let [key, value] of Object.entries(emailfield)) {
          console.log("value", value.name);
          if (value?.name == "email") {
            value?.classList?.remove("border-danger", "border-2");
            let label = document?.getElementById(value?.name);
            label?.classList?.remove("text-danger");
          }
        }
      }
    }
    if(name == 'studentFamily'){
      setStudentFamily(value);
      if (value === "New Family") {
        if(studentType === "Child"){
          showAllfamiliesDetails(false);
          setShowParentDetails(true);
        }else{
          showAllfamiliesDetails(false);
          setShowParentDetails(false);
        }
      } else {
        setShowParentDetails(false);
        showAllfamiliesDetails(true);
      }
    }
    if (name === "enable_login_access") {
      var newVal = (value == "on") ? 1 : 0;
      formData["enable_login_access"] = newVal;
    }else{
      setFormData({ ...formData, [name]: value });
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    console.log(userId);

    if (!formData.hasOwnProperty("student_status")) {
      formData["student_status"] = selectedStatus;
    }
    if (!formData.hasOwnProperty("studentType")) {
      formData["studentType"] = studentType;
    }
    formData["user_id"] = userId;
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
        if (error.response.data.success === false) {
          setError(error.response.data.data);
        }
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
                    <Link to="/students"> Back to Students</Link>
                  </div>
                  <h1>Add New Student</h1>
                  <div className="formbold-form-wrapper">
                    <form name="myForm">
                      <div className="formbold-steps">
                        <ul>
                          <li className="formbold-step-menu1 active">
                            <span>1</span>
                            Student Details
                          </li>
                          <li className="formbold-step-menu2">
                            <span>2</span>
                            Confirm
                          </li>
                        </ul>
                      </div>

                      <div className="formbold-form-step-1 active">
                        <div className="formbold-input-flex">
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
                            <small className="input-error-message">
                              {error?.first_name?.length ? (
                                error.first_name
                              ) : (
                                <></>
                              )}
                            </small>
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
                            <small className="input-error-message">
                              {error?.last_name?.length ? (
                                error.last_name
                              ) : (
                                <></>
                              )}
                            </small>
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
                              {formData?.studentType == "Child" && (
                                <span> Optional</span>
                              )}
                            </label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              required={formData?.studentType == "Adult"}
                              onChange={handleChange}
                            />
                            <small className="input-error-message">
                              {error?.email?.length ? error.email : <></>}
                            </small>
                          </div>
                          <div className="smsCapable">
                            <div>
                              <label
                                htmlFor="phone"
                                className="formbold-form-label"
                                id="phone"
                              >
                                Phone Number <span> Optional</span>
                              </label>
                              <input
                                type="number"
                                name="phone"
                                className="form-control"
                                onChange={handleChange}
                              />
                              <small className="input-error-message">
                                {error?.phone?.length ? error.phone : <></>}
                              </small>
                            </div>
                            <input
                              type="checkbox"
                              className="sms"
                              name="sms"
                              onChange={handleChange}
                            />
                            SMS Capable
                          </div>
                        </div>
                        <div
                          className="addn-details"
                          onClick={handleAdditionalDetails}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                          <h6>
                            {" "}
                            {additionalDetails ? "Hide" : "Show"} Additional
                            Details
                          </h6>
                        </div>
                        {additionalDetails && (
                          <>
                            <div className="formbold-input-flex">
                            <div>
                                <label htmlFor="gender" className="formbold-form-label">
                                  Gender <span>Optional</span>
                                </label>
                                <select
                                  name="gender"
                                  className="form-control"
                                  // value={gender}
                                  onChange={handleChange}
                                >
                                  <option value="">Select Gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
                                  <option value="prefer_not_to_say">Prefer not to say</option>
                                </select>
                              </div>
                              <div>
                                <label
                                  htmlFor="dob"
                                  className="formbold-form-label"
                                >
                                  Date of Birth <span>Optional</span>
                                </label>
                                <input
                                  type="date"
                                  name="dob"
                                  className="form-control"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="formbold-input-flex">
                              <div>
                                <label
                                  htmlFor="customer_number"
                                  className="formbold-form-label"
                                >
                                  Customer Number <span>Optional</span>
                                </label>
                                <input
                                  type="text"
                                  name="customer_number"
                                  className="form-control"
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="special_id_number"
                                  className="formbold-form-label"
                                >
                                  Special Id Number <span>Optional</span>
                                </label>
                                <input
                                  type="text"
                                  name="special_id_number"
                                  className="form-control"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="formbold-input-flex">
                              <div>
                                <label
                                  htmlFor="school"
                                  className="formbold-form-label"
                                >
                                  School <span>Optional</span>
                                </label>
                                <input
                                  type="text"
                                  name="school"
                                  className="form-control"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="formbold-input-flex">
                              <div>
                                <label
                                  htmlFor="studentsince"
                                  className="formbold-form-label"
                                >
                                  Student Since <span>Optional</span>
                                </label>
                                <input
                                  type="date"
                                  name="studentsince"
                                  className="form-control"
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="referrer"
                                  className="formbold-form-label"
                                >
                                  Referrer <span>Optional</span>
                                </label>
                                <input
                                  type="text"
                                  name="referrer"
                                  className="form-control"
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
                                <small>
                                  Use a semicolon or press the Enter key to
                                  separate entries
                                </small>
                                <input
                                  type="text"
                                  name="subjects"
                                  className="form-control"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="formbold-input-flex">
                              <div>
                                <label
                                  htmlFor="skill"
                                  className="formbold-form-label"
                                >
                                  Skill Level <span>Optional</span>
                                </label>
                                <input
                                  type="text"
                                  name="skill"
                                  className="form-control"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="formbold-input-flex">
                              <div>
                                <label
                                  htmlFor="preferences"
                                  className="formbold-form-label"
                                >
                                  Preferences
                                </label>
                                <br></br>
                                <div className="preference">
                                  <input
                                    type="checkbox"
                                    name="emailpreference"
                                    onChange={handleChange}
                                  />
                                  Send email lesson reminders
                                </div>
                                <div className="preference">
                                  <input
                                    type="checkbox"
                                    name="smspreference"
                                    onChange={handleChange}
                                  />
                                  Send SMS lesson reminders
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        <br></br>
                        <div className="formbold-input-flex diff">
                          <div>
                            <div>
                              <label
                                htmlFor="student_status"
                                className="formbold-form-label"
                              >
                                Student Status
                              </label>
                            </div>
                            <div className="studentStatus">
                              {statusList.map((status) => {
                                return (
                                <div className="student-status">
                                  <input
                                    type="radio"
                                    className="status"
                                    name="student_status"
                                    onChange={handleChange}
                                    value={status.id}
                                    checked={selectedStatus == status.id}
                                  />
                                  <span style={{color: status.status_color, backgroundColor: status.bg_color}}> {status.status_title} </span>
                                </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <hr></hr>
                        <div className="formbold-input-flex diff">
                          <div>
                            <div>
                              <label
                                htmlFor="studentType"
                                className="formbold-form-label"
                              >
                                Student Type
                              </label>
                            </div>
                            <div className="studentStatus">
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="studentType"
                                  onChange={handleChange}
                                  value="Adult"
                                  checked={studentType === "Adult"}
                                />
                                Adult
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="studentType"
                                  onChange={handleChange}
                                  value="Child"
                                  checked={studentType === "Child"}
                                />
                                Child
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="formbold-input-flex diff">
                          <div>
                            <div>
                              <label
                                htmlFor="studentFamily"
                                className="formbold-form-label"
                              >
                                This student's family is a/an
                              </label>
                            </div>
                            <div className="studentFamily">
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="studentFamily"
                                  value="New Family"
                                  onChange={handleChange}
                                  checked={studentFamily === "New Family"}
                                />
                                New Family
                                <br />
                              </div>

                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="studentFamily"
                                  value="Existing Family"
                                  onChange={handleChange}
                                  checked={studentFamily === "Existing Family"}
                                />
                                Existing Family
                              </div>
                            </div>
                            <small className="d-block">
                              reates a new account in Families & Invoices
                            </small>
                          </div>
                        </div>
                        {showParentDetails && (
                          <>
                            <div className="formbold-input-flex">
                              <div>
                                <label
                                  htmlFor="parentfirstname"
                                  className="formbold-form-label"
                                  id="parentfirstname"
                                >
                                  Parent First Name
                                </label>
                                <input
                                  type="text"
                                  name="parentfirstname"
                                  className="form-control"
                                  onChange={handleChange}
                                  required
                                />
                                <small className="input-error-message">
                                  {error?.parentfirstname?.length ? (
                                    error.parentfirstname
                                  ) : (
                                    <></>
                                  )}
                                </small>
                              </div>
                              <div>
                                <label
                                  htmlFor="parentlastname"
                                  className="formbold-form-label"
                                  id="parentlastname"
                                >
                                  Parent Last name
                                </label>
                                <input
                                  type="text"
                                  name="parentlastname"
                                  className="form-control"
                                  onChange={handleChange}
                                  required
                                />
                                <small className="input-error-message">
                                  {error?.parentlastname?.length ? (
                                    error.parentlastname
                                  ) : (
                                    <></>
                                  )}
                                </small>
                              </div>
                            </div>
                            <div className="formbold-input-flex">
                              <div>
                                <label
                                  htmlFor="parentemail"
                                  className="formbold-form-label"
                                  id="parentemail"
                                >
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  name="parentemail"
                                  className="form-control"
                                  onChange={handleChange}
                                  required={formData?.studentType == "Child"}
                                />
                                <small className="input-error-message">
                                  {error?.parentemail?.length ? (
                                    error.parentemail
                                  ) : (
                                    <></>
                                  )}
                                </small>
                              </div>
                              <div className="smsCapable">
                                <label
                                  htmlFor="parentmobile"
                                  className="formbold-form-label"
                                >
                                  Mobile Number <span>Optional</span>
                                </label>
                                <input
                                  type="text"
                                  name="parentmobile"
                                  className="form-control"
                                  onChange={handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="sms"
                                  name="sms"
                                />
                                SMS Capable
                              </div>
                            </div>
                          </>
                        )}
                        {getAllfamiliesDetails && (
                          <>
                            <div className="formbold-input-flex">
                              <div>
                                <label
                                  htmlFor="family_account_id"
                                  className="formbold-form-label"
                                  id="family_account_id"
                                >
                                  Select Family
                                </label>
                                <select
                                  className="form-control"
                                  name="family_account_id"
                                  onChange={handleChange}
                                  required
                                >

                                  <option value={""}>Select Family</option>
                                  {allFamilies.map((item) => {
                                    return (
                                      <option value={item.id}>{item.name}</option>
                                    );
                                  })}
                                </select>
                                <small className="input-error-message">
                                  {error?.family_account_id?.length ? (
                                    error.family_account_id
                                  ) : (
                                    <></>
                                  )}
                                </small>
                              </div>
                            </div>
                          </>
                        )}
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
                        <div className="formbold-input-flex">
                          <div>
                            <label
                              htmlFor="parentpreferences"
                              className="formbold-form-label"
                            >
                              Preferences
                            </label>
                            <br></br>
                            <div className="preference">
                              <input
                                type="checkbox"
                                name="parentemailpreference"
                                onChange={handleChange}
                              />
                              Send email lesson reminders
                            </div>
                            <div className="preference">
                              <input
                                type="checkbox"
                                name="parentsmspreference"
                                onChange={handleChange}
                              />
                              Send SMS lesson reminders
                            </div>
                            <span>
                              Will only be sent if SMS messaging is allowed
                            </span>
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
                        <div className="formbold-input-flex">
                          <div>
                            <label
                              htmlFor="lessoncat"
                              className="formbold-form-label"
                            >
                              Default Lesson Category <span> Optional</span>
                            </label>
                            <select
                              name="lessoncat"
                              className="form-control"
                              onChange={handleChange}
                            >
                              <option>Group Lesson</option>
                              <option>Lesson</option>
                              <option>Vacation</option>
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="lessonlen"
                              className="formbold-form-label"
                            >
                              Default Lesson Length <span> Optional</span>
                            </label>
                            <input
                              type="text"
                              name="lessonlen"
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="formbold-input-flex diff">
                          <div>
                            <label
                              htmlFor="billing"
                              className="formbold-form-label"
                            >
                              Default Billing
                            </label>
                            <br></br>
                            <div className="preference">
                              <input
                                type="radio"
                                name="billing"
                                onChange={handleChange}
                                value="Don't automatically create any calendar-generated
                                charges"
                              />
                              Don't automatically create any calendar-generated
                              charges
                            </div>
                            <div className="preference">
                              <input
                                type="radio"
                                name="billing"
                                onChange={handleChange}
                                value="Student pays based on the number of lessons taken"
                              />
                              Student pays based on the number of lessons taken
                            </div>
                            <div className="preference">
                              <input
                                type="radio"
                                name="billing"
                                onChange={handleChange}
                                value="Student pays the same amount each month regardless
                                of number of lessons"
                              />
                              Student pays the same amount each month regardless
                              of number of lessons
                            </div>
                            <div className="preference">
                              <input
                                type="radio"
                                name="billing"
                                onChange={handleChange}
                                value="Student pays an hourly rate"
                              />
                              Student pays an hourly rate
                            </div>
                            <span>
                              Charges will automatically adjust to lesson length
                            </span>
                          </div>
                        </div>
                        <div className="formbold-input-flex">
                          <div>
                            <label
                              htmlFor="price"
                              className="formbold-form-label"
                            >
                              Price <span>per hour</span>
                            </label>
                            <input
                              type="number"
                              name="price"
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="formbold-input-flex diff">
                          <div>
                            <label
                              htmlFor="note"
                              className="formbold-form-label"
                            >
                              Note <span>Optional</span>
                            </label>
                            <br></br>
                            <span>
                              Use this area for any private notes you wish to
                              keep.
                            </span>
                            <textarea
                              name="note"
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="formbold-form-btn-wrapper">
                          <div className="btn-end">
                            <Link className="cancel" to="/students">
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
                        {parentList?.length > 0 && (
                          <div className="alert alert-md alert-warning">
                            <p>
                              <strong>This Parent Already Exist</strong>
                            </p>
                            <p>
                              You already have an parent under name,email or
                              phone number.
                            </p>
                            <p>
                              Choose an existing family below or ignore
                              duplicates.
                            </p>
                            {parentList.map((e) => {
                              return (
                                <p>
                                  <input
                                    type="radio"
                                    onChange={handleChange}
                                    name="family_account_id"
                                    value={e.id}
                                  />
                                  <span> {`${e.name}`}</span>
                                </p>
                              );
                            })}
                            <p>
                              <input
                                onChange={handleChange}
                                checked
                                type="radio"
                                name="family_account_id"
                                value={null}
                              />
                              <span> {`Ignore duplicate and continue`}</span>
                            </p>
                          </div>
                        )}
                        <h5>Set Up Automatic Invoicing</h5>
                        <p className="py-3">
                          You can set up automatic invoicing now, or you can set
                          it up later in the family account.
                        </p>
                        <div className="formbold-input-flex diff">
                          <div>
                            <div>
                              <label
                                htmlFor="invoicing"
                                className="formbold-form-label"
                              >
                                Would you like to set up automatic invoicing for
                                this family now?
                              </label>
                            </div>
                            <div className="invoicing">
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="invoicing"
                                  onChange={handleChange}
                                />
                                Yes
                                <br />
                              </div>

                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="invoicing"
                                  onChange={handleChange}
                                />
                                No
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <small className="input-error-message">
                            {error?.email?.length ? error.email[0] : <></>}
                          </small>
                        </div>
                        <div className="formbold-form-btn-wrapper">
                          <button className="formbold-back-btn">Back</button>
                          <div className="btn-end">
                            <Link className="cancel" to="/students">
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
