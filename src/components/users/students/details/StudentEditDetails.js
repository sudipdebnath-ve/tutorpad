import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MiniSidebar from "../../../sidebar/MiniSidebar.js";
import Sidebar from "../../../sidebar/Sidebar.js";
import TopBar from "../../../sidebar/TopBar.js";
import "./assets/css/style.css";
import { useUserDataContext } from "../../../../contextApi/userDataContext.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../../utils/config.js";
import instructors from "../../assets/images/Instructors.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FetchStudyLog from "../FetchStudyLog.js";
import FetchAttendanceLog from "../FetchAttendanceLog.js";
import lending from "../assets/images/lending.svg";
import ReactModal from "react-modal";

const StudentEditDetails = () => {
  const { sidebarToggle, token, setLoading } = useUserDataContext();
  const [initial, setInitial] = useState("");
  const [todayDate, setTodayDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [studentFetchData, setStudentFetchData] = useState({});
  const [modalIsOpen, setIsOpens] = useState(false);

  let { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const fetchStudentDetails = async (id) => {
    setLoading(true);
    console.log(id);
    const validateconfig = {
      method: "GET",
      url: `${API_URL}user/student/details/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        user_id: id,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        console.log(response.data);
        setStudentFetchData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  };

  useEffect(() => {
    fetchStudentDetails(id);
  }, [id]);

  useEffect(() => {
    var name = `${studentFetchData.first_name}${" "}${
      studentFetchData.last_name
    }`;

    var parts = name.split(" ");
    var initials = "";
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== "") {
        initials += parts[i][0];
      }
    }
    setInitial(initials);
    let today = new Date();
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    setStartDate(date);
  }, [studentFetchData]);

  const handleChange = (e) => {
    setIsOpen(!isOpen);
    console.log(e);
    let today = new Date(e);
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    setTodayDate(date);
    setStartDate(date);
    console.log(date);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

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
  const passwordStyles = {
    content: {
      width: "60%",
      height: "60%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
    },
    overlay: {
      background: "#6c5a5669",
    },
  };

  // ReactModal.setAppElement("#yourAppElement");

  function openModal() {
    setIsOpens(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpens(false);
  }

  console.log(modalIsOpen);
  return (
    <div className="wrapper student-details">
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
                      <label htmlFor="photo" className="formbold-form-label">
                        Photo <span>Optional</span>
                      </label>
                      <div className="initials py-3">
                        <div className="image-user">
                          <h2>{initial}</h2>
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
                    <Link className="cancel" onClick={closeModal}>
                      Cancel
                    </Link>

                    <button className="formbold-btn">Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ReactModal>
        <main className="content">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-4 col-xxl-4">
                <div className="card">
                  <div className="card-body">
                    <div className="initials">
                      <div className="image-user">
                        <h2>{initial && initial.toLocaleUpperCase()}</h2>
                      </div>
                    </div>
                    <div className="edit-user" onClick={openModal}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </div>

                    <div className="title-user">
                      {studentFetchData?.first_name}{" "}
                      {studentFetchData?.last_name}
                    </div>
                    {studentFetchData?.student_status && (
                      <>
                        <div className="active-user">
                          <span className="active">
                            {studentFetchData?.student_status}
                          </span>
                        </div>
                      </>
                    )}

                    <div className="link-to-family">
                      <Link to={"/"}>View Family Account</Link>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="arrange-edit-sign">
                      <h3>Notes</h3>
                      <div className="student-edit-user">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </div>
                    </div>
                    <span>
                      Click the edit button to add a private note about this
                      student
                    </span>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="arrange-edit-sign">
                      <h3>Attachments</h3>
                      <div className="student-edit-user add">
                        <i className="fa fa-plus" aria-hidden="true"></i> Add
                      </div>
                    </div>
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
                          <strong>Student Overview</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="student-properties-edit">
                            <h3>Student Overview</h3>
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
                                Preferences
                              </label>
                              <br></br>
                              <div className="preference">
                                <input type="checkbox" name="emailpreference" />
                                Send email lesson reminders
                              </div>
                              <div className="preference">
                                <input type="checkbox" name="smspreference" />
                                Send SMS lesson reminders
                              </div>
                              <span style={{ paddingLeft: "23px" }}>
                                Will only be sent if SMS messaging is allowed
                              </span>
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
                          <strong>Family Contacts</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingTwo"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="student-properties-edit">
                            {studentFetchData?.parentfirstname !== null &&
                            studentFetchData?.parentlastname !== null ? (
                              <>
                                <h3>
                                  {`${studentFetchData?.parentfirstname}, ${studentFetchData?.parentlastname}`}
                                </h3>
                              </>
                            ) : (
                              <>
                                <strong>Parents Name not submitted</strong>
                              </>
                            )}

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
                                Preferences
                              </label>
                              <br></br>
                              <div className="preference">
                                <input type="checkbox" name="emailpreference" />
                                Set as the preferred invoice recipient
                              </div>
                              <div className="preference">
                                <input type="checkbox" name="smspreference" />
                                Show in Student Portal contacts
                              </div>
                              <div className="preference">
                                <input type="checkbox" name="emailpreference" />
                                Send email lesson reminders
                              </div>
                              <div className="preference">
                                <input type="checkbox" name="smspreference" />
                                Send SMS lesson reminders
                              </div>
                              <span style={{ paddingLeft: "23px" }}>
                                Will only be sent if SMS messaging is allowed
                              </span>
                            </div>
                          </div>
                          <hr></hr>
                          <div className="formbold-form-btn-wrapper">
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
                      <h2 className="accordion-header" id="flush-headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseThree"
                          aria-expanded="false"
                          aria-controls="flush-collapseThree"
                        >
                          <strong>Assigned Tutors</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingThree"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <h3>Assigned Tutors</h3>

                          <div className="row">
                            <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                              <div className="flex-fill w-100">
                                <div className="py-3">
                                  <div className="chart chart-xs">
                                    <img src={instructors}></img>
                                  </div>
                                </div>
                                <h5>
                                  <strong>
                                    There aren't any tutors assigned to this
                                    student
                                  </strong>
                                </h5>
                                <hr></hr>
                                <div className="formbold-form-btn-wrapper">
                                  <div className="btn-end">
                                    <button className="formbold-btn">
                                      <i
                                        style={{ color: "#ffffff" }}
                                        className="fa fa-plus"
                                        aria-hidden="true"
                                      ></i>
                                      Assign Tutor
                                    </button>
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
                <div className="card">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingFour">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseFour"
                          aria-expanded="false"
                          aria-controls="flush-collapseFour"
                        >
                          <strong>Study Log</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingFour"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="calculate-study">
                            <div>
                              <div className="days-studied">
                                <i
                                  className="fa fa-calendar"
                                  aria-hidden="true"
                                ></i>{" "}
                                <h5>Days Studied</h5>
                              </div>
                              <span>
                                1 day this week <br></br>1 day in the last 30
                                days
                              </span>
                            </div>
                            <div>
                              <div className="hours-studied">
                                <i
                                  className="fa fa-clock"
                                  aria-hidden="true"
                                ></i>{" "}
                                <h5>Hours Studied</h5>
                              </div>
                              <span>
                                0:10 hours this week{" "}
                                <i
                                  className="fa fa-long-arrow-up"
                                  aria-hidden="true"
                                ></i>{" "}
                                <emp>100%</emp>
                                <br></br>0:10 hours in the last 30 days
                              </span>
                            </div>
                            <div>
                              <div className="average-study">
                                <i
                                  className="fa fa-bar-chart"
                                  aria-hidden="true"
                                ></i>{" "}
                                <h5>Average Study Time</h5>
                              </div>
                              <span>
                                0:10 hours this week{" "}
                                <i
                                  className="fa fa-long-arrow-up"
                                  aria-hidden="true"
                                ></i>{" "}
                                <emp>100%</emp>
                                <br></br>0:10 hours in the last 30 days
                              </span>
                            </div>
                            <div className="student-edit-user">
                              <i className="fa fa-cog" aria-hidden="true"></i>
                            </div>
                          </div>
                          <div className="calendar-body">
                            <h5>
                              {studentFetchData?.first_name}'s Study Log as of{" "}
                              <emp>{startDate ? startDate : "no"}</emp>{" "}
                              <i
                                onClick={handleClick}
                                className="fa fa-caret-down"
                                aria-hidden="true"
                              >
                                {isOpen && (
                                  <DatePicker
                                    selected={todayDate}
                                    onChange={handleChange}
                                    inline
                                  />
                                )}
                              </i>
                            </h5>
                            <a className="addnew" href="#" role="button">
                              <i className="fa fa-plus" aria-hidden="true"></i>
                              Add Time
                            </a>

                            <FetchStudyLog />
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
                      <h2 className="accordion-header" id="flush-headingFive">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseFive"
                          aria-expanded="false"
                          aria-controls="flush-collapseFive"
                        >
                          <strong>Attendence and Notes</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseFive"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingFive"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="student-properties-edit">
                            <h3>Average attendance for last 90 days</h3>
                          </div>
                          <div className="avg-attend">
                            <div className="avg-data">
                              <span>0</span>
                              <span>Present</span>
                            </div>
                            <div className="avg-data">
                              <span>0</span>
                              <span>Unrecorded</span>
                            </div>
                            <div className="avg-data">
                              <span>0</span>
                              <span>Student Absences</span>
                            </div>
                            <div className="avg-data">
                              <span>0</span>
                              <span>Total Events</span>
                            </div>
                          </div>
                          <div className="formbold-form-btn-wrapper">
                            <div className="btn-end">
                              <button className="formbold-btn">
                                <i
                                  style={{ color: "#ffffff" }}
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                ></i>
                                Create Report
                              </button>
                            </div>
                          </div>
                          <div className="calendar-body">
                            <h5>
                              {studentFetchData?.first_name}'s attendance
                              records as of{" "}
                              <emp>{startDate ? startDate : "no"}</emp>{" "}
                              <i
                                onClick={handleClick}
                                className="fa fa-caret-down"
                                aria-hidden="true"
                              >
                                {isOpen && (
                                  <DatePicker
                                    selected={todayDate}
                                    onChange={handleChange}
                                    inline
                                  />
                                )}
                              </i>
                            </h5>

                            <FetchAttendanceLog />
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
                      <h2 className="accordion-header" id="flush-headingSix">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseSix"
                          aria-expanded="false"
                          aria-controls="flush-collapseSix"
                        >
                          <strong>Message History</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseSix"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingSix"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="col-xl-12 col-xxl-12">
                            <h5>
                              <strong>Messages from the </strong>
                              <select className="mes-history-drop">
                                <option>Last 3 Months</option>
                                <option>Last 6 Months</option>
                                <option>Last Year</option>
                                <option>Entire History</option>
                                <option>Scheduled Queue (Upcoming)</option>
                              </select>
                            </h5>
                          </div>
                          <div className="col-xl-12 col-xxl-12">
                            <div className="tab-content" id="myTabContent">
                              <div
                                className="tab-pane fade show active"
                                id="home"
                                role="tabpanel"
                                aria-labelledby="home-tab"
                              >
                                <div className="row">
                                  <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                                    <div className="flex-fill w-100">
                                      <div className="card-body d-flex">
                                        <div className="align-self-center w-100">
                                          <div className="py-3">
                                            <div className="chart chart-xs">
                                              <img
                                                src={lending}
                                                alt="lending"
                                              ></img>
                                            </div>
                                          </div>
                                          <h5 style={{ textAlign: "center" }}>
                                            <strong>
                                              You haven't sent any emails or SMS
                                              messages during this time
                                            </strong>
                                          </h5>
                                          <div class="position-set">
                                            <div className="add-message">
                                              <i
                                                className="fa fa-plus"
                                                aria-hidden="true"
                                              ></i>
                                              <Link
                                                className="btn"
                                                role="button"
                                              >
                                                Create New Message
                                              </Link>
                                              <i
                                                class="fa fa-caret-down"
                                                aria-hidden="true"
                                              ></i>
                                            </div>
                                            {/* {createMessage && (
                                              <>
                                                <div
                                                  className="create-mes dropdown-menu addNewDropdown"
                                                  aria-labelledby="dropdownMenuLink"
                                                >
                                                  <Link
                                                    className="dropdown-item"
                                                    to="/students"
                                                  >
                                                    <i
                                                      class="fa fa-envelope"
                                                      aria-hidden="true"
                                                    ></i>
                                                    Email Student
                                                  </Link>
                                                  <div className="dropdown-divider"></div>
                                                  <Link
                                                    className="dropdown-item"
                                                    to="/students/message-history"
                                                  >
                                                    <i
                                                      class="fa fa-envelope"
                                                      aria-hidden="true"
                                                    ></i>
                                                    Email All{" "}
                                                  </Link>
                                                </div>
                                              </>
                                            )} */}
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
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingSeven">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseSeven"
                          aria-expanded="false"
                          aria-controls="flush-collapseSeven"
                        >
                          <strong>Student Portal</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseSeven"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingSeven"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="access">
                            <h3>Student Access</h3>
                            <span>Disabled</span>
                          </div>
                          <p>Set up Student Portal access for this student</p>

                          <div className="student-access">
                            <i
                              class="fa fa-exclamation-triangle"
                              aria-hidden="true"
                            ></i>

                            <strong>
                              If you'd like this student to have their own
                              access to the Portal, you'll first need to provide
                              an email address in their profile.
                            </strong>
                          </div>
                          <hr></hr>
                          <div className="access">
                            <h3>Parent Access</h3>
                            <span>Disabled</span>
                          </div>
                          <p>
                            Set up Student Portal access for this student's
                            parents
                          </p>

                          <div className="student-access">
                            <i
                              class="fa fa-exclamation-triangle"
                              aria-hidden="true"
                            ></i>

                            <strong>
                              Please provide an email address for this parent
                              first
                            </strong>
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

export default StudentEditDetails;
