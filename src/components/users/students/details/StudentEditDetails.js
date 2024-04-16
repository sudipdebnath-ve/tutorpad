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
import { ToastContainer, toast } from "react-toastify";

const StudentEditDetails = () => {
  const {
    sidebarToggle,
    token,
    setLoading,
    getTutor,
    allTutors,
    fetchCategory,
    allCategory,
  } = useUserDataContext();
  const [initial, setInitial] = useState("");
  const [todayDate, setTodayDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [studentFetchData, setStudentFetchData] = useState({});
  const [modalIsOpen, setIsOpens] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePhoto, setProfilePhoto] = useState({});
  const [error, setError] = useState({});
  const [defaultLessonCat, setDefaultLessonCat] = useState("");
  const [defaultLessonLength, setDefaultLessonLength] = useState("30");
  const [price, setPrice] = useState("30.00");
  const [makeUpCredits, setMakeUpCredits] = useState("0");
  const [assignTutor, setAssignTutor] = useState({});
  const [tutors, setTutors] = useState([]);
  const [defaultBilling, setDefaultBilling] = useState("per_lesson_charge");

  let { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const getTutorById = (id) => {
    return allTutors.find((tutor) => tutor.id === id);
  };

  const fetchAssignTutors = async (id) => {
    setLoading(true);
    console.log(id);
    const validateconfig = {
      method: "GET",
      url: `${API_URL}assigned-tutors/${id}`,
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
        setTutors(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  };

  const fetchStudentDetails = async (id) => {
    setLoading(true);
    console.log(id);
    const validateconfig = {
      method: "GET",
      url: `${API_URL}student/details/${id}`,
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
    fetchCategory();
    getTutor();
    fetchAssignTutors(id);
  }, [id]);

  const handleAssignTutor = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "default_lesson_cat") {
      setDefaultLessonCat(value);
    }

    if (name === "default_billing") {
      setDefaultBilling(value);
    }

    if (name === "default_lesson_length") {
      setDefaultLessonLength(value);
    }

    if (name === "price") {
      setPrice(value);
    }

    if (name === "make_up_credits") {
      setMakeUpCredits(value);
    }

    setAssignTutor({ ...assignTutor, [name]: value });
  };

  const saveAssignTutor = async (e) => {
    e.preventDefault();

    let selectedTutor = document.getElementById("tutor_id");

    assignTutor["student_id"] = id;
    assignTutor["tutor_id"] = selectedTutor?.value;

    if (defaultBilling === "per_lesson_charge") {
      assignTutor["per_lesson_charge"] = price;
    }

    if (defaultBilling === "per_month_charge") {
      assignTutor["per_month_charge"] = price;
    }

    if (defaultBilling === "per_hour_charge") {
      assignTutor["per_hour_charge"] = price;
    }

    if (!assignTutor.hasOwnProperty("default_lesson_cat")) {
      assignTutor["default_lesson_cat"] = defaultLessonCat;
    }

    if (!assignTutor.hasOwnProperty("make_up_credits")) {
      assignTutor["make_up_credits"] = makeUpCredits;
    }

    if (!assignTutor.hasOwnProperty("default_lesson_length")) {
      assignTutor["default_lesson_length"] = defaultLessonLength;
    }

    const config = {
      method: "POST",
      url: `${API_URL}map-tutor-student`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: assignTutor,
    };
    await axios(config)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });

        setIsOpen(false);
        closeModal();
        fetchAssignTutors(id);
        setAssignTutor({});
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.success === false) {
          setError(error.response.data.data);
        }
        setAssignTutor({});
      });
  };

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

  const handleEditChange = async (e) => {
    const name = e.target.name;
    let value = e.target.value;
    // console.log(name, value);
    if (
      name === "title" ||
      name === "first_name" ||
      name === "last_name" ||
      name === "email" ||
      name === "phone"
    ) {
      setFormData({ ...formData, [name]: value });
    } else {
      if (
        name === "overdue_attendence" ||
        name === "automatically_copy_lesson" ||
        name === "student_register_lesson" ||
        name === "student_cancel_lesson" ||
        name === "parent_student_disable_email_reminder" ||
        name === "allow_student_email_studylog" ||
        name === "parent_student_signup"
      ) {
        if (e.target.checked) {
          value = "true";
        } else {
          value = null;
        }
      }
      // setTenantData({ ...tenantData, [name]: value });
    }

    if (name === "file") {
      setProfilePhoto(e.target.files[0]);
      // console.log(e.target.files[0]);
      profilePhoto["file"] = e.target.files[0];
      profilePhoto["student_id"] = id;
      const config = {
        method: "POST",
        url: `${API_URL}student/update-dp`,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: profilePhoto,
      };
      await axios(config)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.success === false) {
            setError(error.response.data.data);
          }
        });
    }
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

  function openModal(e) {
    setIsOpens(e);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal(e) {
    setIsOpens(e);
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

      <div className="main">
        <TopBar />

        <ReactModal
          isOpen={modalIsOpen === "profile"}
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
                      <label htmlFor="file" className="formbold-form-label">
                        Photo <span>Optional</span>
                      </label>
                      <div className="initials py-3">
                        <div className="image-user">
                          {studentFetchData?.dp_url ? (
                            <>
                              <img src={studentFetchData?.dp_url} alt="" />
                            </>
                          ) : (
                            <h2>{initial}</h2>
                          )}
                        </div>
                      </div>
                      <input
                        type="file"
                        name="file"
                        className="form-control b-none"
                        onChange={handleEditChange}
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
                          onChange={handleEditChange}
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
                          onChange={handleEditChange}
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
                          onChange={handleEditChange}
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
                          onChange={handleEditChange}
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
                            onChange={handleEditChange}
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
                          onChange={handleEditChange}
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
                          onChange={handleEditChange}
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
                          onChange={handleEditChange}
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
                          onChange={handleEditChange}
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
        <ReactModal
          isOpen={modalIsOpen === "assignTutor"}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="mypreference-modal">
            <div className="close-h">
              <h4>Assign Tutor</h4>
              <button className="closeModal" onClick={closeModal}>
                X
              </button>
            </div>
            <form name="studentProfile">
              <div className="row d-flex">
                <div className="col-xl-12 col-xxl-12">
                  <div className="formbold-form-step-1 active">
                    <div className="formbold-input-flex diff">
                      <div>
                        <label
                          htmlFor="tutor_id"
                          className="formbold-form-label"
                        >
                          Tutor
                        </label>
                        <div>
                          <select
                            name="tutor_id"
                            className="form-control"
                            onChange={handleAssignTutor}
                            id="tutor_id"
                          >
                            {allTutors &&
                              allTutors.map((tutor) => {
                                return (
                                  <option key={tutor.id} value={tutor.id}>
                                    {tutor.name ? tutor.name : ""}
                                  </option>
                                );
                              })}
                          </select>
                          <div className="pt-2">
                            <small style={{ color: "red" }}>
                              {error?.error?.length ? error.error : <></>}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <label
                          htmlFor="default_lesson_cat"
                          className="formbold-form-label"
                        >
                          Default Lesson Category
                        </label>
                        <br></br>

                        <select
                          name="default_lesson_cat"
                          className="form-control"
                          onChange={handleAssignTutor}
                          id="default_lesson_cat"
                          value={defaultLessonCat}
                        >
                          <option value="">Select a category</option>
                          {allCategory &&
                            allCategory.map((cat) => {
                              return (
                                <option key={cat.id} value={cat.id}>
                                  {cat.eventcat_name
                                    ? cat.eventcat_name
                                    : "Unknown Category"}
                                </option>
                              );
                            })}
                        </select>
                        <div className="pt-2">
                          <small style={{ color: "red" }}>
                            {error?.default_lesson_cat?.length ? (
                              error.default_lesson_cat[0]
                            ) : (
                              <></>
                            )}
                          </small>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="default_lesson_length"
                          className="formbold-form-label"
                          id="default_lesson_length"
                        >
                          Default Lesson Length
                        </label>
                        <div style={{ position: "relative" }}>
                          <input
                            type="text"
                            name="default_lesson_length"
                            className="form-control"
                            onChange={handleAssignTutor}
                            value={defaultLessonLength}
                            required
                          />
                          <span
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          >
                            minutes
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="formbold-input-flex diff">
                      <div>
                        <div>
                          <label
                            htmlFor="default_billing"
                            className="formbold-form-label"
                          >
                            Default Billing
                          </label>
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="no_automatic_charge"
                            name="default_billing"
                            onChange={handleAssignTutor}
                            checked={defaultBilling === "no_automatic_charge"}
                          ></input>
                          Don't automatically create any calendar-generated
                          charges
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="per_lesson_charge"
                            name="default_billing"
                            onChange={handleAssignTutor}
                            checked={defaultBilling === "per_lesson_charge"}
                          ></input>
                          Student pays based on the number of lessons taken
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="per_month_charge"
                            name="default_billing"
                            onChange={handleAssignTutor}
                            checked={defaultBilling === "per_month_charge"}
                          ></input>
                          Student pays the same amount each month regardless of
                          number of lessons
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="per_hour_charge"
                            name="default_billing"
                            onChange={handleAssignTutor}
                            checked={defaultBilling === "per_hour_charge"}
                          ></input>
                          Student pays an hourly rate
                        </div>
                        <span>
                          Charges will automatically adjust to lesson length
                        </span>
                      </div>
                    </div>

                    <div className="formbold-input-flex">
                      {defaultBilling !== "no_automatic_charge" && (
                        <div>
                          <div>
                            <label
                              htmlFor="price"
                              className="formbold-form-label"
                              id="price"
                            >
                              Price
                            </label>
                            <div style={{ position: "relative" }}>
                              <span
                                style={{
                                  position: "absolute",
                                  left: "10px",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                }}
                              >
                                <i className="fa fa-inr" aria-hidden="true"></i>
                              </span>
                              <input
                                type="text"
                                name="price"
                                className="form-control"
                                style={{
                                  paddingLeft: "25px",
                                  paddingRight: "70px",
                                }}
                                onChange={handleAssignTutor}
                                value={price}
                                required
                              />
                              <span
                                style={{
                                  position: "absolute",
                                  right: "10px",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                }}
                              >
                                {defaultBilling === "per_lesson_charge" &&
                                  "Per Lesson"}
                                {defaultBilling === "per_month_charge" &&
                                  "Per Month"}
                                {defaultBilling === "per_hour_charge" &&
                                  "Per Hour"}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="formbold-input-flex diff">
                        <div>
                          <label
                            htmlFor="make_up_credits"
                            className="formbold-form-label"
                            id="make_up_credits"
                          >
                            Make-Up Credits
                          </label>
                          <div style={{ position: "relative" }}>
                            <input
                              type="text"
                              name="make_up_credits"
                              className="form-control"
                              onChange={handleAssignTutor}
                              value={makeUpCredits}
                              required
                            />
                            <span
                              style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                              }}
                            >
                              Credits
                            </span>
                          </div>
                        </div>
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
                    <button className="formbold-btn" onClick={saveAssignTutor}>
                      Assign
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
                        {studentFetchData?.dp_url ? (
                          <>
                            <img src={studentFetchData?.dp_url} alt="" />
                          </>
                        ) : (
                          <h2>{initial && initial.toLocaleUpperCase()}</h2>
                        )}
                      </div>
                    </div>
                    <div
                      className="edit-user"
                      onClick={(e) => openModal("profile")}
                    >
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
                          {tutors.length > 0 ? (
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Default Price</th>
                                  <th>Default Lesson Length</th>
                                  <th>Default Lesson Category</th>
                                  <th>Make-Up Credits</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {tutors.map((tutor) => (
                                  <tr key={tutor.tutor_id}>
                                    <td>
                                      <Link
                                        to={`/tutors/details/${tutor.tutor_id}`}
                                      >
                                        {getTutorById(tutor.tutor_id).name}
                                      </Link>
                                    </td>
                                    <td>
                                      {tutor.default_billing ===
                                        "per_month_charge" && (
                                        <>
                                          <i
                                            className="fa fa-inr"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          {tutor.per_month_charge}/month
                                        </>
                                      )}

                                      {tutor.default_billing ===
                                        "per_lesson_charge" && (
                                        <>
                                          <i
                                            className="fa fa-inr"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          {tutor.per_lesson_charge}/lesson
                                        </>
                                      )}

                                      {tutor.default_billing ===
                                        "per_hour_charge" && (
                                        <>
                                          <i
                                            className="fa fa-inr"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          {tutor.per_hour_charge}/hour
                                        </>
                                      )}

                                      {tutor.default_billing !==
                                        "per_month_charge" &&
                                        tutor.default_billing !==
                                          "per_lesson_charge" &&
                                        tutor.default_billing !==
                                          "per_hour_charge" && (
                                          <p>Default price not specified</p>
                                        )}
                                    </td>
                                    <td>{tutor.default_lesson_length}</td>
                                    <td>
                                      {
                                        allCategory.find(
                                          (cat) =>
                                            cat.id === tutor.default_lesson_cat
                                        )?.eventcat_name
                                      }
                                    </td>
                                    <td>
                                      Total: {tutor.makeup_credits} <br />
                                      Booked: {tutor.makeup_credits} <br />
                                      Available: {tutor.makeup_credits} <br />
                                    </td>
                                    <td>
                                      {/* Edit icon */}
                                      <div className="d-flex gap-2">
                                        <i
                                          className="fa fa-pencil"
                                          aria-hidden="true"
                                        ></i>
                                        {/* Delete icon */}
                                        <i
                                          className="fa fa-trash"
                                          aria-hidden="true"
                                        ></i>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
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
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="formbold-form-btn-wrapper">
                            <div className="btn-end">
                              <button
                                className="formbold-btn"
                                onClick={(e) => openModal("assignTutor")}
                              >
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
