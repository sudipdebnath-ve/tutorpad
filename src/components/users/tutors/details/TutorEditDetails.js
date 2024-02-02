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
import students from "../../assets/images/students.svg"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FetchStudyLog from "../FetchStudyLog.js";
import FetchAttendanceLog from "../FetchAttendanceLog.js";
import lending from "../assets/images/lending.svg";
import ReactModal from "react-modal";
import { ToastContainer, toast } from "react-toastify";

const TutorEditDetails = () => {
  const { sidebarToggle, token, setLoading,userData,getAvailabilityData,
    allAvailabilityData, } = useUserDataContext();
  const [initial, setInitial] = useState("");
  const [todayDate, setTodayDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [tutorFetchData, setTutorFetchData] = useState({});
  const [modalIsOpen, setIsOpens] = useState(false);
  const [error, setError] = useState({});
  const [availFlag, setAvailFlag] = useState(false);
  const [availData, setAvailData] = useState({});
  const [days, setDays] = useState({});
  const [editA, setEditA] = useState({});
  const [selectedDays, setSelectedDays] = useState([]);


  let { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const fetchTutorDetails = async (id) => {
    setLoading(true);
    console.log(id);
    const validateconfig = {
      method: "GET",
      url: `${API_URL}tutor/details/${id}`,
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
        setTutorFetchData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  };

  useEffect(() => {
    fetchTutorDetails(id);
  }, [id]);

  useEffect(() => {
    var name = `${tutorFetchData.first_name}${" "}${
      tutorFetchData.last_name
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
  }, [tutorFetchData]);

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

  const handleAvailChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (
      name === "sun" ||
      name === "mon" ||
      name === "tue" ||
      name === "wed" ||
      name === "thu" ||
      name === "fri" ||
      name === "sat"
    ) {
      setDays({ ...days, [name]: value });
    } else {
      setAvailData({ ...availData, [name]: value });
    }
  };

  const formAvailSubmit = async () => {
    availData["user_id"] = userData.id;
    let arr = Object.values(days);
    let allday = arr.toString();
    availData["days"] = allday;

    console.log(availData);

    const config = {
      method: "POST",
      url: `${API_URL}add-availability`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: availData,
    };
    await axios(config)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setAvailFlag(false);
        allAvailabilityData();
      })
      .catch((error) => {
        console.log(error.response.data.data);
        if (error.response.data.success === false) {
          setError(error.response.data.data);
        }
      });
  };

  const editAvailability = async (id) => {
    openModal("updateAvail");

    const config = {
      method: "GET",
      url: `${API_URL}get-availability/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(config)
      .then((response) => {
        console.log(response.data.data);
        setEditA(response.data.data);
        availData["start_date"] = response.data.data.start_date;
        availData["end_date"] = response.data.data.end_date;
        availData["start_time"] = response.data.data.start_time;
        availData["end_time"] = response.data.data.end_time;
        availData["note"] = response.data.data.note;
        days["days"] = JSON.parse(response.data.data.days);
        setSelectedDays(JSON.parse(response.data.data.days));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAvailability = async (id) => {
    const config = {
      method: "DELETE",
      url: `${API_URL}delete-availability/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(id);
    await axios(config)
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        allAvailabilityData();
      })
      .catch((error) => {
        console.log(error);
      });
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
                      {tutorFetchData?.first_name}{" "}
                      {tutorFetchData?.last_name}
                    </div>
                    {tutorFetchData?.tutor_status && (
                      <>
                        <div className="active-user">
                          <span className="active">
                            {tutorFetchData?.tutor_status}
                          </span>
                        </div>
                      </>
                    )}

                    <div className="link-to-family">
                      {/* <Link to={"/"}>View Account</Link> */}
                      <div>
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                      <sapn>{" "}{tutorFetchData?.email}</sapn>
                      </div>
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
                      tutor
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
                {/* <div className="card">
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
                          <strong>Tutor Overview</strong>
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
                            <h3>Tutor Overview</h3>
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
                </div> */}
                {/* <div className="card">
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
                          <strong>Tutor Contacts</strong>
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
                            {tutorFetchData?.parentfirstname !== null &&
                            tutorFetchData?.parentlastname !== null ? (
                              <>
                                <h3>
                                  {`${tutorFetchData?.parentfirstname}, ${tutorFetchData?.parentlastname}`}
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
                </div> */}
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
                          <strong>Assigned Students</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingThree"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <h3>Assigned Students</h3>

                          <div className="row">
                            <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                              <div className="flex-fill w-100">
                                <div className="py-3">
                                  <div className="chart chart-xs">
                                    <img src={students}></img>
                                  </div>
                                </div>
                                <h5>
                                  <strong>
                                    There aren't any student assigned to this
                                    tutor
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
                                      Assign Student
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
                      <h2 className="accordion-header" id="flush-headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseTwo"
                          aria-expanded="false"
                          aria-controls="flush-collapseTwo"
                        >
                          <strong>Payroll</strong>
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
                            {tutorFetchData?.parentfirstname !== null &&
                            tutorFetchData?.parentlastname !== null ? (
                              <>
                                <h3>
                                  {`${tutorFetchData?.parentfirstname}, ${tutorFetchData?.parentlastname}`}
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
                              onClick={(e) => setAvailFlag(!e.target.value)}
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
                          {availFlag && (
                            <>
                              <div className="availablity">
                                <div className="formbold-input-flex diff">
                                  <div>
                                    <label
                                      htmlFor="availability"
                                      className="formbold-form-label"
                                    >
                                      Add Availability
                                    </label>
                                  </div>
                                </div>
                                <div className="formbold-input-flex diff">
                                  <div>
                                    <div>
                                      <label
                                        htmlFor="days"
                                        className="formbold-form-label"
                                      >
                                        Days
                                      </label>
                                    </div>
                                    <small style={{ color: "red" }}>
                                      {error?.days?.length ? (
                                        error?.days[0]
                                      ) : (
                                        <></>
                                      )}
                                    </small>
                                    <div className="studentStatus">
                                      <div>
                                        <input
                                          type="checkbox"
                                          className="status"
                                          name="sun"
                                          value="Sun"
                                          onChange={handleAvailChange}
                                        />
                                        Sun
                                      </div>
                                      <div>
                                        <input
                                          type="checkbox"
                                          className="status"
                                          name="mon"
                                          value="Mon"
                                          onChange={handleAvailChange}
                                        />
                                        Mon
                                      </div>
                                      <div>
                                        <input
                                          type="checkbox"
                                          className="status"
                                          name="tue"
                                          value="Tue"
                                          onChange={handleAvailChange}
                                        />
                                        Tue
                                      </div>
                                      <div>
                                        <input
                                          type="checkbox"
                                          className="status"
                                          name="wed"
                                          value="Wed"
                                          onChange={handleAvailChange}
                                        />
                                        Wed
                                      </div>
                                      <div>
                                        <input
                                          type="checkbox"
                                          className="status"
                                          name="thu"
                                          value="Thu"
                                          onChange={handleAvailChange}
                                        />
                                        Thu
                                      </div>
                                      <div>
                                        <input
                                          type="checkbox"
                                          className="status"
                                          name="fri"
                                          value="Fri"
                                          onChange={handleAvailChange}
                                        />
                                        Fri
                                      </div>
                                      <div>
                                        <input
                                          type="checkbox"
                                          className="status"
                                          name="sat"
                                          value="Sat"
                                          onChange={handleAvailChange}
                                        />
                                        Sat
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="formbold-input-flex">
                                  <div>
                                    <label
                                      htmlFor="start_date"
                                      className="formbold-form-label"
                                    >
                                      Start Date <span>Optional</span>
                                    </label>
                                    <input
                                      type="date"
                                      name="start_date"
                                      className="form-control"
                                      onChange={handleAvailChange}
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="end_date"
                                      className="formbold-form-label"
                                    >
                                      End Date <span>Optional</span>
                                    </label>
                                    <input
                                      type="date"
                                      name="end_date"
                                      className="form-control"
                                      onChange={handleAvailChange}
                                    />
                                  </div>
                                </div>
                                <small style={{ color: "red" }}>
                                  {error?.end_date?.length ? (
                                    error?.end_date[0]
                                  ) : (
                                    <></>
                                  )}
                                </small>
                                <div className="formbold-input-flex">
                                  <div>
                                    <label
                                      htmlFor="start_time"
                                      className="formbold-form-label"
                                    >
                                      Start Time
                                    </label>
                                    <input
                                      type="time"
                                      name="start_time"
                                      className="form-control"
                                      onChange={handleAvailChange}
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="end_time"
                                      className="formbold-form-label"
                                    >
                                      End Time
                                    </label>
                                    <input
                                      type="time"
                                      name="end_time"
                                      className="form-control"
                                      onChange={handleAvailChange}
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

                                    <textarea
                                      name="note"
                                      className="form-control"
                                      onChange={handleAvailChange}
                                    />
                                  </div>
                                </div>
                                <div className="formbold-form-btn-wrapper justify-content-end">
                                  <div className="btn-end">
                                    <Link
                                      className="cancel"
                                      onClick={() => setAvailFlag(false)}
                                    >
                                      Cancel
                                    </Link>

                                    <button
                                      className="formbold-btn"
                                      onClick={formAvailSubmit}
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {!availFlag && (
                            <>
                              {getAvailabilityData?.map((item, index) => {
                                let day = JSON.parse(item.days);
                                return (
                                  <div
                                    className="edit-availability-section"
                                    key={index}
                                  >
                                    <div className="availability-data">
                                      <div className="d-flex">
                                        {day.map((single_day, index) => {
                                          if (index === day.length - 1) {
                                            return (
                                              <>
                                                <strong key={index}>
                                                  {`${single_day}`}
                                                </strong>
                                              </>
                                            );
                                          } else {
                                            return (
                                              <>
                                                <strong>
                                                  {`${single_day}${","}`}
                                                  &nbsp;
                                                </strong>
                                              </>
                                            );
                                          }
                                        })}
                                      </div>

                                      <span>
                                        {item.start_date} to {item.end_date}
                                      </span>
                                      <span>{item.note}</span>
                                    </div>
                                    <div className="availability-time">
                                      <span>
                                        {item.start_time} to {item.end_time}
                                      </span>
                                    </div>
                                    <div className="availability-edit-del">
                                      <div>
                                        <i
                                          className="fa fa-pencil"
                                          aria-hidden="true"
                                          onClick={() =>
                                            editAvailability(item.id)
                                          }
                                        ></i>
                                      </div>
                                      <div>
                                        <i
                                          className="fa fa-trash"
                                          aria-hidden="true"
                                          onClick={() =>
                                            deleteAvailability(item.id)
                                          }
                                        ></i>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          )}
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
                              {tutorFetchData?.first_name}'s attendance
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
                          <strong>Preferences</strong>
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
                          <strong>Privileges</strong>
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
                            <h3>Tutor Access</h3>
                            <span>Disabled</span>
                          </div>
                          <p>Set up Tutor Portal access for this student</p>

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

export default TutorEditDetails;
