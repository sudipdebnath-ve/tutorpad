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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { API_URL } from "../../../utils/config.js";

const Calendars = () => {
  const {
    sidebarToggle,
    userData,
    fetchData,
    token,
    getTutor,
    allTutors,
    fetchEvent,
    allEvents,
  } = useUserDataContext();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [eventDesc, setEventDesc] = useState({});
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [addEvent, setAddEvent] = useState({});
  const [eventRepeats, setEventRepeats] = useState(false);
  const [repeatsIndefinitely, setRepeatsIndefinitely] = useState(true);

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
      getTutor();
      fetchEvent();
    }
  }, []);

  // const eventArr = [
  //   {
  //     title: "DTS STARTS",
  //     start: new Date(2024, 0, 13, 0, 0, 0),
  //     end: new Date(2024, 0, 13, 0, 0, 0),
  //   },

  //   {
  //     title: "DTS ENDS",
  //     start: new Date(2024, 0, 9, 0, 0, 0),
  //     end: new Date(2024, 0, 9, 0, 0, 0),
  //   },

  //   {
  //     title: "Meeting",
  //     start: new Date(2023, 3, 12, 10, 30, 0, 0),
  //     end: new Date(2023, 3, 12, 12, 30, 0, 0),
  //     desc: "Pre-meeting meeting, to prepare for the meeting",
  //   },
  //   {
  //     title: "Multi-day Event",
  //     start: new Date(2023, 10, 20, 19, 30, 0),
  //     end: new Date(2023, 10, 22, 2, 0, 0),
  //   },
  // ];
  let eventArr = [];
  if (allEvents) {
    allEvents?.forEach((element) => {
      let myObject = {
        title: element.event_name,
        start: element.start_date,
        end: element.end_date,
        start_time: element.start_time,
        end_time: element.end_time,
        desc: element.event_public_desc,
      };

      eventArr.push(myObject);
    });
  }

  console.log(allEvents);
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

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "event_repeats") {
      if (e.target.checked) {
        setEventRepeats(true);
      } else {
        setEventRepeats(false);
      }
    }
    // if (name === "date") {
    //   setEventDate(value);
    // }
    if (name === "repeats_indefinitely") {
      if (e.target.checked) {
        setRepeatsIndefinitely(true);
      } else {
        setRepeatsIndefinitely(false);
      }
    }
    setAddEvent({ ...addEvent, [name]: value });
  };

  const saveEvent = async (e) => {
    e.preventDefault();
    let selectedTutor = document.getElementById("tutor");
    // var value = selectedTutor.value;

    // addEvent["date"] = formatDate(eventDate);
    addEvent["event_type"] = "quickAddLesson";
    addEvent["tutor"] = selectedTutor?.value;

    if (!addEvent.hasOwnProperty("quick_add_visibility")) {
      addEvent["quick_add_visibility"] =
        "Public - Visible on the Student Portal calendar to all students";
    }
    console.log(addEvent);
    const config = {
      method: "POST",
      url: `${API_URL}create-event`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: addEvent,
    };
    await axios(config)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        getTutor();

        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectedEvent = (e) => {
    console.log(e);
    openModal("event");
    let [hours, minutes] = e.start_time.split(":");
    let newTimeString = `${hours}:${minutes}`;
    let [endhours, endminutes] = e.end_time.split(":");
    let endTimeString = `${endhours}:${endminutes}`;
    setEventStartTime(newTimeString);
    setEventEndTime(endTimeString);
    setEventDesc(e);
  };
  const openNewAppointmentModal = (e) => {
    openModal("addEvent");
    console.log(e.start.toDateString());
    setEventDate(e.start.toDateString());
  };
  const openQuickAddLessonModal = (e) => {
    openModal("quickAddLesson");
    console.log(e);
  };
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const openNewEventModal = (e) => {
    openModal("newEvent");
    console.log(e);
  };
  const openNewNonTutoringEventModal = (e) => {
    openModal("newNonTutoringEvent");
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
                {eventDesc.start}
              </div>
              <div className="current-date">
                <i class="fa fa-clock" aria-hidden="true"></i>
                {eventStartTime} - {eventEndTime}
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
                <strong>{eventDate}</strong>
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
            <div className="multi" onClick={openNewEventModal}>
              <i class="fa fa-calendar-plus" aria-hidden="true"></i>
              <div>
                <strong>New Event</strong>
                <p>Create a new event with custom settings.</p>
              </div>
            </div>
            <div className="multi" onClick={openNewNonTutoringEventModal}>
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
                    <div className="formbold-input-flex diff">
                      <div>
                        <label htmlFor="tutor" className="formbold-form-label">
                          Title
                        </label>
                        <div>
                          <input
                            type="text"
                            name="event_name"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <label htmlFor="tutor" className="formbold-form-label">
                          Tutor
                        </label>
                        <div>
                          <select
                            name="tutor"
                            className="form-control"
                            onChange={handleChange}
                            id="tutor"
                          >
                            <option>Select Tutor</option>
                            {allTutors.map((item) => {
                              return (
                                <option value={item.id}>{item.name}</option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="student"
                          className="formbold-form-label"
                        >
                          Student
                        </label>
                        <div>
                          <select
                            name="student"
                            className="form-control"
                            onChange={handleChange}
                          >
                            <option>Open Lesson Slot</option>
                          </select>
                        </div>
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
                          onChange={handleChange}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <label
                          htmlFor="start_date"
                          className="formbold-form-label"
                        >
                          Start Date
                        </label>
                        <input
                          type="date"
                          name="start_date"
                          className="form-control"
                          value={formatDate(eventDate)}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <div>
                          <label htmlFor="date" className="formbold-form-label">
                            End Date
                          </label>
                          <input
                            type="date"
                            name="end_date"
                            className="form-control"
                            // value={formatDate(eventDate)}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <label
                          htmlFor="start_time"
                          className="formbold-form-label"
                        >
                          Start Time
                        </label>
                        <br></br>

                        <input
                          type="time"
                          name="start_time"
                          className="form-control"
                          // value={tenantData.address}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="end_time"
                          className="formbold-form-label"
                        >
                          End Time
                        </label>
                        <br></br>

                        <input
                          type="time"
                          name="end_time"
                          className="form-control"
                          // value={tenantData.address}
                          onChange={handleChange}
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
                            onChange={handleChange}
                          />
                          This event repeats
                        </div>
                      </div>
                    </div>
                    {eventRepeats && (
                      <>
                        <div className="recurring">
                          <div className="recurring-head">
                            <i class="fa fa-undo" aria-hidden="true"></i>{" "}
                            <strong>Recurring Event</strong>
                          </div>

                          <div className="formbold-input-flex diff">
                            <div>
                              <div>
                                <label
                                  htmlFor="frequency"
                                  className="formbold-form-label"
                                >
                                  Frequency
                                </label>
                              </div>
                              <div className="input-radio">
                                <input
                                  type="radio"
                                  value="Daily"
                                  name="frequency"
                                  onChange={handleChange}
                                ></input>
                                Daily
                                <input
                                  type="radio"
                                  value="Weekly"
                                  name="frequency"
                                  onChange={handleChange}
                                ></input>
                                Weekly
                                <input
                                  type="radio"
                                  value="Monthly"
                                  name="frequency"
                                  onChange={handleChange}
                                ></input>
                                Monthly
                                <input
                                  type="radio"
                                  value="yearly"
                                  name="frequency"
                                  onChange={handleChange}
                                ></input>
                                Yearly
                              </div>
                            </div>
                          </div>
                          <div className="formbold-input-flex align-items-end">
                            <div>
                              <label
                                htmlFor="time"
                                className="formbold-form-label"
                              >
                                Every
                              </label>
                              <br></br>
                              <input
                                type="text"
                                name="every"
                                className="form-control"
                                placeholder="1"
                                // value={tenantData.address}
                                onChange={handleChange}
                              />{" "}
                            </div>
                            <span>Weeks</span>
                            {!repeatsIndefinitely && (
                              <div>
                                <label
                                  htmlFor="time"
                                  className="formbold-form-label"
                                >
                                  Repeat Until
                                </label>
                                <br></br>
                                <input
                                  type="date"
                                  name="repeat_until"
                                  className="form-control"
                                  // value={tenantData.address}
                                  onChange={handleChange}
                                />{" "}
                              </div>
                            )}
                          </div>
                          <div className="formbold-input-flex">
                            <div>
                              <div
                                className="preference"
                                style={{ fontSize: "15px" }}
                              >
                                <input
                                  type="checkbox"
                                  name="repeats_indefinitely"
                                  value="This event repeats"
                                  onChange={handleChange}
                                  checked={repeatsIndefinitely}
                                />
                                Repeat indefinitely
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="formbold-input-flex diff">
                      <div>
                        <div>
                          <label
                            htmlFor="visibility"
                            className="formbold-form-label"
                          >
                            Visibility
                          </label>
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="Public - Visible on the Student Portal calendar to all students"
                            name="quick_add_visibility"
                            onChange={handleChange}
                            checked
                          ></input>
                          Public - Visible on the Student Portal calendar to all
                          students
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="Private - Visible on the Student Portal calendar to current attendees only"
                            name="quick_add_visibility"
                            onChange={handleChange}
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
                            name="quickadd_event_credit"
                            value="This event requires a make-up credit"
                            onChange={handleChange}
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

                    <button className="formbold-btn" onClick={saveEvent}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ReactModal>
        <ReactModal
          isOpen={modalIsOpen === "newEvent"}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={quickAddLessonStyles}
          contentLabel="Example Modal"
        >
          <div className="calendar-modal">
            <div className="close-h add">
              <h4>
                <strong>New Calendar Event</strong>
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
                    <div className="formbold-input-flex align-items-end">
                      <div>
                        <label htmlFor="tutor" className="formbold-form-label">
                          Tutor
                        </label>
                        <div>
                          <select
                            name="tutor"
                            className="form-control"
                            // onChange={handleChange}
                          >
                            <option>No Tutor - Entire School</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <div
                          className="preference"
                          style={{ fontSize: "15px" }}
                        >
                          <input
                            type="checkbox"
                            name="add_substitute_tutor"
                            value="Add substitute tutor"
                          />
                          Add substitute tutor
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <label
                          htmlFor="Substitute Tutor"
                          className="formbold-form-label"
                        >
                          Substitute Tutor
                        </label>
                        <input
                          type="text"
                          name="substitute_tutor"
                          className="form-control"
                          // value={formData.email}
                          // onChange={handleChange}
                        />
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
                            name="new_event_visibility"
                          ></input>
                          Public - Visible on the Student Portal calendar to all
                          students
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="Private - Visible on the Student Portal calendar to current attendees only"
                            name="new_event_visibility"
                          ></input>
                          Private - Visible on the Student Portal calendar to
                          current attendees only
                        </div>
                      </div>
                    </div>
                    <div class="input-check">
                      <input
                        type="checkbox"
                        name="student_makeup_credit"
                        value="This event requires a make-up credit"
                      />
                      This event requires a make-up credit
                    </div>
                    <div class="input-check">
                      <input
                        type="checkbox"
                        name="student_register_lesson"
                        value="Allow students to register through the Student Portal"
                      />
                      Allow students to register through the Student Portal
                    </div>
                    <hr></hr>
                    <div className="formbold-input-flex">
                      <div>
                        <label
                          htmlFor="location"
                          className="formbold-form-label"
                        >
                          Attendees
                        </label>
                        <input
                          type="text"
                          name="attendees"
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
                      <div>
                        <label
                          htmlFor="address"
                          className="formbold-form-label"
                        >
                          Duration
                        </label>
                        <br></br>

                        <input
                          type="text"
                          name="duration"
                          className="form-control"
                          placeholder="30 min"
                          // value={tenantData.address}
                          // onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div></div>
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
                          All Day
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <label
                          htmlFor="category"
                          className="formbold-form-label"
                        >
                          Category
                        </label>
                        <br></br>

                        <select name="category" className="form-control">
                          <option>Lesson</option>
                          <option>Group Lesson</option>
                          <option>Vacation</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="location"
                          className="formbold-form-label"
                        >
                          Location
                        </label>
                        <br></br>

                        <select
                          className="form-control"
                          name="location"
                        ></select>
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
                            htmlFor="student_pricing"
                            className="formbold-form-label"
                          >
                            Student Pricing
                          </label>
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="Student Default"
                            name="student_pricing"
                          ></input>
                          Student Default
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="No charge (₹ 0.00)"
                            name="student_pricing"
                          ></input>
                          No charge (₹ 0.00)
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="No charge (₹ 0.00)"
                            name="student_pricing"
                          ></input>
                          Specify price per student
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input-flex diff">
                      <div>
                        <label
                          htmlFor="public_desc"
                          className="formbold-form-label"
                        >
                          Public Description <span>Optional</span>
                        </label>

                        <textarea name="public_desc" className="form-control" />
                      </div>
                    </div>
                    <div className="formbold-input-flex diff">
                      <div>
                        <label
                          htmlFor="private_desc"
                          className="formbold-form-label"
                        >
                          Private Description <span>Optional</span>
                        </label>
                        <br></br>
                        <span>
                          Visible only to you, even if the event is public
                        </span>
                        <textarea
                          name="private_desc"
                          className="form-control"
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

                    <button className="formbold-btn">Save</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ReactModal>
        <ReactModal
          isOpen={modalIsOpen === "newNonTutoringEvent"}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={quickAddLessonStyles}
          contentLabel="Example Modal"
        >
          <div className="calendar-modal">
            <div className="close-h add">
              <h4>
                <strong>New Non-Tutoring Event</strong>
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
                        <div>
                          <select
                            name="tutor"
                            className="form-control"
                            // onChange={handleChange}
                          >
                            <option></option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="address"
                          className="formbold-form-label"
                        >
                          Category
                        </label>
                        <br></br>

                        <select className="form-control">
                          <option>Lesson</option>
                          <option>Group Lesson</option>
                          <option>Vacation</option>
                        </select>
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
                        <br></br>

                        <select
                          name="location"
                          className="form-control"
                        ></select>
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
                        <label htmlFor="time" className="formbold-form-label">
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
                      <div>
                        <label
                          htmlFor="duration"
                          className="formbold-form-label"
                        >
                          Duration
                        </label>
                        <br></br>

                        <input
                          type="text"
                          name="duration"
                          className="form-control"
                          placeholder="30 min"
                          // value={tenantData.address}
                          // onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div></div>
                      <div>
                        <div
                          className="preference"
                          style={{ fontSize: "15px" }}
                        >
                          <input
                            type="checkbox"
                            name="duration_all_day"
                            value="This event repeats"
                          />
                          All Day
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
                            name="event_repeats"
                            value="This event repeats"
                          />
                          This event repeats
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input-flex diff">
                      <div>
                        <label
                          htmlFor="public_desc"
                          className="formbold-form-label"
                        >
                          Public Description <span>Optional</span>
                        </label>

                        <textarea name="public_desc" className="form-control" />
                      </div>
                    </div>
                    <div className="formbold-input-flex diff">
                      <div>
                        <div
                          className="public_desc_on_calendar"
                          style={{ fontSize: "15px" }}
                        >
                          <input
                            type="checkbox"
                            name="public_desc_on_calendar"
                            value="This event repeats"
                          />
                          Show public description directly on calendar
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
        <main className="content">
          <ToastContainer />
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
                <div style={{ zIndex: "1" }}>
                  <Calendar
                    localizer={localizer}
                    events={eventArr}
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
