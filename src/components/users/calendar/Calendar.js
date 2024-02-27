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
import Select from "react-select";
import OptionBox from "../../form/option-box/OptionBox.js";
import {settings} from 'react-icons-kit/feather/settings';
const Calendars = () => {
  const {
    sidebarToggle,
    userId,
    userData,
    fetchData,
    token,
    getTutor,
    allTutors,
    fetchEvent,
    allEvents,
    studentData,
    fetchStudentData,
    fetchLocation,
    allLocation
  } = useUserDataContext();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [eventDesc, setEventDesc] = useState({});
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [addEvent, setAddEvent] = useState({});
  const [eventRepeats, setEventRepeats] = useState(false);
  const [repeatsIndefinitely, setRepeatsIndefinitely] = useState(true);
  const [error, setError] = useState({});
  const [allDay, setAllDay] = useState(false);
  const [disableTimeDuration, setDisableTimeDuration] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Daily");
  const [showSubstituteTutor, setShowSubstituteTutor] = useState(false);
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [everyWeeks, setEveryWeeks] = useState(1);
  const [selectedTutor, setSelectedTutor] = useState('');
  const [visibleRange, setVisibleRange] = useState({
    start: new Date(),
    end: new Date(),
  });



  const navigate = useNavigate();

  const localizer = momentLocalizer(moment);

  // useEffect to trigger an initial selection event after the component mounts
useEffect(() => {
  if (allTutors.length > 0) {
    // Set the selectedTutor to the id of the first tutor
    setSelectedTutor(allTutors[0].id);
  }
}, [allTutors]); // Make sure to include allTutors as a dependency


  useEffect(() => {
    var token = JSON.parse(localStorage.getItem("tutorPad"));
    if (!token) {
      navigate("/signin");
    } else {
      setTimeout(() => {
        fetchData(token);
        fetchStudentData();
      }, 2000);
      getTutor();

      //fetchEvent();
      // Fetch events when the component mounts
      fetchEventsForVisibleRange(visibleRange);
      console.log(studentData);
    }
  }, []);

  const handleAttendeesChange = (selectedOptions) => {
    setSelectedAttendees(selectedOptions);
  };

  // Fetch events for the given date range
  const fetchEventsForVisibleRange = async (range) => {
    const startDate = moment(range.start).startOf("month").format("YYYY-MM-DD");
    const endDate = moment(range.end).endOf("month").format("YYYY-MM-DD");

    fetchEvent(startDate, endDate);
  };

  const handleRangeChange = (range) => {
    setVisibleRange(range);
    fetchEventsForVisibleRange(range);
  };

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
        title: element.event.event_name,
        start: new Date(element.occurrence_start_date),
        end: new Date(element.occurrence_end_date),
        start_time: element.occurrence_start_time,
        end_time: element.occurrence_end_time,
        desc: element.event.event_public_desc || "",
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

  function closeModal(e) {
    setIsOpen(e);
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
    if (name === "start_date") {
      // Use the selected date if it's different from the default eventDate
      const selectedDate = formatDate(startDate);

      setStartDate(value !== selectedDate ? value : formatDate(startDate));
    }
    if (name === "end_date") {
      // Use the selected date if it's different from the default eventDate
      const selectedDate = formatDate(endDate);

      setEndDate(value !== selectedDate ? value : formatDate(endDate));
    }
    if (name === "repeats_indefinitely") {
      if (e.target.checked) {
        setRepeatsIndefinitely(true);
      } else {
        setRepeatsIndefinitely(false);
      }
    }
    if (name === "frequency") {
      setSelectedOption(e.target.value);
    }
    if (name === "every") {
      const parsedValue = parseInt(value); // Ensure the value is parsed as an integer
    setEveryWeeks(parsedValue); // Update everyWeeks state
    setAddEvent((prev) => ({ ...prev, [name]: parsedValue })); // Update addEvent state
    } 
    setAddEvent({ ...addEvent, [name]: value });
  };

  const handleNewEventChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "event_repeats") {
      if (e.target.checked) {
        setEventRepeats(true);
      } else {
        setEventRepeats(false);
      }
    }
    if (name === "start_date") {
      // Use the selected date if it's different from the default eventDate
      const selectedDate = formatDate(startDate);

      setStartDate(value !== selectedDate ? value : formatDate(startDate));
    }

    if (name === "repeats_indefinitely") {
      if (e.target.checked) {
        setRepeatsIndefinitely(true);
      } else {
        setRepeatsIndefinitely(false);
      }
    }
    if (name === "frequency") {
      setSelectedOption(e.target.value);
    }

    if (name === "time") {
      addEvent["start_time"] = e.target.value;
    }

    if (name === "all_day") {
      setAllDay((prev) => !prev);
      setDisableTimeDuration((prev) => !prev); // Disable date and time fields when "All Day" is checked
      let end_time = "23:59"; // Default end time for "All Day" events
      addEvent["end_time"] = end_time;
      addEvent["end_date"] = formatDate(startDate);
    }
    if (name === "add_substitute_tutor") {
      setShowSubstituteTutor((prev) => !prev);
    }

    if(name === "tutor"){
      setSelectedTutor(e.target.value);
       // Filter out the selected tutor from the list of all tutors
  console.log(selectedTutor);
    }

    if (name === "every" && eventRepeats===true) {
      const parsedValue = parseInt(value); // Ensure the value is parsed as an integer
    setEveryWeeks(parsedValue); // Update everyWeeks state
    setAddEvent((prev) => ({ ...prev, [name]: parsedValue })); // Update addEvent state
    } 
    else {
      setAddEvent({ ...addEvent, [name]: value });
    }
  };

  const filteredTutors = allTutors.filter((tutor) => tutor.id !== parseInt(selectedTutor));
  console.log(filteredTutors);


  const saveNewCalenderEvent = async (e) => {
    e.preventDefault();
    let selectedTutor = document.getElementById("tutor");
    let substitute_tutor = document.getElementById("substitute_tutor");
    //  let attendees=document.getElementById("attendees")
    // let time= document.getElementById("time")
    let category = document.getElementById("category");

    // if (allDay) {
    //   // If not an all-day event, retrieve start and end times from inputs
    //   addEvent[start_time] = start_time;
    //   addEvent[end_time] = end_time;
    // }

    // addEvent["date"] = formatDate(eventDate);
    addEvent["event_type"] = "newCalendarEvent";
    addEvent["tutor"] = selectedTutor?.value;
    addEvent["substitute_tutor"] = substitute_tutor?.value;
    addEvent["attendees"] = selectedAttendees.map((option) => option.value);
    //  addEvent["start_time"] = time?.value;
    addEvent["start_date"] = formatDate(startDate);
    addEvent["category"] = category?.value;

    if (!allDay) {
      // Calculate duration in milliseconds
      let durationMs =
        parseInt(document.getElementsByName("duration")[0].value) * 60000;

      // Parse the time input to extract hours and minutes
      let hours = 0;
      let minutes = 0;
      if (addEvent.start_time) {
        [hours, minutes] = addEvent.start_time.split(":").map(Number);
      }

      // Create a new Date object with the start date and time components
      let startDateTime = new Date(addEvent.start_date);
      startDateTime.setHours(hours);
      startDateTime.setMinutes(minutes);

      // Calculate the end date by adding the duration to the start date and time
      let endDate = new Date(startDateTime.getTime() + durationMs); // Convert duration to milliseconds and add to start date
      //console.log(endDate);

      // Update addEvent object with calculated end_date
      // Update addEvent object with calculated end_date in a localized format
      addEvent["end_date"] = `${endDate.getFullYear()}-${(
        endDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${endDate.getDate().toString().padStart(2, "0")}`;
      addEvent["end_time"] = `${endDate.getHours()}:${endDate.getMinutes()}`;
    }
    // Check if addEvent includes start_date and end_date properties
    if (!addEvent.hasOwnProperty("start_date")) {
      addEvent["start_date"] = formatDate(startDate);
    }

    if (!addEvent.hasOwnProperty("end_date")) {
      addEvent["end_date"] = formatDate(startDate);
    }

    if (!addEvent.hasOwnProperty("every")) {
      addEvent["every"] = everyWeeks;
    }

    if (!addEvent.hasOwnProperty("frequency") && eventRepeats === true) {
      addEvent["frequency"] = selectedOption;
    }

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
        setEventRepeats(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.success === false) {
          setError(error.response.data.data);
        }
      });
    fetchEventsForVisibleRange(visibleRange);
  };

  const saveNonTutoringEvent = async (e) => {
    e.preventDefault();
    let selectedTutor = document.getElementById("tutor");
    let category = document.getElementById("category");

    addEvent["event_type"] = "Non Tutoring Event";
    addEvent["tutor"] = selectedTutor?.value;
    
    addEvent["start_date"] = formatDate(startDate);
    addEvent["category"] = category?.value;

    if (!allDay) {
      // Calculate duration in milliseconds
      let durationMs =
        parseInt(document.getElementsByName("duration")[0].value) * 60000;

      // Parse the time input to extract hours and minutes
      let hours = 0;
      let minutes = 0;
      if (addEvent.start_time) {
        [hours, minutes] = addEvent.start_time.split(":").map(Number);
      }

      // Create a new Date object with the start date and time components
      let startDateTime = new Date(addEvent.start_date);
      startDateTime.setHours(hours);
      startDateTime.setMinutes(minutes);

      // Calculate the end date by adding the duration to the start date and time
      let endDate = new Date(startDateTime.getTime() + durationMs); // Convert duration to milliseconds and add to start date
      //console.log(endDate);

      // Update addEvent object with calculated end_date
      // Update addEvent object with calculated end_date in a localized format
      addEvent["end_date"] = `${endDate.getFullYear()}-${(
        endDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${endDate.getDate().toString().padStart(2, "0")}`;
      addEvent["end_time"] = `${endDate.getHours()}:${endDate.getMinutes()}`;
    }
    // Check if addEvent includes start_date and end_date properties
    if (!addEvent.hasOwnProperty("start_date")) {
      addEvent["start_date"] = formatDate(startDate);
    }

    if (!addEvent.hasOwnProperty("end_date")) {
      addEvent["end_date"] = formatDate(startDate);
    }

    if (!addEvent.hasOwnProperty("every") && eventRepeats === true) {
      addEvent["every"] = everyWeeks;
    }

    if (!addEvent.hasOwnProperty("frequency") && eventRepeats === true) {
      addEvent["frequency"] = selectedOption;
    }

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
        setEventRepeats(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.success === false) {
          setError(error.response.data.data);
        }
      });
    fetchEventsForVisibleRange(visibleRange);
  };

  const saveEvent = async (e) => {
    e.preventDefault();
    let selectedTutor = document.getElementById("tutor");
    // var value = selectedTutor.value;

    // addEvent["date"] = formatDate(eventDate);
    addEvent["event_type"] = "quickAddLesson";
    addEvent["tutor"] = selectedTutor?.value;

    // Check if addEvent includes start_date and end_date properties
    if (!addEvent.hasOwnProperty("start_date")) {
      addEvent["start_date"] = formatDate(startDate);
    }

    if (!addEvent.hasOwnProperty("end_date")) {
      addEvent["end_date"] = formatDate(endDate);
    }

    if (!addEvent.hasOwnProperty("frequency")) {
      addEvent["frequency"] = selectedOption;
    }

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
        if (error.response.data.success === false) {
          setError(error.response.data.data);
        }
      });
    fetchEventsForVisibleRange(visibleRange);
  };

  const handleSelectedEvent = (e) => {
    console.log(e);
    openModal("event");
    let [hours, minutes] = e.start_time.split(":");
    let newTimeString = `${hours}:${minutes}`;
    let [endhours, endminutes] = e.end_time.split(":");
    let endTimeString = `${endhours}:${endminutes}`;
    // Convert start and end dates to string format
    const startDateString = e.start.toLocaleString();
    const endDateString = e.end.toLocaleString();
    setEventStartTime(newTimeString);
    setEventEndTime(endTimeString);
    setEventDesc({ ...e, start: startDateString, end: endDateString });
  };
  const openNewAppointmentModal = (e) => {
    openModal("addEvent");
    console.log(e.start.toDateString());
    setEventDate(e.start.toDateString());
    setStartDate(e.start.toDateString());
    setEndDate(e.start.toDateString());
  };
  const openQuickAddLessonModal = (e) => {
    openModal("quickAddLesson");
    console.log(e);
  };


