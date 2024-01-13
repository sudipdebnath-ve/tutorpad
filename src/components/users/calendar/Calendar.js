import React, { useEffect, useState } from "react";
import MiniSidebar from "../../sidebar/MiniSidebar.js";
import Sidebar from "../../sidebar/Sidebar.js";
import TopBar from "../../sidebar/TopBar.js";
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";

const Calendars = () => {
  const { sidebarToggle, userData, fetchData } = useUserDataContext();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    var token = JSON.parse(localStorage.getItem("tutorPad"));
    if (!token) {
      navigate("/signin");
    } else {
      setTimeout(() => {
        fetchData(token);
      }, 2000);
    }
  }, []);
  const events = [
    {
      title: "DTS STARTS",
      start: new Date(2024, 0, 13, 0, 0, 0),
      end: new Date(2024, 0, 13, 0, 0, 0),
    },

    {
      title: "DTS ENDS",
      start: new Date(2024, 0, 9, 0, 0, 0),
      end: new Date(2024, 0, 9, 0, 0, 0),
    },

    {
      title: "Meeting",
      start: new Date(2023, 3, 12, 10, 30, 0, 0),
      end: new Date(2023, 3, 12, 12, 30, 0, 0),
      desc: "Pre-meeting meeting, to prepare for the meeting",
    },
    {
      title: "Multi-day Event",
      start: new Date(2023, 10, 20, 19, 30, 0),
      end: new Date(2023, 10, 22, 2, 0, 0),
    },
  ];

  const customStyles = {
    content: {
      width: "25%",
      height: "35%",
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
  const addEventStyles = {
    content: {
      width: "25%",
      height: "auto",
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
  const quickAddLessonStyles = {
    content: {
      width: "45%",
      height: "90%",
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

  const handleSelectedEvent = (e) => {
    console.log(e);
    openModal("event");
    let startDate = e.start.toDateString();
    setStartDate(startDate);
    setEndDate(e.end);
  };
  const openNewAppointmentModal = (e) => {
    openModal("addEvent");
    console.log(e);
    let startDate = e.start.toDateString();
    setStartDate(startDate);
    setEndDate(e.end);
  };
  const openQuickAddLessonModal = (e) => {
    openModal("quickAddLesson");
    console.log(e);
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
          isOpen={modalIsOpen === "event"}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="calendar-modal">
            <div className="close-h">
              <div className="popup-icons">
                <i class="fa fa-pencil" aria-hidden="true"></i>
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <i class="fa fa-commenting" aria-hidden="true"></i>
                <i class="fa fa-clone" aria-hidden="true"></i>
                <i class="fa fa-trash" aria-hidden="true"></i>
              </div>
              <button className="closeModal" onClick={closeModal}>
                X
              </button>
            </div>
            <div className="calendar-date-time">
              <h4>Lesson with {userData.name}</h4>
              <div className="current-date">
                <i class="fa fa-calendar" aria-hidden="true"></i>
                {startDate}
              </div>
              <div className="current-date">
                <i class="fa fa-clock" aria-hidden="true"></i>
                17:00 - 17:30
              </div>
            </div>
          </div>
        </ReactModal>
        <ReactModal
          isOpen={modalIsOpen === "addEvent"}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={addEventStyles}
          contentLabel="Example Modal"
        >
          <div className="calendar-modal">
            <div className="close-h add">
              <h4>
                <strong>{startDate}</strong>
              </h4>
              <button className="closeModal" onClick={closeModal}>
                X
              </button>
            </div>
            <div className="calendar-date-time">0 Scheduled Event(s)</div>
            <hr></hr>
            <div className="multi" onClick={openQuickAddLessonModal}>
              <i class="fa fa-calendar-check" aria-hidden="true"></i>
              <div>
                <strong>Quick-Add Lesson</strong>
                <p>
                  Create a new lesson with your default category, length, and
                  price.
                </p>
              </div>
            </div>
            <div className="multi">
              <i class="fa fa-calendar-plus" aria-hidden="true"></i>
              <div>
                <strong>New Event</strong>
                <p>Create a new event with custom settings.</p>
              </div>
            </div>
            <div className="multi">
              <i class="fa fa-calendar" aria-hidden="true"></i>
              <div>
                <strong>New Non-Tutoring Event</strong>
                <p>Create a new event that doesn't require students.</p>
              </div>
            </div>
          </div>
        </ReactModal>
        <ReactModal
          isOpen={modalIsOpen === "quickAddLesson"}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={quickAddLessonStyles}
          contentLabel="Example Modal"
        >
          <div className="calendar-modal">
            <div className="close-h add">
              <h4>
                <strong>Quick Add Lesson</strong>
              </h4>
              <button className="closeModal" onClick={closeModal}>
                X
              </button>
            </div>
            <br></br>
            <form name="studentProfile">
              <div className="row d-flex">
                <div className="col-xl-12 col-xxl-12">
                  <div className="formbold-form-step-1 active">
                    <div className="formbold-input-flex">
                      <div>
                        <label htmlFor="tutor" className="formbold-form-label">
                          Tutor
                        </label>
                        <input
                          type="text"
                          name="tutor"
                          className="form-control"
                          // value={formData.first_name}
                          // onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="student"
                          className="formbold-form-label"
                        >
                          Student
                        </label>
                        <input
                          type="text"
                          name="student"
                          className="form-control"
                          // value={formData.last_name}
                          // onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <label
                          htmlFor="location"
                          className="formbold-form-label"
                        >
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          className="form-control"
                          // value={formData.email}
                          // onChange={handleChange}
                        />
                      </div>
                      <div>
                        <div>
                          <label htmlFor="date" className="formbold-form-label">
                            Date
                          </label>
                          <input
                            type="date"
                            name="date"
                            className="form-control"
                            // value={formData.phone}
                            // onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <label
                          htmlFor="address"
                          className="formbold-form-label"
                        >
                          Time
                        </label>
                        <br></br>

                        <input
                          type="time"
                          name="time"
                          className="form-control"
                          // value={tenantData.address}
                          // onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <div
                          className="preference"
                          style={{ fontSize: "15px" }}
                        >
                          <input
                            type="checkbox"
                            name="event_repeats"
                            value="This event repeats"
                          />
                          This event repeats
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
                            Visibility
                          </label>
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="Public - Visible on the Student Portal calendar to all students"
                            name="visibility"
                          ></input>
                          Public - Visible on the Student Portal calendar to all
                          students
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="Private - Visible on the Student Portal calendar to current attendees only"
                            name="visibility"
                          ></input>
                          Private - Visible on the Student Portal calendar to
                          current attendees only
                        </div>
                      </div>
                    </div>

                    <div className="formbold-input-flex">
                      <div>
                        <div
                          className="preference"
                          style={{ fontSize: "15px" }}
                        >
                          <input
                            type="checkbox"
                            name="event_credit"
                            value="This event requires a make-up credit"
                          />
                          This event requires a make-up credit
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

                    <button className="formbold-btn">Save</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ReactModal>
        <main className="content student">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
                <div style={{ zIndex: "1" }}>
                  <Calendar
                    localizer={localizer}
                    events={events}
                    style={{ height: 500 }}
                    step={60}
                    popup={true}
                    selectable={true}
                    onSelectSlot={(e) => openNewAppointmentModal(e)}
                    onSelectEvent={(e) => handleSelectedEvent(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Calendars;
