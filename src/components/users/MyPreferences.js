import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import ReactModal from "react-modal";
import { API_URL } from "../../utils/config.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import payroll from "../users/assets/images/payroll.svg";

const MyPreferences = () => {
  const { userData, fetchData, sidebarToggle, token, userId } =
    useUserDataContext();
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    virtual_meeting: "",
    subjects: "",
    location: "",
  });

  // console.log(userData);
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
    // console.log(formData);
  };
  const formSubmit = async (e) => {
    console.log(formData);
    formData["user_id"] = userId;
    e.preventDefault();
    const config = {
      method: "PATCH",
      url: `${API_URL}user/savedata`,
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
          setIsOpen(false);
          window.location.reload(false);
        }, 2000);
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
              <div className="row d-flex">
                <div className="col-xl-4 col-xxl-4">
                  <div className="formbold-input-flex justify-content-center">
                    <div>
                      <label
                        htmlFor="photo"
                        className="formbold-form-label"
                        id="photo"
                      >
                        Photo <span>Optional</span>
                      </label>
                      <div className="initials py-3">
                        <div className="image-user">
                          <h2>SD</h2>
                        </div>
                      </div>
                      <input
                        type="file"
                        name="photo"
                        className="form-control b-none"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 col-xxl-8">
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
                            Share a link to Zoom, Google Meet, or any other
                            video conferencing application.
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
                          htmlFor="subject"
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
                        <label
                          htmlFor="location"
                          className="formbold-form-label"
                        >
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
                </div>
                <hr></hr>
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
          <ToastContainer />
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-4 col-xxl-4">
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
              <div className="col-xl-8 col-xxl-8">
                <div className="card">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingOne">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne"
                        >
                          <strong>General</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="student-properties-edit sec-acc">
                            <h3>Attendance Preferences</h3>

                            <div className="student-edit-user">
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <div className="formbold-input-flex">
                            <div>
                              <label
                                htmlFor="preferences"
                                className="formbold-form-label"
                              >
                                Overdue Attendance
                              </label>
                              <br></br>
                              <div
                                className="preference"
                                style={{ fontSize: "15px" }}
                              >
                                <input
                                  type="checkbox"
                                  name="overdue_attendence"
                                />
                                Show overdue attendance on homepage
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
                                  Default Notes View
                                </label>
                              </div>
                              <div className="input-radio">
                                <input
                                  type="radio"
                                  value="Student"
                                  selected
                                ></input>
                                Student
                                <input type="radio" value="Parent"></input>
                                Parent
                                <input type="radio" value="Private"></input>
                                Private
                              </div>
                            </div>
                          </div>

                          <div className="formbold-input-flex diff mb-0">
                            <div>
                              <label
                                htmlFor="preferences"
                                className="formbold-form-label"
                              >
                                Lesson Notes
                              </label>
                              <br></br>
                              <div
                                className="preference"
                                style={{ fontSize: "15px" }}
                              >
                                <input
                                  type="checkbox"
                                  name="automatically_copy_lesson"
                                />
                                Automatically copy lesson notes when I take
                                attendance
                              </div>
                            </div>
                          </div>

                          <div className="formbold-input-flex diff">
                            <div
                              className="input-radio"
                              style={{ fontSize: "15px" }}
                            >
                              <input
                                type="radio"
                                value="Student"
                                selected
                              ></input>
                              Copy from most recent event
                              <input type="radio" value="Parent"></input>
                              Copy from same category only
                            </div>
                          </div>
                        </div>
                        <div className="accordion-body pt-0">
                          <div className="student-properties-edit sec-acc">
                            <h3>Email Notification Preferences</h3>

                            <div className="student-edit-user">
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>

                          <small className="small">
                            Select what you'd like to be notified about via
                            email and how often
                          </small>
                          <div className="make-pad pb-3">
                            <div className="input-check">
                              <input type="checkbox"></input>
                              When any student registers for a lesson/event
                              through the Student Portal
                            </div>
                            <div className="input-check">
                              <input type="checkbox"></input>
                              When any student cancels a lesson/event through
                              the Student Portal
                            </div>
                            <div className="input-check">
                              <input type="checkbox"></input>
                              When any parent or student completes the sign-up
                              form
                            </div>
                            <div className="input-check">
                              <input type="checkbox"></input>
                              When any parent or student disables email
                              reminders
                            </div>
                            <div className="input-check">
                              <input type="checkbox"></input>
                              Allow students to email me from the Study Log
                            </div>
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
                <div className="card">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseTwo"
                          aria-expanded="false"
                          aria-controls="flush-collapseTwo"
                        >
                          <strong>Availablity</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingTwo"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="student-properties-edit sec-acc">
                            <h3>Availability</h3>

                            <button
                              className="formbold-btn"
                              style={{ fontSize: "14px", padding: "6px 16px" }}
                            >
                              <i
                                style={{ color: "#ffffff" }}
                                className="fa fa-plus"
                                aria-hidden="true"
                              ></i>
                              Add
                            </button>
                          </div>
                          <div className="formbold-input-flex">
                            <span style={{ lineHeight: "1.6" }}>
                              Enter your tutoring availability here to provide a
                              visual cue of your availability on the calendar
                              (visible in "Day" view or "Timeline" view).
                              Setting your availability will not add or remove
                              lessons from the calendar, or prevent lessons from
                              being scheduled outside of these days/times.
                            </span>
                          </div>

                          <p>
                            You haven't added your tutoring availability yet
                          </p>

                          {/* <div className="formbold-form-btn-wrapper">
                            <div className="btn-end">
                              <Link className="cancel" to="/students">
                                <i
                                  className="fa fa-exchange"
                                  aria-hidden="true"
                                ></i>
                                Change Family
                              </Link>

                              <button className="formbold-btn">
                                <i
                                  style={{ color: "#ffffff" }}
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                ></i>
                                Add Another Contact
                              </button>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseThree"
                          aria-expanded="false"
                          aria-controls="flush-collapseThree"
                        >
                          <strong>Payroll</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingThree"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="row">
                            <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                              <div className="flex-fill w-100">
                                <div className="py-3">
                                  <div className="chart chart-xs payroll-img">
                                    <img src={payroll}></img>
                                  </div>
                                </div>
                                <h6 className="text-center">
                                  <strong>
                                    You haven't added any payroll entries yet
                                  </strong>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
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