// Edit 
  const openQuickAddLessonEditModal = (e) => {
    openModal("quickAddLessonEdit");
    console.log(e);
  };
  useEffect(()=>{
    fetchLocation();
    console.log("Locations",allLocation);
  },[userId])


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
                <i onClick={openQuickAddLessonEditModal} class="fa fa-pencil" aria-hidden="true"></i>
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
                          <div className="pt-2">
                            <small style={{ color: "red" }}>
                              {error?.event_name?.length ? (
                                error.event_name[0]
                              ) : (
                                <></>
                              )}
                            </small>
                          </div>
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
                        <select className="form-control" name="location">
                            {
                              allLocation.map((e)=>{
                                return <option value={e.id}>{e.eventloc_name}</option>
                              })
                            }
                        </select>
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
                          value={formatDate(startDate)}
                          onChange={handleChange}
                        />
                        <div className="pt-2">
                          <small style={{ color: "red" }}>
                            {error?.start_date?.length ? (
                              error.start_date[0]
                            ) : (
                              <></>
                            )}
                          </small>
                        </div>
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
                            value={formatDate(endDate)}
                            onChange={handleChange}
                          />
                          <div className="pt-2">
                            <small style={{ color: "red" }}>
                              {error?.end_date?.length ? (
                                error.end_date[0]
                              ) : (
                                <></>
                              )}
                            </small>
                          </div>
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
                        <div className="pt-2">
                          <small style={{ color: "red" }}>
                            {error?.start_time?.length ? (
                              error.start_time[0]
                            ) : (
                              <></>
                            )}
                          </small>
                        </div>
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
                        <div className="pt-2">
                          <small style={{ color: "red" }}>
                            {error?.end_time?.length ? (
                              error.end_time[0]
                            ) : (
                              <></>
                            )}
                          </small>
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
                                  checked={selectedOption === "Daily"}
                                ></input>
                                Daily
                                <input
                                  type="radio"
                                  value="Weekly"
                                  name="frequency"
                                  onChange={handleChange}
                                  checked={selectedOption === "Weekly"}
                                ></input>
                                Weekly
                                <input
                                  type="radio"
                                  value="Monthly"
                                  name="frequency"
                                  onChange={handleChange}
                                  checked={selectedOption === "Monthly"}
                                ></input>
                                Monthly
                                <input
                                  type="radio"
                                  value="Yearly"
                                  name="frequency"
                                  onChange={handleChange}
                                  checked={selectedOption === "Yearly"}
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
                              <div style={{position:"relative"}}>
                              <input
                                type="text"
                                name="every"
                                className="form-control"
                                style={{
                                  paddingLeft: "25px",
                                  paddingRight: "70px",
                                }}
                                value={everyWeeks}
                                min={1}
                                max={100}
                                onChange={handleChange}
                              />
                              <span
                                  style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                  }}
                                >
                                  {selectedOption === "Daily" || selectedOption === "Weekly" ? "Weeks" : selectedOption}
                                </span>
                              </div>
                            </div>
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
          isOpen={modalIsOpen === "quickAddLessonEdit"}
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
                          <div className="pt-2">
                            <small style={{ color: "red" }}>
                              {error?.event_name?.length ? (
                                error.event_name[0]
                              ) : (
                                <></>
                              )}
                            </small>
                          </div>
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
                          value={formatDate(startDate)}
                          onChange={handleChange}
                        />
                        <div className="pt-2">
                          <small style={{ color: "red" }}>
                            {error?.start_date?.length ? (
                              error.start_date[0]
                            ) : (
                              <></>
                            )}
                          </small>
                        </div>
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
                            value={formatDate(endDate)}
                            onChange={handleChange}
                          />
                          <div className="pt-2">
                            <small style={{ color: "red" }}>
                              {error?.end_date?.length ? (
                                error.end_date[0]
                              ) : (
                                <></>
                              )}
                            </small>
                          </div>
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
                        <div className="pt-2">
                          <small style={{ color: "red" }}>
                            {error?.start_time?.length ? (
                              error.start_time[0]
                            ) : (
                              <></>
                            )}
                          </small>
                        </div>
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
                        <div className="pt-2">
                          <small style={{ color: "red" }}>
                            {error?.end_time?.length ? (
                              error.end_time[0]
                            ) : (
                              <></>
                            )}
                          </small>
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
                                  checked={selectedOption === "Daily"}
                                ></input>
                                Daily
                                <input
                                  type="radio"
                                  value="Weekly"
                                  name="frequency"
                                  onChange={handleChange}
                                  checked={selectedOption === "Weekly"}
                                ></input>
                                Weekly
                                <input
                                  type="radio"
                                  value="Monthly"
                                  name="frequency"
                                  onChange={handleChange}
                                  checked={selectedOption === "Monthly"}
                                ></input>
                                Monthly
                                <input
                                  type="radio"
                                  value="Yearly"
                                  name="frequency"
                                  onChange={handleChange}
                                  checked={selectedOption === "Yearly"}
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
                              <div style={{position:"relative"}}>
                              <input
                                type="text"
                                name="every"
                                className="form-control"
                                style={{
                                  paddingLeft: "25px",
                                  paddingRight: "70px",
                                }}
                                value={everyWeeks}
                                min={1}
                                max={100}
                                onChange={handleChange}
                              />
                              <span
                                  style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                  }}
                                >
                                  {selectedOption === "Daily" || selectedOption === "Weekly" ? "Weeks" : selectedOption}
                                </span>
                              </div>
                            </div>
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
                            onChange={handleNewEventChange}
                          />
                          <div className="pt-2">
                            <small style={{ color: "red" }}>
                              {error?.event_name?.length ? (
                                error.event_name[0]
                              ) : (
                                <></>
                              )}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input-flex align-items-end">
                      <div>
                        <label htmlFor="tutor" className="formbold-form-label">
                          Tutor
                        </label>
                        <div>
                          <select
                            name="tutor"
                            className="form-control"
                            onChange={handleNewEventChange}
                            id="tutor"
                            value={selectedTutor} // Set the value attribute to control the selected value
                          >

                            {allTutors && allTutors.length > 0 ? (
                              allTutors.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))
                            ) : (
                              <option value="">No tutor available</option>
                            )}
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
                            onChange={handleNewEventChange}
                            checked={showSubstituteTutor}
                          />
                          Add substitute tutor
                        </div>
                      </div>
                    </div>
                    {showSubstituteTutor && (
                      <div className="formbold-input-flex">
                        <div>
                          <label
                            htmlFor="Substitute Tutor"
                            className="formbold-form-label"
                          >
                            Substitute Tutor
                          </label>
                          <div>
                            <select
                              name="substitute_tutor"
                              className="form-control"
                              onChange={handleNewEventChange}
                              id="substitute_tutor"
                            >
                              {filteredTutors &&
                                filteredTutors.map((item) => {
                                  return (
                                    <option value={item.id}>{item.name}</option>
                                  );
                                })}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
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
                            name="quick_add_visibility"
                            onChange={handleNewEventChange}
                          ></input>
                          Public - Visible on the Student Portal calendar to all
                          students
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="Private - Visible on the Student Portal calendar to current attendees only"
                            name="quick_add_visibility"
                            onChange={handleNewEventChange}
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
                        onChange={handleNewEventChange}
                      />
                      This event requires a make-up credit
                    </div>
                    <div class="input-check">
                      <input
                        type="checkbox"
                        name="student_register_lesson"
                        value="Allow students to register through the Student Portal"
                        onChange={handleNewEventChange}
                      />
                      Allow students to register through the Student Portal
                    </div>
                    <hr></hr>
                    <div className="formbold-input-flex">
                      <div>
                        <label
                          htmlFor="attendees"
                          className="formbold-form-label"
                        >
                          Attendees
                        </label>
                        <div>
                          <Select
                            name="attendees"
                            options={
                              studentData &&
                              studentData.map((item) => ({
                                value: item.id,
                                label: item.name,
                              }))
                            }
                            isMulti
                            onChange={handleAttendeesChange}
                            value={selectedAttendees}
                          />
                        </div>
                      </div>
                      <div>
                        <div>
                          <label
                            htmlFor="start_date"
                            className="formbold-form-label"
                          >
                            Date
                          </label>
                          <input
                            type="date"
                            name="start_date"
                            className="form-control"
                            value={formatDate(startDate)}
                            onChange={handleNewEventChange}
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
                          id="time"
                          className="form-control"
                          // value={tenantData.address}
                          onChange={handleNewEventChange}
                          required
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
                          onChange={handleNewEventChange}
                          disabled={disableTimeDuration}
                          required
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
                            name="all_day"
                            value="All day"
                            checked={allDay}
                            onChange={handleNewEventChange}
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

                        <select
                          name="category"
                          className="form-control"
                          onChange={handleNewEventChange}
                          id="category"
                        >
                          <option value="Lesson">Lesson</option>
                          <option value="Group Lesson">Group Lesson</option>
                          <option value="Vacation">Vacation</option>
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
                          onChange={handleNewEventChange}
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
                            onChange={handleNewEventChange}
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
                                  onChange={handleNewEventChange}
                                  checked={selectedOption === "Daily"}
                                ></input>
                                Daily
                                <input
                                  type="radio"
                                  value="Weekly"
                                  name="frequency"
                                  onChange={handleNewEventChange}
                                  checked={selectedOption === "Weekly"}
                                ></input>
                                Weekly
                                <input
                                  type="radio"
                                  value="Monthly"
                                  name="frequency"
                                  onChange={handleNewEventChange}
                                  checked={selectedOption === "Monthly"}
                                ></input>
                                Monthly
                                <input
                                  type="radio"
                                  value="Yearly"
                                  name="frequency"
                                  onChange={handleNewEventChange}
                                  checked={selectedOption === "Yearly"}
                                ></input>
                                Yearly
                              </div>
                            </div>
                          </div>
                          <div className="formbold-input-flex align-items-end">
                            <div>
                              <label
                                htmlFor="every"
                                className="formbold-form-label"
                              >
                                Every
                              </label>
                              <br></br>
                              <div style={{ position: "relative" }}>
                                <input
                                  type="number"
                                  name="every"
                                  className="form-control"
                                  style={{
                                    paddingLeft: "25px",
                                    paddingRight: "70px",
                                  }}
                                  value={everyWeeks}
                                  min={1}
                                  max={100}
                                  onChange={handleNewEventChange}
                                />
                                <span
                                  style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                  }}
                                >
                                  {selectedOption === "Daily" || selectedOption === "Weekly" ? "Weeks" : selectedOption}
                                </span>
                              </div>
                            </div>
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
                                  onChange={handleNewEventChange}
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
                                  onChange={handleNewEventChange}
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
                            onChange={handleNewEventChange}
                          ></input>
                          Student Default
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="No charge (₹ 0.00)"
                            name="student_pricing"
                            onChange={handleNewEventChange}
                          ></input>
                          No charge (₹ 0.00)
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="No charge (₹ 0.00)"
                            name="student_pricing"
                            onChange={handleNewEventChange}
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

                        <textarea
                          name="public_desc"
                          className="form-control"
                          onChange={handleNewEventChange}
                        />
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
                          onChange={handleNewEventChange}
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
                      onClick={saveNewCalenderEvent}
                    >
                      Save
                    </button>
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
                            onChange={handleNewEventChange}
                          />
                          <div className="pt-2">
                            <small style={{ color: "red" }}>
                              {error?.event_name?.length ? (
                                error.event_name[0]
                              ) : (
                                <></>
                              )}
                            </small>
                          </div>
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
                            onChange={handleNewEventChange}
                            id="tutor"
                          >
                            {allTutors && allTutors.length > 0 ? (
                              allTutors.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))
                            ) : (
                              <option value="">No tutor available</option>
                            )}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="category"
                          className="formbold-form-label"
                        >
                          Category
                        </label>
                        <br></br>

                        <select
                          name="category"
                          className="form-control"
                          onChange={handleNewEventChange}
                          id="category"
                        >
                          <option value="Lesson">Lesson</option>
                          <option value="Group Lesson">Group Lesson</option>
                          <option value="Vacation">Vacation</option>
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
                        >
                          <option>No option</option>
                        </select>
                      </div>
                      <div>
                        <div>
                          <label htmlFor="start_date" className="formbold-form-label">
                            Date
                          </label>
                          <input
                            type="date"
                            name="start_date"
                            value={formatDate(startDate)}
                            className="form-control"
                            // value={formData.phone}
                            onChange={handleNewEventChange}
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
                          onChange={handleNewEventChange}
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
                          onChange={handleNewEventChange}
                          disabled={disableTimeDuration}
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
                            name="all_day"
                            value="All Day"
                            checked={allDay}
                            onChange={handleNewEventChange}
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
                            onChange={handleNewEventChange}
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
                                  onChange={handleNewEventChange}
                                  checked={selectedOption === "Daily"}
                                ></input>
                                Daily
                                <input
                                  type="radio"
                                  value="Weekly"
                                  name="frequency"
                                  onChange={handleNewEventChange}
                                  checked={selectedOption === "Weekly"}
                                ></input>
                                Weekly
                                <input
                                  type="radio"
                                  value="Monthly"
                                  name="frequency"
                                  onChange={handleNewEventChange}
                                  checked={selectedOption === "Monthly"}
                                ></input>
                                Monthly
                                <input
                                  type="radio"
                                  value="Yearly"
                                  name="frequency"
                                  onChange={handleNewEventChange}
                                  checked={selectedOption === "Yearly"}
                                ></input>
                                Yearly
                              </div>
                            </div>
                          </div>
                          <div className="formbold-input-flex align-items-end">
                            <div>
                              <label
                                htmlFor="every"
                                className="formbold-form-label"
                              >
                                Every
                              </label>
                              <br></br>
                              <div style={{ position: "relative" }}>
                                <input
                                  type="number"
                                  name="every"
                                  className="form-control"
                                  style={{
                                    paddingLeft: "25px",
                                    paddingRight: "70px",
                                  }}
                                  value={everyWeeks}
                                  min={1}
                                  max={100}
                                  onChange={handleNewEventChange}
                                />
                                <span
                                  style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                  }}
                                >
                                  {selectedOption === "Daily" || selectedOption === "Weekly" ? "Weeks" : selectedOption}
                                </span>
                              </div>
                            </div>
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
                                  onChange={handleNewEventChange}
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
                                  onChange={handleNewEventChange}
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
                        <label
                          htmlFor="public_desc"
                          className="formbold-form-label"
                        >
                          Public Description <span>Optional</span>
                        </label>

                        <textarea name="public_desc" onChange={handleNewEventChange} className="form-control" />
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
                            onChange={handleNewEventChange}
                          /> {" "}
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

                    <button className="formbold-btn" onClick={saveNonTutoringEvent} >Save</button>
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
                <div className="card flex-fill w-100">
                <div className="card-header">
                  <div className="row">
                    <div className="col-md-4">
                      <OptionBox icon={settings} options={[{label:'Categories & Locations',route:'/calendar/categories'}]} label={"Options"} />
                    </div>
                  </div>
                </div>
               
                </div>
                  <Calendar
                    localizer={localizer}
                    events={eventArr}
                    style={{ height: 500 }}
                    step={60}
                    popup={true}
                    selectable={true}
                    onSelectSlot={(e) => openNewAppointmentModal(e)}
                    onSelectEvent={(e) => handleSelectedEvent(e)}
                    onRangeChange={handleRangeChange}
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
