import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import ReactModal from "react-modal";
import { API_URL } from "../../utils/config.js";
import axios from "axios";

const MyPreferences = () => {
  const { userData, fetchData, sidebarToggle, token, userId } =
    useUserDataContext();
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    phone: "",
    address: "",
    virtual_meeting: "",
    subjects: "",
    location: "",
  });

  console.log(userData);
  const customStyles = {
    content: {
      width: "60%",
      height: "80%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      background: "#6c5a5669",
    },
  };

  // ReactModal.setAppElement("#yourAppElement");

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tutorPad"));
    if (!token) {
      navigate("/signin");
    } else {
      fetchData(token);
    }
  }, []);

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
    console.log(formData);
  };
  const formSubmit = async (e) => {
    console.log(userId);
    formData["user_id"] = userId;
    e.preventDefault();
    const config = {
      method: "POST",
      url: `${API_URL}user/create-student`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    };
    await axios(config)
      .then((response) => {
        console.log(response);

        // setTimeout(() => {
        //   navigate("/students");
        // }, 2000);
      })
      .catch((error) => {
        console.log(error);
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

        <ReactModal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="mypreference-modal">
            <div className="close-h">
              <h4>Edit Profile</h4>
              <button className="closeModal" onClick={closeModal}>
                X
              </button>
            </div>
            <form name="studentProfile">
              <div className="formbold-form-step-1 active">
                <div className="formbold-input-flex diff">
                  <div>
                    <label htmlFor="title" className="formbold-form-label">
                      Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                </div>
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
                      placeholder={formData?.first_name}
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
                        Phone Number <span>Optional</span>
                      </label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
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
                <div className="formbold-input-flex diff">
                  <div>
                    <label
                      htmlFor="parentaddress"
                      className="formbold-form-label"
                    >
                      Virtual Meeting <span>Optional</span>
                      <br></br>
                      <span>
                        Share a link to Zoom, Google Meet, or any other video
                        conferencing application.
                      </span>
                    </label>
                    <br></br>

                    <input
                      type="text"
                      name="virtual_meeting"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="formbold-input-flex diff">
                  <div>
                    <label
                      htmlFor="parentaddress"
                      className="formbold-form-label"
                    >
                      Subjects <span>Optional</span>
                      <br></br>
                      <span>
                        Use a semicolon or press the Enter key to separate
                        entries
                      </span>
                    </label>
                    <br></br>

                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="formbold-input-flex diff">
                  <div>
                    <label htmlFor="location" className="formbold-form-label">
                      Preferred Location
                    </label>
                    <select
                      name="location"
                      className="form-control"
                      onChange={handleChange}
                    >
                      <option>First Available Location</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="formbold-form-step-2">
                <div className="formbold-form-btn-wrapper">
                  <div className="btn-end">
                    <Link className="cancel" to="/students">
                      Cancel
                    </Link>

                    <button className="formbold-btn" onClick={formSubmit}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ReactModal>

        <main className="content">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-5 col-xxl-5">
                <div className="card">
                  <div className="card-body">
                    <div className="initials">
                      <div className="image-user">
                        <h2>SD</h2>
                      </div>
                    </div>
                    <div className="edit-user" onClick={openModal}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </div>

                    <div className="title-user">
                      {userData.first_name} {userData.last_name}
                    </div>
                    <div className="email-user">
                      <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
                      {userData.email}
                    </div>
                    <div className="location-user">
                      <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                      First Available Location
                    </div>
                    <div className="logout-user">
                      <Link to="#" className="logout">
                        Log Out of All Devices
                      </Link>
                      <Link to="#">Change Password</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-xxl-7">
                <div className="card">
                  <div className="card-body attendance">
                    <h3>Attendance Preferences</h3>
                    <div className="attendance-user">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </div>
                    <br></br>
                    <h5>
                      <strong>Overdue Attendance</strong>
                    </h5>
                    <div className="input-check">
                      <input type="checkbox"></input>
                      Show overdue attendance on homepage
                    </div>
                    <h5>
                      <strong>Default Notes View</strong>
                    </h5>
                    <div className="input-radio">
                      <input type="radio" value="Student" selected></input>
                      Student
                      <input type="radio" value="Parent"></input>Parent
                      <input type="radio" value="Private"></input>Private
                    </div>
                    <h5>
                      <strong>Lesson Notes</strong>
                    </h5>
                    <div className="input-check">
                      <input type="checkbox"></input>
                      Automatically copy lesson notes when I take attendance
                    </div>
                    <div className="input-radio">
                      <input
                        type="radio"
                        value="Copy from most
                      recent event"
                      ></input>
                      Copy from most recent event
                      <input
                        type="radio"
                        value="Copy from same
                      category only"
                      ></input>
                      Copy from same category only
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex">
              <div className="col-xl-5 col-xxl-5">
                <div className="card">
                  <div className="card-body default-set">
                    <h3>Default Settings</h3>
                    <div className="attendance-user">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </div>
                    <h5>
                      <strong>Default Lesson Category</strong>
                    </h5>
                    <span>Lesson</span>
                    <h5>
                      <strong>Default Lesson Duration</strong>
                    </h5>
                    <span>30 Minutes</span>
                    <h5>
                      <strong>Default Billing</strong>
                    </h5>
                    <span>
                      Student pays based on the number of lessons taken
                    </span>
                    <h5>
                      <strong>Default Lesson Price</strong>
                    </h5>
                    <span>₹ 30.00</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-xxl-7">
                <div className="card">
                  <div className="card-body email-notification">
                    <h3>Email Notification Preferences</h3>
                    <div className="attendance-user">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </div>
                    <small className="small">
                      Select what you'd like to be notified about via email and
                      how often
                    </small>
                    <div className="input-check">
                      <input type="checkbox"></input>
                      When any student registers for a lesson/event through the
                      Student Portal
                    </div>
                    <div className="input-check">
                      <input type="checkbox"></input>
                      When any student cancels a lesson/event through the
                      Student Portal
                    </div>
                    <div className="input-check">
                      <input type="checkbox"></input>
                      When any parent or student completes the sign-up form
                    </div>
                    <div className="input-check">
                      <input type="checkbox"></input>
                      When any parent or student disables email reminders
                    </div>
                    <div className="input-check">
                      <input type="checkbox"></input>
                      Allow students to email me from the Study Log
                    </div>
                    <div className="email-pad-top">
                      <h5>
                        <strong>Email Daily Agenda</strong>
                      </h5>
                      <div className="input-radio">
                        <input type="radio" value="Day Before"></input>
                        Day Before
                        <br />
                        Between 16:00 and 23:00
                        <input type="radio" value="Same Day"></input>
                        Same Day
                        <br />
                        Between 0:00 and 15:00
                        <input type="radio" value="Don't Email"></input>
                        Don't Email
                      </div>
                    </div>
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

export default MyPreferences;
