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
  const { fetchData, sidebarToggle, token, userId } = useUserDataContext();
  const [studentType, setStudentType] = useState("Child");
  const [showParentDetails, setShowParentDetails] = useState(true);
  const [additionalDetails, setAdditionalDetails] = useState(false);
  const [parentList, setParentList] = useState([]);
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("active");
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
    family_account_id:null,
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tutorPad"));
    if (!token) {
      navigate("/signin");
    } else {
      fetchData(token);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const name = `${formData.parentfirstname} ${formData.parentlastname}`;
    
    if(formData.studentType=="Child")
    {
      
      const parentInfo = await getParentDetailsList(name);
      setParentList(parentInfo.data)
      console.log("DATA=>",formData);
    }
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

    if (name === "student_status") {
      setSelectedStatus(value);
    } 
    if (name === "studentType") {
      setStudentType(value);
      if (value === 'Adult') {
        setShowParentDetails(false);
      } else {
        setShowParentDetails(true);
      }
    }

    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    console.log(userId);

    if(!formData.hasOwnProperty("student_status")){
      formData["student_status"] = selectedStatus;
    }
    if(!formData.hasOwnProperty("studentType")){
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
                                <label
                                  htmlFor="gender"
                                  className="formbold-form-label"
                                >
                                  Gender <span>Optional</span>
                                </label>
                                <input
                                  type="text"
                                  name="gender"
                                  className="form-control"
                                  onChange={handleChange}
                                />
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
                                  htmlFor="skype"
                                  className="formbold-form-label"
                                >
                                  Skype Username <span>Optional</span>
                                </label>
                                <input
                                  type="text"
                                  name="skype"
                                  className="form-control"
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="facetime"
                                  className="formbold-form-label"
                                >
                                  FaceTime ID <span>Optional</span>
                                </label>
                                <input
                                  type="text"
                                  name="facetime"
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
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="student_status"
                                  onChange={handleChange}
                                  value="active"
                                  checked={selectedStatus==="active"}
                                />
                                <span
                                  className="bg-design"
                                  style={{
                                    color: "#18790b",
                                    backgroundColor: "#b3f3b3bd",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Active
                                </span>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="student_status"
                                  onChange={handleChange}
                                  value="trial"
                                  checked={selectedStatus==="trial"}
                                />
                                <span
                                  className="bg-design"
                                  style={{
                                    color: "#005c5c",
                                    backgroundColor: "rgb(179 210 243 / 74%)",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Trial
                                </span>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="student_status"
                                  onChange={handleChange}
                                  value="Waiting"
                                  checked={selectedStatus==="Waiting"}
                                />
                                <span
                                  className="bg-design"
                                  style={{
                                    color: "#e34c00",
                                    backgroundColor: "rgb(253 232 222 / 74%)",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Waiting
                                </span>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="student_status"
                                  onChange={handleChange}
                                  value="Lead"
                                  checked={selectedStatus==="Lead"}
                                />
                                <span
                                  className="bg-design"
                                  style={{
                                    color: "#604274",
                                    backgroundColor: "rgb(238 205 249 / 74%)",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Lead
                                </span>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="student_status"
                                  onChange={handleChange}
                                  value="Inactive"
                                  checked={selectedStatus==="Inactive"}
                                />
                                <span
                                  className="bg-design"
                                  style={{
                                    color: "#344242",
                                    backgroundColor: "rgb(208 219 231 / 74%)",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Inactive
                                </span>
                              </div>
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
                                  checked={studentType === 'Adult'}
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
                                  checked={studentType === 'Child'}
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
                                  onChange={handleChange}
                                />
                                New Family
                                <br />
                              </div>

                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="studentFamily"
                                  onChange={handleChange}
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
                            />
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
                            />
                          </div>
                        </div>
                        <div className="formbold-input-flex">
                          <div>
                            <label
                              htmlFor="parentemail"
                              className="formbold-form-label"
                            >
                              Email Address <span>Optional</span>
                            </label>
                            <input
                              type="email"
                              name="parentemail"
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                          <div>
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
                            <input type="checkbox" className="sms" name="sms" />
                            SMS Capable
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
                        <div className="formbold-input-flex">
                          <div>
                            <label
                              htmlFor="lessoncat"
                              className="formbold-form-label"
                            >
                              Default Lesson Category
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
                              Default Lesson Length
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
                              type="text"
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
                        {
                          parentList?.length>0 && <div className="alert alert-md alert-warning">
                                                  <p><strong>This Parent Already Exist</strong></p>
                                                  <p>You already have an parent under name,email or phone number.</p>
                                                  <p>Choose an existing family below or ignore duplicates.</p>
                                                  {
                                                    parentList.map((e)=>{
                                                      return <p>
                                                                <input type="radio" onChange={handleChange} name="family_account_id" value={e.id} />
                                                                <span> {`${e.name}`}</span>
                                                              </p>
                                                    })
                                                  }
                                                  <p>
                                                    <input onChange={handleChange} checked type="radio" name="family_account_id" value={null} />
                                                      <span> {`Ignore duplicate and continue`}</span>
                                                  </p>
                                                </div>
                        }
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
                      <small style={{ color: "red" }}>
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
