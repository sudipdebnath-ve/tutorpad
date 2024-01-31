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
import { init } from "i18next";

const MyPreferences = () => {
  const {
    userData,
    fetchData,
    sidebarToggle,
    token,
    userId,
    getAvailabilityData,
    allAvailabilityData,
  } = useUserDataContext();
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState({});
  const [attendFlag, setAttendFlag] = useState(false);
  const [attendDisabled, setAttenddisabled] = useState(true);
  const [emailDisabled, setEmaildisabled] = useState(true);
  const [availFlag, setAvailFlag] = useState(false);
  const [initial, setInitial] = useState("");
  const [formData, setFormData] = useState({});
  const [tenantData, setTenantData] = useState([]);
  const [availData, setAvailData] = useState({});
  const [days, setDays] = useState({});
  const [updatePass, setUpdatePass] = useState({});
  const [error, setError] = useState({});
  const [editA, setEditA] = useState({});

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
  const availStyles = {
    content: {
      width: "60%",
      height: "80%",
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
    setIsOpen(e);
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
      allAvailabilityData();
    }
  }, []);
  useEffect(() => {
    var name = `${userData.first_name}${" "}${userData.last_name}`;

    var parts = name.split(" ");
    var initials = "";
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== "") {
        initials += parts[i][0];
      }
    }
    console.log(userData);
    setInitial(initials);
    formData.first_name = userData?.first_name;
    formData.last_name = userData?.last_name;
    formData.email = userData?.email;
    formData.phone = userData?.phone;
    formData.title = userData?.business_data?.business_name;
    tenantData.address = userData?.business_data?.address;
    tenantData.virtual_meeting = userData?.business_data?.virtual_meeting;
    tenantData.subjects = userData?.business_data?.subjects;
    tenantData.overdue_attendence = userData?.business_data?.overdue_attendence;
    tenantData.default_notes_view = userData?.business_data?.default_notes_view;
    tenantData.copy_recent_event = userData?.business_data?.copy_recent_event;
    tenantData.automatically_copy_lesson =
      userData?.business_data?.automatically_copy_lesson;
    tenantData.student_register_lesson =
      userData?.business_data?.student_register_lesson;
    tenantData.student_cancel_lesson =
      userData?.business_data?.student_cancel_lesson;
    tenantData.parent_student_signup =
      userData?.business_data?.parent_student_signup;
    tenantData.parent_student_disable_email_reminder =
      userData?.business_data?.parent_student_disable_email_reminder;
    tenantData.allow_student_email_studylog =
      userData?.business_data?.allow_student_email_studylog;
    tenantData.daily_agenda = userData?.business_data?.daily_agenda;
  }, [userData]);

  const handleAttendEdit = (e) => {
    setAttendFlag(!e.target.value);
    setAttenddisabled(false);
  };

  const handleEmailEdit = (e) => {
    setAttendFlag(!e.target.value);
    setEmaildisabled(false);
  };
  const handleCancelAttendFlag = (e) => {
    setAttendFlag(false);
    setAttenddisabled(true);
    setEmaildisabled(true);
  };

  const handleChange = async (e) => {
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
      setTenantData({ ...tenantData, [name]: value });
    }

    if (name === "file") {
      setProfilePhoto(e.target.files[0]);
      // console.log(e.target.files[0]);
      profilePhoto["file"] = e.target.files[0];
      profilePhoto["user_id"] = userId;
      const config = {
        method: "POST",
        url: `${API_URL}update-dp`,
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
        });
    }
  };

  const formSubmit = async (e) => {
    formData["user_id"] = userId;
    // if (profilePhoto) {
    //   formData["photo"] = profilePhoto;
    // }
    formData["tenant_data"] = tenantData;

    console.log(formData);

    e.preventDefault();
    const config = {
      method: "PATCH",
      url: `${API_URL}savedata`,
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
        setAttendFlag(false);
        setAvailFlag(false);
        setAttenddisabled(true);
        setEmaildisabled(true);
        fetchData(token);
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangePassword = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdatePass({ ...updatePass, [name]: value });
  };

  const formSubmitPassword = async (e) => {
    updatePass["user_id"] = userData.id;

    console.log(updatePass);
    e.preventDefault();
    const config = {
      method: "PATCH",
      url: `${API_URL}update-password`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: updatePass,
    };
    await axios(config)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setAttendFlag(false);
        setAvailFlag(false);
        setAttenddisabled(true);
        setEmaildisabled(true);
      })
      .catch((error) => {
        console.log(error);
      });
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
  const handleAvailChangePopup = (e) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateAvailability = async (e) => {
    let arr = Object.values(days);
    let allday = arr.toString();
    availData["days"] = allday;
    availData["id"] = editA.id;
    e.preventDefault();
    // console.log(availData);
    const config = {
      method: "PATCH",
      url: `${API_URL}update-availability`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: availData,
    };
    await axios(config)
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsOpen(false);
        allAvailabilityData();
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
                      <label htmlFor="photo" className="formbold-form-label">
                        Photo <span>Optional</span>
                      </label>
                      <div className="initials py-3">
                        <div className="image-user">
                          {userData?.business_data?.dp_url ? (
                            <>
                              <img
                                src={userData?.business_data?.dp_url}
                                alt=""
                              />
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
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <label
                          htmlFor="first_name"
                          className="formbold-form-label"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          className="form-control"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="last_name"
                          className="formbold-form-label"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          className="form-control"
                          value={formData.last_name}
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
                          value={formData.email}
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
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
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
                          value={tenantData.address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="formbold-input-flex diff">
                      <div>
                        <label
                          htmlFor="virtual_meeting"
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
                          htmlFor="subjects"
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
                          name="subjects"
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

                    <button className="formbold-btn" onClick={formSubmit}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ReactModal>
        <ReactModal
          isOpen={modalIsOpen === "password"}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={passwordStyles}
          contentLabel="Change Password"
        >
          <div className="mypreference-modal">
            <div className="close-h">
              <h4>Change Password</h4>
              <button className="closeModal" onClick={closeModal}>
                X
              </button>
            </div>
            <form name="studentProfile">
              <div className="row d-flex">
                <div className="col-xl-12 col-xxl-12">
                  <div className="formbold-form-step-1 active">
                    <div className="formbold-input-flex">
                      <div>
                        <label
                          htmlFor="current_password"
                          className="formbold-form-label"
                          id="current_password"
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          name="current_password"
                          className="form-control"
                          onChange={handleChangePassword}
                        />
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <label
                          htmlFor="new_password"
                          className="formbold-form-label"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          name="new_password"
                          className="form-control"
                          onChange={handleChangePassword}
                        />
                      </div>
                      <div>
                        <div>
                          <label
                            htmlFor="change_new_password"
                            className="formbold-form-label"
                            id="change_new_password"
                          >
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            name="confirm_new_password"
                            className="form-control"
                            onChange={handleChangePassword}
                          />
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

                    <button
                      className="formbold-btn"
                      onClick={formSubmitPassword}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ReactModal>
        <ReactModal
          isOpen={modalIsOpen === "updateAvail"}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={availStyles}
          contentLabel="Change Password"
        >
          <div className="mypreference-modal">
            <div className="close-h">
              <h4>Update Availability</h4>
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
                        <div>
                          <label htmlFor="days" className="formbold-form-label">
                            Days
                          </label>
                        </div>
                        <small style={{ color: "red" }}>
                          {error?.days?.length ? error?.days[0] : <></>}
                        </small>
                        <div className="studentStatus">
                          <div>
                            <input
                              type="checkbox"
                              className="status"
                              name="sun"
                              value="Sun"
                              onChange={handleAvailChangePopup}
                              // checked={
                              //   days?.sun !== null ||
                              //   days?.sun !== undefined ||
                              //   days?.sun !== ""
                              //     ? true
                              //     : false
                              // }
                            />
                            Sun
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              className="status"
                              name="mon"
                              value="Mon"
                              onChange={handleAvailChangePopup}
                              // checked={days?.mon !== null ? true : false}
                            />
                            Mon
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              className="status"
                              name="tue"
                              value="Tue"
                              onChange={handleAvailChangePopup}
                              // checked={days?.tue !== null ? true : false}
                            />
                            Tue
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              className="status"
                              name="wed"
                              value="Wed"
                              onChange={handleAvailChangePopup}
                              // checked={days?.wed !== null ? true : false}
                            />
                            Wed
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              className="status"
                              name="thu"
                              value="Thu"
                              onChange={handleAvailChangePopup}
                              // checked={days?.thu !== null ? true : false}
                            />
                            Thu
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              className="status"
                              name="fri"
                              value="Fri"
                              onChange={handleAvailChangePopup}
                              // checked={days?.fri !== null ? true : false}
                            />
                            Fri
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              className="status"
                              name="sat"
                              value="Sat"
                              onChange={handleAvailChangePopup}
                              // checked={days?.sat !== null ? true : false}
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
                          value={availData.start_date}
                          onChange={handleAvailChangePopup}
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
                          value={availData.end_date}
                          onChange={handleAvailChangePopup}
                        />
                      </div>
                    </div>
                    <small style={{ color: "red" }}>
                      {error?.end_date?.length ? error?.end_date[0] : <></>}
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
                          value={availData.start_time}
                          onChange={handleAvailChangePopup}
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
                          value={availData.end_time}
                          onChange={handleAvailChangePopup}
                        />
                      </div>
                    </div>
                    <div className="formbold-input-flex diff">
                      <div>
                        <label htmlFor="note" className="formbold-form-label">
                          Note <span>Optional</span>
                        </label>

                        <textarea
                          name="note"
                          className="form-control"
                          value={availData.note}
                          onChange={handleAvailChangePopup}
                        />
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

                    <button
                      className="formbold-btn"
                      onClick={updateAvailability}
                    >
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
                        {userData?.business_data?.dp_url ? (
                          <>
                            <img src={userData?.business_data?.dp_url} alt="" />
                          </>
                        ) : (
                          <h2>{initial}</h2>
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
                      <Link onClick={(e) => openModal("password")}>
                        Change Password
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <div className="card">
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
                </div> */}
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
                            <div
                              className="student-edit-user"
                              onClick={handleAttendEdit}
                            >
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <div className="formbold-input-flex">
                            <div>
                              <label
                                htmlFor="overdue_attendence"
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
                                  value="true"
                                  disabled={attendDisabled}
                                  onChange={handleChange}
                                  checked={
                                    tenantData?.overdue_attendence !== null
                                      ? true
                                      : false
                                  }
                                />
                                Show overdue attendance on homepage
                              </div>
                            </div>
                          </div>

                          <div className="formbold-input-flex diff">
                            <div>
                              <div>
                                <label
                                  htmlFor="default_notes_view"
                                  className="formbold-form-label"
                                >
                                  Default Notes View
                                </label>
                              </div>
                              <div className="input-radio">
                                <input
                                  type="radio"
                                  value="Student"
                                  name="default_notes_view"
                                  disabled={attendDisabled}
                                  onChange={handleChange}
                                  checked={
                                    tenantData?.default_notes_view === "Student"
                                      ? true
                                      : false
                                  }
                                ></input>
                                Student
                                <input
                                  type="radio"
                                  value="Parent"
                                  name="default_notes_view"
                                  disabled={attendDisabled}
                                  onChange={handleChange}
                                  checked={
                                    tenantData?.default_notes_view === "Parent"
                                      ? true
                                      : false
                                  }
                                ></input>
                                Parent
                                <input
                                  type="radio"
                                  value="Private"
                                  name="default_notes_view"
                                  disabled={attendDisabled}
                                  onChange={handleChange}
                                  checked={
                                    tenantData?.default_notes_view === "Private"
                                      ? true
                                      : false
                                  }
                                ></input>
                                Private
                              </div>
                            </div>
                          </div>

                          <div className="formbold-input-flex diff mb-0">
                            <div>
                              <label
                                htmlFor="automatically_copy_lesson"
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
                                  value="true"
                                  disabled={attendDisabled}
                                  onChange={handleChange}
                                  checked={
                                    tenantData?.automatically_copy_lesson !==
                                    null
                                      ? true
                                      : false
                                  }
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
                                value="Copy from most recent event"
                                name="copy_recent_event"
                                disabled={attendDisabled}
                                onChange={handleChange}
                                checked={
                                  tenantData?.copy_recent_event ===
                                  "Copy from most recent event"
                                    ? true
                                    : false
                                }
                              ></input>
                              Copy from most recent event
                              <input
                                type="radio"
                                value="Copy from same category only"
                                name="copy_recent_event"
                                disabled={attendDisabled}
                                onChange={handleChange}
                                checked={
                                  tenantData?.copy_recent_event ===
                                  "Copy from same category only"
                                    ? true
                                    : false
                                }
                              ></input>
                              Copy from same category only
                            </div>
                          </div>
                        </div>
                        <div className="accordion-body pt-0">
                          <div className="student-properties-edit sec-acc">
                            <h3>Email Notification Preferences</h3>

                            <div
                              className="student-edit-user"
                              onClick={handleEmailEdit}
                            >
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
                              <input
                                type="checkbox"
                                name="student_register_lesson"
                                value="When any student registers for a lesson/event
                                through the Student Portal"
                                disabled={emailDisabled}
                                onChange={handleChange}
                                checked={
                                  tenantData?.student_register_lesson !== null
                                    ? true
                                    : false
                                }
                              ></input>
                              When any student registers for a lesson/event
                              through the Student Portal
                            </div>
                            <div className="input-check">
                              <input
                                type="checkbox"
                                name="student_cancel_lesson"
                                value="When any student cancels a lesson/event through
                                the Student Portal"
                                disabled={emailDisabled}
                                onChange={handleChange}
                                checked={
                                  tenantData?.student_cancel_lesson !== null
                                    ? true
                                    : false
                                }
                              ></input>
                              When any student cancels a lesson/event through
                              the Student Portal
                            </div>
                            <div className="input-check">
                              <input
                                type="checkbox"
                                name="parent_student_signup"
                                value="When any parent or student completes the sign-up
                                form"
                                disabled={emailDisabled}
                                onChange={handleChange}
                                checked={
                                  tenantData?.parent_student_signup !== null
                                    ? true
                                    : false
                                }
                              ></input>
                              When any parent or student completes the sign-up
                              form
                            </div>
                            <div className="input-check">
                              <input
                                type="checkbox"
                                name="parent_student_disable_email_reminder"
                                value="When any parent or student disables email
                                reminders"
                                disabled={emailDisabled}
                                onChange={handleChange}
                                checked={
                                  tenantData?.parent_student_disable_email_reminder !==
                                  null
                                    ? true
                                    : false
                                }
                              ></input>
                              When any parent or student disables email
                              reminders
                            </div>
                            <div className="input-check">
                              <input
                                type="checkbox"
                                name="allow_student_email_studylog"
                                value="Allow students to email me from the Study Log"
                                disabled={emailDisabled}
                                onChange={handleChange}
                                checked={
                                  tenantData?.allow_student_email_studylog !==
                                  null
                                    ? true
                                    : false
                                }
                              ></input>
                              Allow students to email me from the Study Log
                            </div>
                          </div>
                          <div className="email-pad-top">
                            <h5>
                              <strong>Email Daily Agenda</strong>
                            </h5>
                            <div className="input-radio">
                              <input
                                type="radio"
                                value="Day Before"
                                name="daily_agenda"
                                disabled={emailDisabled}
                                onChange={handleChange}
                                checked={
                                  tenantData?.daily_agenda === "Day Before"
                                    ? true
                                    : false
                                }
                              ></input>
                              Day Before
                              <br />
                              Between 16:00 and 23:00
                              <input
                                type="radio"
                                value="Same Day"
                                name="daily_agenda"
                                disabled={emailDisabled}
                                onChange={handleChange}
                                checked={
                                  tenantData?.daily_agenda === "Same Day"
                                    ? true
                                    : false
                                }
                              ></input>
                              Same Day
                              <br />
                              Between 0:00 and 15:00
                              <input
                                type="radio"
                                value="Don't Email"
                                name="daily_agenda"
                                disabled={emailDisabled}
                                onChange={handleChange}
                                checked={
                                  tenantData?.daily_agenda === "Don't Email"
                                    ? true
                                    : false
                                }
                              ></input>
                              Don't Email
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
                                    <img src={payroll} alt="payroll"></img>
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
