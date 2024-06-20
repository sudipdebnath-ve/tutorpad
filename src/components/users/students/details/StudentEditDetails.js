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
    getTutor,
    allTutors,
    fetchCategory,
    allCategory,
    getStudentStatus,
    statusList,
    fetchStudentAttendanceSummery,
    studentAttendanceSummery,
  } = useUserDataContext();
  const [initial, setInitial] = useState("");
  const [todayDate, setTodayDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [studentFetchData, setStudentFetchData] = useState({});
  const [modalIsOpen, setIsOpens] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profilePicData, setProfilePicData] = useState({});
  const [error, setError] = useState({});
  const [defaultLessonCat, setDefaultLessonCat] = useState("");
  const [defaultLessonLength, setDefaultLessonLength] = useState("30");
  const [price, setPrice] = useState("30.00");
  const [makeUpCredits, setMakeUpCredits] = useState("0");
  const [assignTutor, setAssignTutor] = useState({});
  const [tutors, setTutors] = useState([]);
  const [defaultBilling, setDefaultBilling] = useState("per_lesson_charge");
  const [checked, setChecked] = React.useState(false);
  const [attendFlag, setAttendFlag] = useState(false);
  const [preferenceDisabled, setPreferenceDisabled] = useState(true);
  const [familyDetailFlag, setFamilyDetailFlag] = useState(false);
  const [familyDetailDisabled, setFamilyDetailDisabled] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStatusVal, setSelectedStatusVal] = useState("");
  const [selectedStatusColor, setSelectedStatusColor] = useState("");
  const [selectedStatusBgColor, setSelectedStatusBgColor] = useState("");
  const [isNoteEdited, setIsNoteEdited] = useState(false);
  const [studentGeneralEditFlag, setStudentGeneralEditFlag] = useState(false);

  let { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const getTutorById = (id) => {
    return allTutors.find((tutor) => tutor.id === id);
  };
  const fetchAssignTutors = async (id) => {
    
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
        
      })
      .catch((error) => {
        console.log(error);
        
      });
  };

  const fetchStudentDetails = async (id) => {
    
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
        setChecked(response.data.data.enable_login_access);
        setStudentFetchData(response.data.data);
        
      })
      .catch((error) => {
        console.log(error);
        
      });
  };

  useEffect(() => {
    fetchStudentDetails(id);
    fetchCategory();
    getTutor();
    fetchAssignTutors(id);
    getStudentStatus();
    fetchStudentAttendanceSummery(id);
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
    var name = `${formData.first_name}${" "}${
      formData.last_name
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

    formData.first_name = studentFetchData?.first_name;
    formData.last_name = studentFetchData?.last_name;
    formData.email = studentFetchData?.email;
    formData.phone = studentFetchData?.phone;
    formData.note = studentFetchData?.note;
    formData.studentsince = studentFetchData?.studentsince;
    formData.gender = studentFetchData?.gender;
    formData.dob = studentFetchData?.dob;
    formData.customer_number = studentFetchData?.customer_number;
    formData.special_id_number = studentFetchData?.special_id_number;
    formData.school = studentFetchData?.school;
    formData.referrer = studentFetchData?.referrer;
    formData.subjects = studentFetchData?.subjects;
    formData.skill = studentFetchData?.skill;

    setProfilePhoto(studentFetchData?.dp_url);
    setSelectedStatus(studentFetchData?.student_status);
    setSelectedStatusVal(studentFetchData?.status_label);
    setSelectedStatusColor(studentFetchData?.status_color);
    setSelectedStatusBgColor(studentFetchData?.bg_color);
    
    formData.parentfirstname = studentFetchData?.parentfirstname;
    formData.parentlastname = studentFetchData?.parentlastname;
    formData.parentemail = studentFetchData?.parentemail;
    formData.parentmobile = studentFetchData?.parentmobile;
    formData.parentaddress = studentFetchData?.parentaddress;

    formData.parentemailpreference = studentFetchData?.parentemailpreference;
    formData.parentsmspreference = studentFetchData?.parentsmspreference;
    formData.setPreferredInvoiceRecipient = studentFetchData?.setPreferredInvoiceRecipient;
    formData.showStudentPortalContact = studentFetchData?.showStudentPortalContact;
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

  const handleToggle = async () => {
    const val = checked ? 0 : 1;
    setChecked(val === 1);

    const validateconfig = {
      method: "POST",
      url: `${API_URL}student/${id}/send-login-access`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        enable_login_access: val,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePreferenceEdit = (e) => {
    setAttendFlag(!e.target.value);
    setPreferenceDisabled(false);
  };

  const handleFamilyDetailEdit = (e) => {
    setFamilyDetailFlag(!e.target.value);
    setFamilyDetailDisabled(false);
  };

  const handleCancelAttendFlag = (e) => {
    setAttendFlag(false);
    setFamilyDetailFlag(false);
  };

  const handleEditChange = async (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (
      name === "first_name" ||
      name === "last_name" ||
      name === "email" ||
      name === "phone" ||
      name === "parentaddress" ||
      name === "note" ||
      name === "dob" ||
      name === "gender" ||
      name === "special_id_number" ||
      name === "customer_number" ||
      name === "school" ||
      name === "studentsince" ||
      name === "referrer" ||
      name === "subjects" ||
      name === "skill"
    ) {
      setFormData({ ...formData, [name]: value });
    } else {
      if (
        name === "parentemailpreference" ||
        name === "parentsmspreference" ||
        name === "setPreferredInvoiceRecipient" ||
        name === "showStudentPortalContact"
      ) {
        if (e.target.checked) {
          value = "true";
        } else {
          value = null;
        }
      }
      setFormData({ ...formData, [name]: value });
    }

    if (name === "file") {
      console.log(e.target.files[0]);
      profilePicData["file"] = e.target.files[0];
      profilePicData["student_id"] = id;
      const config = {
        method: "POST",
        url: `${API_URL}student/update-dp`,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: profilePicData,
      };
      await axios(config)
        .then((response) => {
          setProfilePhoto(response.data.data.dp_url);
          // toast.success(response.data.message, {
          //   position: toast.POSITION.TOP_CENTER,
          // });

        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.success === false) {
            setError(error.response.data.data);
          }
        });
    }
  };

  const formSubmit = async (e) => {
    formData["student_id"] = id;
    formData["student_status"] = selectedStatus;
    console.log(formData);

    e.preventDefault();
    const config = {
      method: "PATCH",
      url: `${API_URL}update-student`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    };
    await axios(config)
      .then((response) => {
        // console.log(response);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsOpens(false);
        setPreferenceDisabled(true);
        setAttendFlag(false)
        setFamilyDetailDisabled(true)
        setFamilyDetailFlag(false);
        setIsNoteEdited(!isNoteEdited);
        setStudentGeneralEditFlag(false);
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

  const handleChangeStatus = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "student_status") {
      setSelectedStatus(value);
      const text = e.target.getAttribute('data-status-text');
      const color = e.target.getAttribute('data-status-color');
      const bgcolor = e.target.getAttribute('data-status-bgcolor');
      setSelectedStatusVal(text);
      setSelectedStatusColor(color);
      setSelectedStatusBgColor(bgcolor);
    }
  }

  const handleStudentGeneralEdit = (e) => {
    setStudentGeneralEditFlag(true);
  }

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
                    <div className="student-profile-view">
                      <label htmlFor="file" className="formbold-form-label">
                        Photo <span>Optional</span>
                      </label>
                      <div className="initials py-3">
                        <div className="image-user">
                          {profilePhoto ? (
                            <>
                              <img src={profilePhoto} alt="" />
                            </>
                          ) : (
                            <h2>{initial && initial.toLocaleUpperCase()}</h2>
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
                          value={formData.first_name}
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
                          value={formData.last_name}
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
                          value={formData.email}
                          onChange={handleEditChange}
                          required
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
                            value={formData.phone}
                            onChange={handleEditChange}
                          />
                        </div>
                      </div>
                    </div>
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
                                onChange={handleChangeStatus}
                                value={status.id}
                                checked={selectedStatus == status.id}
                                data-status-text={status.status_title}
                                data-status-color={status.status_color}
                                data-status-bgcolor={status.bg_color}
                              />
                              <span style={{color: status.status_color, backgroundColor: status.bg_color}}> {status.status_title} </span>
                            </div>
                            );
                          })}
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

                    <button className="formbold-btn" onClick={formSubmit}>Save</button>
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
                        {profilePhoto ? (
                          <>
                            <img src={profilePhoto} alt="" />
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
                      <br></br>
                      { studentFetchData?.studentType &&
                      <span className="student-type-span">[ {studentFetchData?.studentType} ]</span> }
                    </div>
                    {studentFetchData?.student_status && (
                      <>
                      <div className="studentstatus-wrapper">
                        <div className="student-status">
                          <span style={{color: selectedStatusColor, backgroundColor: selectedStatusBgColor}}>
                            {selectedStatusVal}</span>
                        </div>
                      </div>
                      </>
                    )}

                    <div className="link-to-family">
                      <Link to={"/familiies-and-invoices/family/"+studentFetchData?.family_account_id}>View Family Account</Link>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="arrange-edit-sign">
                      <h3>Notes</h3>
                      <div className="student-edit-user" onClick={(e) => setIsNoteEdited(!isNoteEdited)}>
                        {isNoteEdited ?
                          <i className="fa fa-close" aria-hidden="true"></i>
                          :
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        }
                      </div>
                    </div>
                    {isNoteEdited ?

                      <div>
                        <input type="text" className="form-control mb-3" value={formData?.note} name="note" onChange={handleEditChange}></input>
                        <div className="btn-end flex justify-content-end">
                          <button className="formbold-btn" onClick={formSubmit}>Save</button>
                        </div>
                      </div>
                    :
                      <span>
                        {formData?.note}
                      </span>
                      }
                    
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
                          <strong>General Details</strong>
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
                            <h3>General Details</h3>
                            <div className="student-edit-user" onClick={handleStudentGeneralEdit}>
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <div className="">
                            <div className="formbold-input-flex">
                              <div>
                                <label htmlFor="gender" className="formbold-form-label">
                                  Gender <span>Optional</span>
                                </label>
                                <select
                                  name="gender"
                                  className="form-control"
                                  value={formData?.gender}
                                  onChange={handleEditChange}
                                  disabled={!studentGeneralEditFlag}
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
                                  value={formData?.dob}
                                  className="form-control"
                                  onChange={handleEditChange}
                                  disabled={!studentGeneralEditFlag}
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
                                  value={formData?.customer_number}
                                  className="form-control"
                                  onChange={handleEditChange}
                                  disabled={!studentGeneralEditFlag}
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
                                  value={formData?.special_id_number}
                                  className="form-control"
                                  onChange={handleEditChange}
                                  disabled={!studentGeneralEditFlag}
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
                                  value={formData?.school}
                                  className="form-control"
                                  onChange={handleEditChange}
                                  disabled={!studentGeneralEditFlag}
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
                                  value={formData?.studentsince}
                                  className="form-control"
                                  onChange={handleEditChange}
                                  disabled={!studentGeneralEditFlag}
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
                                  value={formData?.referrer}
                                  className="form-control"
                                  onChange={handleEditChange}
                                  disabled={!studentGeneralEditFlag}
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
                                  value={formData?.subjects}
                                  className="form-control"
                                  onChange={handleEditChange}
                                  disabled={!studentGeneralEditFlag}
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
                                  value={formData?.skill}
                                  className="form-control"
                                  onChange={handleEditChange}
                                  disabled={!studentGeneralEditFlag}
                                />
                              </div>
                            </div>
                          </div>
                          {studentGeneralEditFlag && (
                            <>
                              <div className="formbold-form-btn-wrapper justify-content-end">
                                <div className="btn-end">
                                  <Link
                                    className="cancel"
                                    onClick={handleCancelAttendFlag}
                                  >
                                    Cancel
                                  </Link>

                                  <button
                                    className="formbold-btn"
                                    onClick={formSubmit}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
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
                            <div className="student-edit-user" onClick={handlePreferenceEdit}>
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
                                <input type="checkbox" 
                                        name="parentemailpreference"
                                        disabled={preferenceDisabled}
                                        onChange={handleEditChange}
                                        checked={
                                          formData?.parentemailpreference !== null
                                            ? true
                                            : false
                                        }
                                   />
                                Send email lesson reminders
                              </div>
                              <div className="preference">
                                <input type="checkbox" 
                                        name="parentsmspreference"
                                        disabled={preferenceDisabled}
                                        onChange={handleEditChange}
                                        checked={
                                          formData?.parentsmspreference !== null
                                            ? true
                                            : false
                                        }
                                />
                                Send SMS lesson reminders
                              </div>
                              <div className="preference">
                                <input type="checkbox" 
                                        name="setPreferredInvoiceRecipient"
                                        disabled={preferenceDisabled}
                                        onChange={handleEditChange}
                                        checked={
                                          formData?.setPreferredInvoiceRecipient !== null
                                            ? true
                                            : false
                                        }
                                />
                                Set as the preferred invoice recipient
                              </div>
                              <div className="preference">
                                <input type="checkbox" 
                                        name="showStudentPortalContact"
                                        disabled={preferenceDisabled}
                                        onChange={handleEditChange}
                                        checked={
                                          formData?.showStudentPortalContact !== null
                                            ? true
                                            : false
                                        }
                                />
                                Show in Student Portal contacts
                              </div>
                              <span style={{ paddingLeft: "23px" }}>
                                Will only be sent if SMS messaging is allowed
                              </span>
                            </div>
                          </div>
                          {attendFlag && (
                            <>
                              <div className="formbold-form-btn-wrapper justify-content-end">
                                <div className="btn-end">
                                  <Link
                                    className="cancel"
                                    onClick={handleCancelAttendFlag}
                                  >
                                    Cancel
                                  </Link>

                                  <button
                                    className="formbold-btn"
                                    onClick={formSubmit}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
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
                                <strong>Parents Details Not Exists</strong>
                              </>
                            )}

                            <div className="student-edit-user" onClick={handleFamilyDetailEdit}>
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <div className="formbold-input-flex">
                            <div className="row">
                              <div className="col-xl-12 col-xxl-12">
                                <div className="formbold-form-step-1 active">
                                    <div>
                                      <label
                                        htmlFor="parentfirstname"
                                        className="formbold-form-label"
                                        id="parentfirstname"
                                      >
                                        First name
                                      </label>
                                      <input
                                        type="text"
                                        name="parentfirstname"
                                        className="form-control"
                                        value={formData.parentfirstname}
                                        onChange={handleEditChange}
                                        disabled={familyDetailDisabled}
                                        required
                                      />
                                    </div>
                                    <div className="pt-2">
                                      <label
                                        htmlFor="parentlastname"
                                        className="formbold-form-label"
                                        id="parentlastname"
                                      >
                                        Last name
                                      </label>
                                      <input
                                        type="text"
                                        name="parentlastname"
                                        className="form-control"
                                        value={formData.parentlastname}
                                        onChange={handleEditChange}
                                        disabled={familyDetailDisabled}
                                        required
                                      />
                                    </div>
                                    <div className="pt-2">
                                      <label
                                        htmlFor="parentemail"
                                        className="formbold-form-label"
                                        id="parentemail"
                                      >
                                        Email Address
                                      </label>
                                      <input
                                        type="parentemail"
                                        name="parentemail"
                                        className="form-control"
                                        value={formData.parentemail}
                                        onChange={handleEditChange}
                                        disabled={familyDetailDisabled}
                                        required
                                      />
                                    </div>
                                    <div className="pt-2">
                                      <div>
                                        <label
                                          htmlFor="parentmobile"
                                          className="formbold-form-label"
                                          id="parentmobile"
                                        >
                                          Phone Number <span>Optional</span>
                                        </label>
                                        <input
                                          type="text"
                                          name="parentmobile"
                                          className="form-control"
                                          value={formData.parentmobile}
                                          disabled={familyDetailDisabled}
                                          onChange={handleEditChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="pt-2">
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
                                        value={formData.parentaddress}
                                        disabled={familyDetailDisabled}
                                        onChange={handleEditChange}
                                      />
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr></hr>
                          { familyDetailFlag && (
                            <>
                              <div className="formbold-form-btn-wrapper justify-content-end">
                                <div className="btn-end">
                                  <Link
                                    className="cancel"
                                    onClick={handleCancelAttendFlag}
                                  >
                                    Cancel
                                  </Link>

                                  <button
                                    className="formbold-btn"
                                    onClick={formSubmit}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
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
                              <span>{ studentAttendanceSummery.presentCount }</span>
                              <span>Present</span>
                            </div>
                            <div className="avg-data">
                              <span>{ studentAttendanceSummery.unrecordedCount }</span>
                              <span>Unrecorded</span>
                            </div>
                            <div className="avg-data">
                              <span>{ studentAttendanceSummery.absentCount }</span>
                              <span>Student Absences</span>
                            </div>
                            <div className="avg-data">
                              <span>{ studentAttendanceSummery.tutorCanceledCount }</span>
                              <span>Canceled Events</span>
                            </div>
                            <div className="avg-data">
                              <span>{ studentAttendanceSummery.totalEvents }</span>
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

                            <FetchAttendanceLog userId={id}/>
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
                              <input
                                checked={checked}
                                onChange={handleToggle}
                                className="switch-checkbox"
                                id={`switch`}
                                type="checkbox"
                              />
                              <label
                                style={{ background: (checked == 1 ) ? "#06D6A0" : "#EF476F" }}
                                className="switch-label"
                                htmlFor={`switch`}
                              >
                                <span className={`switch-button`} />
                              </label>
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
