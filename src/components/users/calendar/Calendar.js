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
import { settings } from "react-icons-kit/feather/settings";
import DayTabInput from "../../form/day-tab-input/DayTabInput.js";
import {
  createEvents,
  getStudentsByTutorId,
  getEventDetailsById,
  updateEvents,
  deleteEvents,
  cloneEvents,
} from "../../../services/calenderService.js";
import { getCategories } from "../../../services/categoriesService.js";

const customStyles = {
  content: {
    background: "black",
    width: "25%",
    minHeight: "35%",
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
    fetchStudentGroupData,
    studentGroupData,
    fetchLocation,
    allLocation,
    isDarkMode,
  } = useUserDataContext();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [eventDesc, setEventDesc] = useState({});
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventDate, setEventDate] = useState("");
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
  const [selectedTutor, setSelectedTutor] = useState("");
  const [visibleRange, setVisibleRange] = useState({
    start: new Date(),
    end: new Date(),
  });

  const [studentsList, setStudentsList] = useState([]);
  const [startDate, setStartDate] = useState(formatDate(new Date()));

  /**
   * Field State
   */
  const [isEditForm, setIsEditForm] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [event_attendees, set_event_attendees] = useState([]);
  const [location_id, set_location_id] = useState("");
  const [is_public, set_is_public] = useState("1");
  const [event_recurring, set_event_recurring] = useState(false);
  const [event_frequency, set_event_frequency] = useState("Daily");
  const [event_repeat_on, set_event_repeat_on] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [event_frequency_val, set_event_frequency_val] = useState("");
  const [event_repeat_indefinitely, set_event_repeat_indefinitely] =
    useState(true);
  const [event_repeat_until, set_event_repeat_until] = useState("");
  const [require_makeup_credits, set_require_makeup_credits] = useState(false);
  const [event_public_desc, set_event_public_desc] = useState("");
  const [pubdesc_on_calendar, set_pubdesc_on_calendar] = useState(false);
  const [event_private_desc, set_event_private_desc] = useState("");
  const [allow_registration, set_allow_registration] = useState(false);
  const [registration_max, set_registration_max] = useState(0);
  const [student_pricing, set_student_pricing] = useState("default");
  const [student_pricing_val, set_student_pricing_val] = useState(0);
  const [event_all_day, set_event_all_day] = useState(false);
  const [eventtype_id, set_eventtype_id] = useState("1");
  const [eventcat_id, set_eventcat_id] = useState("");
  const [event_subtutor, set_event_subtutor] = useState("");
  const [event_name, set_event_name] = useState("");
  const [event_tutor, set_event_tutor] = useState("");
  const [start_date, set_start_date] = useState("");
  const [start_time, set_start_time] = useState("");
  const [end_date, set_end_date] = useState("");
  const [end_time, set_end_time] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [duration, setDuration] = useState(0);
  const [event_attendees_value, set_event_attendees_value] = useState([]);
  const [update_all, set_update_all] = useState(false);

  const [email_students, set_email_students] = useState(false);
  const [email_parents, set_email_parents] = useState(false);
  const [email_tutors, set_email_tutors] = useState(false);
  const [sms_students, set_sms_students] = useState(false);
  const [sms_parents, set_sms_parents] = useState(false);
  const [sms_tutors, set_sms_tutors] = useState(false);
  const [notes, set_notes] = useState("");
  const [delete_all, set_delete_all] = useState(false);
  const [attendees_info, set_attendees_info] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedStudentNames, setSelectedStudentNames] = useState([]);
  const [val, setVal] = useState(false);
  const [errors, setErrors] = useState({});
  const [isOpenErrors, setIsOpenErrors] = useState(false);


  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: isDarkMode ? "#363636" : "white",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDarkMode ? "#363636" : "white",
        color: isDarkMode ? "#FFF" : "black",
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
  };

  const resetForm = () => {
    set_event_attendees([]);
    set_event_attendees_value([]);
    set_location_id("");
    set_is_public("1");
    set_event_recurring(false);
    set_event_frequency("Daily");
    set_event_repeat_on(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    set_event_frequency_val("");
    set_event_repeat_indefinitely(true);
    set_event_repeat_until("");
    set_require_makeup_credits(false);
    set_event_public_desc("");
    set_pubdesc_on_calendar(false);
    set_event_private_desc("");
    set_allow_registration(false);
    set_registration_max(0);
    set_student_pricing("default");
    set_student_pricing_val(0);
    set_event_all_day(false);
    set_eventcat_id("");
    set_event_subtutor("");
    set_event_name("");
    set_event_tutor("");
    // set_start_date(formatDate(new Date()));
    set_start_time("");
    // set_end_date(formatDate(new Date()));
    set_end_time("");
  };

  const resetDeleteForm = () => {
    set_email_students(false);
    set_email_parents(false);
    set_email_tutors(false);
    set_sms_students(false);
    set_sms_parents(false);
    set_sms_tutors(false);
    set_notes("");
  };

  const getFrequency = (freq) => {
    if (freq == "Daily") {
      return 1;
    } else if (freq == "Weekly") {
      return 2;
    } else if (freq == "Monthly") {
      return 3;
    } else if (freq == "Yearly") {
      return 4;
    }
  };

  const getFrequencyString = (freq) => {
    if (freq == 1) {
      return "Daily";
    } else if (freq == 2) {
      return "Weekly";
    } else if (freq == 3) {
      return "Monthly";
    } else if (freq == 4) {
      return "Yearly";
    }
  };

  const calculateEndDateTimeByDuration = (duration) => {
    let durationMs = parseInt(duration) * 60000;
    let hours = 0;
    let minutes = 0;
    if (start_time) {
      [hours, minutes] = start_time.split(":").map(Number);
    }
    let startDateTime = new Date(start_date);
    startDateTime.setHours(hours);
    startDateTime.setMinutes(minutes);
    let endDate = new Date(startDateTime.getTime() + durationMs); // Convert duration to milliseconds and add to start date
    let end_date_str = `${endDate.getFullYear()}-${(endDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${endDate.getDate().toString().padStart(2, "0")}`;
    set_end_date(end_date_str);
    set_end_time(`${endDate.getHours()}:${endDate.getMinutes()}`);
  };

  const getCategoriesHandler = async () => {
    const result = await getCategories();
    setCategoriesList(result?.data);
  };

  const getEventDetailsByIdHandler = async (id) => {
    resetForm();
    const result = await getEventDetailsById(id);
    const attendees_ids = JSON.parse(result?.data?.event_attendees);
    console.log("DATA=>", result);
    await getStudentsByTutorIdHandler(result.data.event_tutor);
    set_event_attendees_value([
      ...studentsList.filter((e) => {
        console.log("students list.......................", e);
        let verify = attendees_ids.find((f) => f == e.value);
        return verify != undefined;
      }),
    ]);
    set_event_attendees(event_attendees_value);
    set_location_id(result.data.location_id);
    set_is_public(result.data.is_public);
    set_event_recurring(result.data.event_recurring);
    set_event_frequency(getFrequencyString(result.data.event_frequency));
    set_event_repeat_on(JSON.parse(result.data.event_repeat_on));
    set_event_frequency_val(result.data.event_frequency_val);
    set_event_repeat_indefinitely(result.data.event_repeat_indefinitely);
    set_event_repeat_until(result.data.event_repeat_until);
    set_require_makeup_credits(result.data.require_makeup_credits);
    set_event_public_desc(result.data.event_public_desc);
    set_pubdesc_on_calendar(result.data.pubdesc_on_calendar);
    set_event_private_desc(result.data.event_private_desc);
    set_allow_registration(result.data.allow_registration);
    set_registration_max(result.data.registration_max);
    set_student_pricing(result.data.student_pricing);
    set_student_pricing_val(result.data.student_pricing_val);
    set_event_all_day(result.data.event_all_day);
    set_eventcat_id(result.data.eventcat_id);
    set_event_subtutor(result.data.event_subtutor);
    set_event_name(result.data.event_name);
    set_event_tutor(result.data.event_tutor);
    set_start_date(result.data.start_date);
    set_start_time(result.data.start_time);
    set_end_date(formatDate(result.data.end_date));
    set_end_time(result.data.end_time);
    set_eventtype_id(result.data.eventtype_id);
    setDuration(result.data.event_duration);
    setShowSubstituteTutor(result.data.event_subtutor !== null ? true : false);
    set_update_all(false);
    setIsEditForm(true);
    if (result.data.eventtype_id == 1) {
      openModal("quickAddLesson");
    } else if (result.data.eventtype_id == 2) {
      openModal("newEvent");
    } else if (result.data.eventtype_id == 3) {
      openModal("newNonTutoringEvent");
    }
  };

  const takeAttendanceHandler = async (id) => {
    navigate("/calendar/attendance/" + id);
  };

  const createCloneHandler = async (id) => {
    resetForm();
    const result = await getEventDetailsById(id);
    set_start_date(formatDate(result.data.start_date));
    set_start_time(result.data.start_time);
    set_end_date(formatDate(result.data.end_date));
    set_end_time(result.data.end_time);
    set_event_name(result.data.event_name);
    openModal("cloneEvent");
    console.log("CLONE=>", result?.data);
  };

  const deleteEventsHandler = async (e, delete_all_status) => {
    e.preventDefault();
    const data = {
      email_students: email_students,
      email_parents: email_parents,
      email_tutors: email_tutors,
      sms_students: sms_students,
      sms_parents: sms_parents,
      sms_tutors: sms_tutors,
      notes: notes,
      delete_all: delete_all_status,
    };
    const response = await deleteEvents(data, selectedEventId);
    if (response.success) {
      toast.success(response.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      fetchEventsForVisibleRange(visibleRange);
      setIsOpen(false);
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

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
      fetchData(token);
      fetchStudentData();
      fetchStudentGroupData();
      getTutor();
      fetchEventsForVisibleRange(visibleRange);
  }, []);

  useEffect(() => {
    studentGroupData != false &&  setVal(true);
  }, [studentGroupData]);

  const groupStudents = val ? studentGroupData : [];

  const handleGroupChange = (id, students) => {

    setSelectedGroups(prev =>
      prev.includes(id)
        ? prev.filter(groupId => groupId !== id)
        : [...prev, id]
    );

    // Prepare the new students and attendees to add
    const newAttendeesList = students.filter(
      student => !event_attendees.some(existingStudent => existingStudent.value === student.id)
    ).map(student => ({
      value: student.id,
      label: student.name
    }));

    // Update eventAttendees
    set_event_attendees(prevEventAttendees => [
      ...prevEventAttendees,
      ...newAttendeesList
    ]);  
    console.log('event_attendees_value :',newAttendeesList);

  };

  // Handler to remove a selected student
  const handleRemoveStudent = (id) => {
    const updatedSelectedStudents = selectedStudents.filter(student => student !== id);
    const updatedSelectedTextStudents = selectedStudentNames.filter(student => student.id !== id);
    setSelectedStudents(updatedSelectedStudents);
    setSelectedStudentNames(updatedSelectedTextStudents);
  };

  const getStudentsByTutorIdHandler = async (id) => {
    set_event_tutor(id);
    const result = await getStudentsByTutorId(id);
    const studentss =
      result?.data?.map((e) => {
        return { value: e.student.id, label: e.student.name };
      }) || [];
    setStudentsList(studentss);
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

  let eventArr = [];
  if (allEvents) {
    allEvents?.forEach((element) => {
      let myObject = {
        id: element?.id,
        attendees_info: element?.attendees_info,
        title: element?.event_name,
        start: new Date(element?.start_date),
        end: new Date(element?.end_date),
        start_time: element?.start_time,
        end_time: element?.end_time,
        desc: element?.event?.event_public_desc || "",
      };

      eventArr.push(myObject);
    });
  }

  function openModal(e) {
    setIsOpen(e);
    setErrors({}); // Clear errors when opening the modal
    setIsOpenErrors(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal(e) {
    setIsOpen(e);
    setErrors({}); // Clear errors when closing the modal
    setIsOpenErrors(false);
  }

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

    if (name === "tutor") {
      setSelectedTutor(e.target.value);
      // Filter out the selected tutor from the list of all tutors
    }

    if (name === "every" && eventRepeats === true) {
      const parsedValue = parseInt(value); // Ensure the value is parsed as an integer
      setEveryWeeks(parsedValue); // Update everyWeeks state
      setAddEvent((prev) => ({ ...prev, [name]: parsedValue })); // Update addEvent state
    } else {
      setAddEvent({ ...addEvent, [name]: value });
    }
  };

  const filteredTutors = allTutors.filter(
    (tutor) => tutor.id !== parseInt(selectedTutor)
  );

  const saveEvent = async (e, update_all_status) => {
    e.preventDefault();
    const formData = {
      event_all_day: event_all_day ? 1 : 0,
      eventtype_id: eventtype_id,
      eventcat_id: eventcat_id,
      event_subtutor: event_subtutor,
      event_name: event_name,
      event_tutor: event_tutor,
      start_date: start_date,
      start_time: start_time,
      end_date: end_date,
      end_time: end_time,
      event_attendees: JSON.stringify(
        event_attendees.map((e) => e.value) || []
      ),
      location_id: location_id,
      is_public: is_public,
      event_recurring: event_recurring ? 1 : 0,
      event_frequency: getFrequency(event_frequency),
      event_repeat_on: JSON.stringify(
        event_repeat_on
          ?.filter((f) => f.isActive == true)
          ?.map((e) => e.label) || []
      ),
      event_frequency_val: event_frequency_val,
      event_repeat_indefinitely: event_repeat_indefinitely ? 1 : 0,
      event_repeat_until: event_repeat_until,
      require_makeup_credits: require_makeup_credits,
      event_public_desc: event_public_desc,
      pubdesc_on_calendar: pubdesc_on_calendar ? 1 : 0,
      event_private_desc: event_private_desc,
      allow_registration: allow_registration ? 1 : 0,
      registration_max: registration_max,
      student_pricing: student_pricing,
      student_pricing_val: student_pricing_val,
      update_all: update_all_status,
    };
    console.log("update_all=>", update_all_status);
    console.log("Test=>", formData);
    setErrors({})
    // return ;
    let response
    if (isEditForm) {
      // Edit Form
      response = await updateEvents(formData, selectedEventId);
      console.log("Response=>", response);
      if (response.success) {
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchEventsForVisibleRange(visibleRange);
        setIsOpen(false);
      } else {
        setErrors(response?.response.data.data || {});
      }
    } else {
      // Add Form
      response = await createEvents(formData);
      console.log("Response----------------------=>", response);
      if (response.success) {
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchEventsForVisibleRange(visibleRange);
        setIsOpen(false);
      } else {
        setErrors(response?.response.data.data || {});
      }
    }
  };

  const saveAllEvents = async (e) => {
    saveEvent(e, true);
  };

  const saveOneEvents = async (e) => {
    saveEvent(e, false);
  };

  const cloneEventsHandler = async (e) => {
    e.preventDefault();
    const data = {
      start_date: start_date,
      start_time: start_time,
      end_date: end_date,
      end_time: end_time,
      id: selectedEventId,
    };
    const response = await cloneEvents(data);
    if (response.success) {
      toast.success(response.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      fetchEventsForVisibleRange(visibleRange);
      setIsOpen(false);
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleSelectedEvent = (e) => {
    setSelectedEventId(e.id);
    openModal("event");
    set_attendees_info(e.attendees_info);
    let [hours, minutes] = e.start_time.split(":");
    let newTimeString = `${hours}:${minutes}`;
    let [endhours, endminutes] = e.end_time.split(":");
    let endTimeString = `${endhours}:${endminutes}`;
    // Convert start and end dates to string format
    const startDateString = formatDate(e.start);
    const endDateString = e.end.toLocaleString();
    set_start_date(formatDate(e.start));
    set_end_date(formatDate(e.end));
    setEventStartTime(newTimeString);
    setEventEndTime(endTimeString);
    setEventDesc({ ...e, start: startDateString, end: endDateString });
  };

  const openNewAppointmentModal = (e) => {
    // Convert start and end dates to string format
    set_start_date(formatDate(e.start));
    set_end_date(formatDate(e.start));
    openModal("addEvent");
  };
  const openQuickAddLessonModal = (e) => {
    resetForm();
    set_eventtype_id(1);
    setIsEditForm(false);
    openModal("quickAddLesson");
  };
  useEffect(() => {
    fetchLocation();
    getCategoriesHandler();
  }, [userId]);

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
    resetForm();
    set_eventtype_id(2);
    setIsEditForm(false);
    openModal("newEvent");
  };
  const openNewNonTutoringEventModal = (e) => {
    resetForm();
    set_eventtype_id(3);
    setIsEditForm(false);
    openModal("newNonTutoringEvent");
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

      <div className="main">
        <TopBar />
        <ReactModal
          bodyOpenClassName="react-modal"
          isOpen={modalIsOpen === "event"}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="calendar-modal">
            <div className="close-h">
              <div className="popup-icons">
                <i
                  onClick={() => getEventDetailsByIdHandler(selectedEventId)}
                  class="fa fa-pencil"
                  aria-hidden="true"
                ></i>
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <i class="fa fa-commenting" aria-hidden="true"></i>
                <i
                  onClick={() => createCloneHandler(selectedEventId)}
                  class="fa fa-clone"
                  aria-hidden="true"
                ></i>
                <i
                  onClick={() => {
                    resetDeleteForm();
                    openModal("deleteEvent");
                  }}
                  class="fa fa-trash"
                  aria-hidden="true"
                ></i>
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label> {attendees_info.length || 0} Attendees</label>
                {attendees_info?.map((e) => {
                  return (
                    <p>
                      {e.attendance_status == 1 && "(U)"}
                      {e.attendance_status == 2 && "(P)"}
                      {e.attendance_status == 3 && "(A)"}
                      {e.attendance_status == 4 && "(TC)"}
                      {e.attendance_taken && e.attendance_status == 2 && (
                        <i
                          class="fa fa-check-circle"
                          style={{ color: "green" }}
                          aria-hidden="true"
                        ></i>
                      )}
                      {e.attendance_taken && e.attendance_status != 2 && (
                        <i
                          class="fa fa-times-circle"
                          style={{ color: "red" }}
                          aria-hidden="true"
                        ></i>
                      )}
                      {e.name}
                    </p>
                  );
                })}
              </div>
              <button
                onClick={() => takeAttendanceHandler(selectedEventId)}
                className="cancel"
              >
                <i class="fa fa-pencil" aria-hidden="true"></i>
                Edit Attendance
              </button>
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
                <strong>
                  {isEditForm ? "Edit Calendar Event" : "Quick Add Lesson"}
                </strong>
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
                            value={event_name}
                            onChange={(e) => set_event_name(e.target.value)}
                          />
                          {errors.event_name && <small style={{ color: "red" }}>{errors.event_name[0]}</small>}
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
                            onChange={(e) =>
                              getStudentsByTutorIdHandler(e.target.value)
                            }
                            value={event_tutor}
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
                          <Select
                            defaultValue={event_attendees_value}
                            onChange={(e) => set_event_attendees(e)}
                            isMulti={true}
                            options={studentsList}
                            styles={colourStyles}
                          />
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
                        <select
                          onChange={(e) => set_location_id(e.target.value)}
                          value={location_id}
                          className="form-control"
                          name="location"
                        >
                          <option value={""}>Choose</option>
                          {allLocation.map((e) => {
                            return (
                              <option value={e.id}>{e.eventloc_name}</option>
                            );
                          })}
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
                          value={formatDate(start_date)}
                          onChange={(e) => set_start_date(e.target.value)}
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
                            value={formatDate(end_date)}
                            onChange={(e) => set_end_date(e.target.value)}
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
                          value={start_time}
                          onChange={(e) => set_start_time(e.target.value)}
                        />
                        {errors.start_time && <small style={{ color: "red" }}>{errors.start_time[0]}</small>}
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
                          value={end_time}
                          onChange={(e) => set_end_time(e.target.value)}
                        />
                        {errors.end_time && <small style={{ color: "red" }}>{errors.end_time[0]}</small>}
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
                            value={event_recurring}
                            checked={event_recurring}
                            onChange={(e) =>
                              set_event_recurring(e.target.checked)
                            }
                          />
                          This event repeats
                        </div>
                      </div>
                    </div>
                    {event_recurring && (
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
                                  onChange={(e) =>
                                    set_event_frequency(e.target.value)
                                  }
                                  checked={event_frequency === "Daily"}
                                ></input>
                                Daily
                                <input
                                  type="radio"
                                  value="Weekly"
                                  name="frequency"
                                  onChange={(e) =>
                                    set_event_frequency(e.target.value)
                                  }
                                  checked={event_frequency === "Weekly"}
                                ></input>
                                Weekly
                                <input
                                  type="radio"
                                  value="Monthly"
                                  name="frequency"
                                  onChange={(e) =>
                                    set_event_frequency(e.target.value)
                                  }
                                  checked={event_frequency === "Monthly"}
                                ></input>
                                Monthly
                                <input
                                  type="radio"
                                  value="Yearly"
                                  name="frequency"
                                  onChange={(e) =>
                                    set_event_frequency(e.target.value)
                                  }
                                  checked={event_frequency === "Yearly"}
                                ></input>
                                Yearly
                              </div>
                              {event_frequency == "Daily" && (
                                <DayTabInput
                                  values={event_repeat_on}
                                  setDaysValue={set_event_repeat_on}
                                />
                              )}
                            </div>
                          </div>
                          {event_frequency != "Daily" && (
                            <div className="formbold-input-flex align-items-end">
                              <div>
                                <label
                                  htmlFor="time"
                                  className="formbold-form-label"
                                >
                                  Every
                                </label>
                                <br></br>
                                <div style={{ position: "relative" }}>
                                  <input
                                    type="text"
                                    name="every"
                                    className="form-control"
                                    style={{
                                      paddingLeft: "25px",
                                      paddingRight: "70px",
                                    }}
                                    value={event_frequency_val}
                                    min={1}
                                    max={100}
                                    onChange={(e) =>
                                      set_event_frequency_val(e.target.value)
                                    }
                                  />
                                  <span
                                    style={{
                                      position: "absolute",
                                      right: "10px",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                    }}
                                  >
                                    {event_frequency === "Daily" ||
                                    event_frequency === "Weekly"
                                      ? "Weeks"
                                      : event_frequency}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                          {!event_repeat_indefinitely && (
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
                                value={event_repeat_until}
                                onChange={(e) =>
                                  set_event_repeat_until(
                                    formatDate(e.target.value)
                                  )
                                }
                              />{" "}
                            </div>
                          )}

                          <div className="formbold-input-flex">
                            <div>
                              <div
                                className="preference"
                                style={{ fontSize: "15px" }}
                              >
                                <input
                                  type="checkbox"
                                  name="repeats_indefinitely"
                                  value=""
                                  onChange={(e) =>
                                    set_event_repeat_indefinitely(
                                      e.target.checked
                                    )
                                  }
                                  checked={event_repeat_indefinitely}
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
                            value="1"
                            name="quick_add_visibility"
                            onChange={(e) => set_is_public(e.target.value)}
                            checked={is_public == "1" ? true : false}
                          ></input>
                          Public - Visible on the Student Portal calendar to all
                          students
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="0"
                            name="quick_add_visibility"
                            checked={is_public == "0" ? true : false}
                            onChange={(e) => set_is_public(e.target.value)}
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
                            value={require_makeup_credits}
                            checked={require_makeup_credits}
                            onChange={(e) =>
                              set_require_makeup_credits(e.target.checked)
                            }
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
                    {isEditForm && event_recurring && (
                      <button
                        className="cancel"
                        onClick={(e) => saveAllEvents(e)}
                      >
                        Save This & Future Events
                      </button>
                    )}
                    <button
                      className="formbold-btn"
                      onClick={(e) => saveOneEvents(e)}
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
          isOpen={modalIsOpen === "newEvent"}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={quickAddLessonStyles}
          contentLabel="Example Modal"
        >
          <div className="calendar-modal">
            <div className="close-h add">
              <h4>
                <strong>
                  {isEditForm ? "Edit Calendar Event" : "New Calendar Event"}
                </strong>
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
                            value={event_name}
                            onChange={(e) => set_event_name(e.target.value)}
                          />
                          {errors.event_name && <small style={{ color: "red" }}>{errors.event_name[0]}</small>}
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
                            onChange={(e) =>
                              getStudentsByTutorIdHandler(e.target.value)
                            }
                            value={event_tutor}
                          >
                            <option>Select Tutor</option>

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
                            onChange={(e) =>
                              setShowSubstituteTutor(e.target.checked)
                            }
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
                              onChange={(e) =>
                                set_event_subtutor(e.target.value)
                              }
                              value={event_subtutor}
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
                            name="quick_add_visibility"
                            value={"1"}
                            onChange={(e) => set_is_public(e.target.value)}
                            checked={is_public == "1" ? true : false}
                          ></input>
                          Public - Visible on the Student Portal calendar to all
                          students
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="0"
                            name="quick_add_visibility"
                            checked={is_public == "0" ? true : false}
                            onChange={(e) => set_is_public(e.target.value)}
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
                        checked={require_makeup_credits}
                        onChange={(e) =>
                          set_require_makeup_credits(e.target.checked)
                        }
                      />
                      This event requires a make-up credit
                    </div>
                    <div class="input-check">
                      <input
                        type="checkbox"
                        name="student_register_lesson"
                        checked={allow_registration}
                        onChange={(e) =>
                          set_allow_registration(e.target.checked)
                        }
                      />
                      Allow students to register through the Student Portal
                    </div>
                    <hr></hr>
                    <div className="formbold-input-flex diff">
                      <div style={{ position: 'relative' }}>
                        <label htmlFor="attendees" className="formbold-form-label">
                          Attendees
                        </label>
                        <div>
                          <Select
                            defaultValue={event_attendees_value}
                            value={event_attendees}
                            onChange={(e) => set_event_attendees(e)}
                            isMulti={true}
                            options={studentsList}
                            styles={colourStyles}
                          />
                        </div>
                        <div className="mt-2">
                            <label>Selected Students:</label>
                              <ul className="selected-students-list">
                                {selectedStudentNames.map((selected) => (
                                  <li key={selected.id} className="selected-student-tag">
                                    {selected.value}
                                    <button 
                                      className="remove-button" 
                                      onClick={() => handleRemoveStudent(selected.id)}
                                    >
                                      &times;
                                    </button>
                                  </li>
                                ))}
                              </ul>
                        </div>
                        <div className="rightDropdown">
                          <div className="dropdown">
                            <button className="dropbtn" type="button">
                              Groups <i className="fas fa-chevron-down"></i>
                            </button>
                            <div className="dropdown-content">
                              { groupStudents.map(item=> (
                                    <label
                                    key={item.id}
                                    value={item.name}
                                    onClick={() => handleGroupChange(item.id, item.students)}
                                    className={selectedGroups.includes(item.id) ? 'selected' : ''}
                                  >
                                    {item.name}
                                  </label>
                              ))}
                            </div>
                          </div>
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
                          value={eventcat_id}
                          onChange={(e) => set_eventcat_id(e.target.value)}
                          id="category"
                        >
                          <option value={""}>Choose</option>
                          {categoriesList?.map((e) => {
                            return (
                              <option value={e?.id}>{e?.eventcat_name}</option>
                            );
                          })}
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
                          value={location_id}
                          onChange={(e) => set_location_id(e.target.value)}
                        >
                          <option value={""}>Choose</option>
                          {allLocation?.map((e) => {
                            return (
                              <option value={e?.id}>{e?.eventloc_name}</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="formbold-input-flex">
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
                            value={formatDate(start_date)}
                            onChange={(e) =>
                              set_start_date(formatDate(e.target.value))
                            }
                          />
                        </div>
                      </div>
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
                          value={start_time}
                          onChange={(e) => set_start_time(e.target.value)}
                          required
                        />
                        {errors.start_time && <small style={{ color: "red" }}>{errors.start_time[0]}</small>}
                      </div>
                    </div>
                    <div className="formbold-input-flex">
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
                            value={duration}
                            onChange={(e) => {
                              calculateEndDateTimeByDuration(
                                e.target.value != "" ? e.target.value : 0
                              );
                              setDuration(e.target.value);
                            }}
                            
                          />
                          {errors.end_time && <small style={{ color: "red" }}>{errors.end_time[0]}</small>}
                      </div>
                      <div>
                        <div
                          className="preference"
                          style={{ fontSize: "15px" }}
                        >
                          <input
                            type="checkbox"
                            name="all_day"
                            value="All day"
                            checked={event_all_day}
                            onChange={(e) =>
                              set_event_all_day(e.target.checked)
                            }
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
                            checked={event_recurring}
                            onChange={(e) =>
                              set_event_recurring(e.target.checked)
                            }
                          />
                          This event repeats
                        </div>
                      </div>
                    </div>
                    {event_recurring && (
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
                                  onChange={(e) =>
                                    set_event_frequency(e.target.value)
                                  }
                                  checked={event_frequency === "Daily"}
                                ></input>
                                Daily
                                <input
                                  type="radio"
                                  value="Weekly"
                                  name="frequency"
                                  onChange={(e) =>
                                    set_event_frequency(e.target.value)
                                  }
                                  checked={event_frequency === "Weekly"}
                                ></input>
                                Weekly
                                <input
                                  type="radio"
                                  value="Monthly"
                                  name="frequency"
                                  onChange={(e) =>
                                    set_event_frequency(e.target.value)
                                  }
                                  checked={event_frequency === "Monthly"}
                                ></input>
                                Monthly
                                <input
                                  type="radio"
                                  value="Yearly"
                                  name="frequency"
                                  onChange={(e) =>
                                    set_event_frequency(e.target.value)
                                  }
                                  checked={event_frequency === "Yearly"}
                                ></input>
                                Yearly
                              </div>
                              {event_frequency == "Daily" && (
                                <DayTabInput
                                  values={event_repeat_on}
                                  setDaysValue={set_event_repeat_on}
                                />
                              )}
                            </div>
                          </div>
                          {event_frequency != "Daily" && (
                            <div className="formbold-input-flex align-items-end">
                              <div>
                                <label
                                  htmlFor="time"
                                  className="formbold-form-label"
                                >
                                  Every
                                </label>
                                <br></br>
                                <div style={{ position: "relative" }}>
                                  <input
                                    type="text"
                                    name="every"
                                    className="form-control"
                                    style={{
                                      paddingLeft: "25px",
                                      paddingRight: "70px",
                                    }}
                                    value={event_frequency_val}
                                    min={1}
                                    max={100}
                                    onChange={(e) =>
                                      set_event_frequency_val(e.target.value)
                                    }
                                  />
                                  <span
                                    style={{
                                      position: "absolute",
                                      right: "10px",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                    }}
                                  >
                                    {event_frequency === "Daily" ||
                                    event_frequency === "Weekly"
                                      ? "Weeks"
                                      : event_frequency}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                          {!event_repeat_indefinitely && (
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
                                value={event_repeat_until}
                                onChange={(e) =>
                                  set_event_repeat_until(
                                    formatDate(e.target.value)
                                  )
                                }
                              />{" "}
                            </div>
                          )}

                          <div className="formbold-input-flex">
                            <div>
                              <div
                                className="preference"
                                style={{ fontSize: "15px" }}
                              >
                                <input
                                  type="checkbox"
                                  name="repeats_indefinitely"
                                  value=""
                                  onChange={(e) =>
                                    set_event_repeat_indefinitely(
                                      e.target.checked
                                    )
                                  }
                                  checked={event_repeat_indefinitely}
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
                            value="default"
                            name="student_pricing"
                            checked={
                              student_pricing == "default" ? true : false
                            }
                            onChange={(e) =>
                              set_student_pricing(e.target.value)
                            }
                          ></input>
                          Student Default
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="no_charge"
                            name="student_pricing"
                            checked={
                              student_pricing == "no_charge" ? true : false
                            }
                            onChange={(e) =>
                              set_student_pricing(e.target.value)
                            }
                          ></input>
                          No charge (₹ 0.00)
                        </div>
                        <div className="input-radio">
                          <input
                            type="radio"
                            value="specific"
                            name="student_pricing"
                            checked={
                              student_pricing == "specific" ? true : false
                            }
                            onChange={(e) =>
                              set_student_pricing(e.target.value)
                            }
                          ></input>
                          Specify price per student
                        </div>
                      </div>
                    </div>
                    {student_pricing == "specific" && (
                      <div className="formbold-input-flex diff">
                        <div>
                          <div>
                            <label
                              htmlFor="student_pricing"
                              className="formbold-form-label"
                            >
                              Pricing
                            </label>
                          </div>
                          <div className="input-radio">
                            <input
                              type="text"
                              className="form-control"
                              value={student_pricing_val}
                              name="student_pricing_val"
                              onChange={(e) =>
                                set_student_pricing_val(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}

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
                          value={event_public_desc}
                          onChange={(e) =>
                            set_event_public_desc(e.target.value)
                          }
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
                          value={event_private_desc}
                          onChange={(e) =>
                            set_event_private_desc(e.target.value)
                          }
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
                    {isEditForm && event_recurring && (
                      <button
                        className="cancel"
                        onClick={(e) => saveAllEvents(e)}
                      >
                        Save This & Future Events
                      </button>
                    )}
                    <button
                      className="formbold-btn"
                      onClick={(e) => saveOneEvents(e)}
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
                <strong>
                  {isEditForm
                    ? "Edit Calendar Event"
                    : "New Non-Tutoring Event"}
                </strong>
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
                            value={event_name}
                            onChange={(e) => set_event_name(e.target.value)}
                          />
                          {errors.event_name && <small style={{ color: "red" }}>{errors.event_name[0]}</small>}
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
                            value={event_tutor}
                            onChange={(e) => set_event_tutor(e.target.value)}
                            id="tutor"
                          >
                            <option value="">Choose</option>
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
                          value={eventcat_id}
                          onChange={(e) => set_eventcat_id(e.target.value)}
                          id="category"
                        >
                          <option value={""}>Choose</option>
                          {categoriesList?.map((e) => {
                            return (
                              <option value={e?.id}>{e?.eventcat_name}</option>
                            );
                          })}
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
                          value={location_id}
                          onChange={(e) => set_location_id(e.target.value)}
                        >
                          <option value={""}>Choose</option>
                          {allLocation?.map((e) => {
                            return (
                              <option value={e?.id}>{e?.eventloc_name}</option>
                            );
                          })}
                        </select>
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
                            value={formatDate(start_date)}
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
                          value={start_time}
                          onChange={(e) => set_start_time(e.target.value)}
                        />
                        {errors.start_time && <small style={{ color: "red" }}>{errors.start_time[0]}</small>}
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
                          value={duration}
                          onChange={(e) => {
                            setDuration(e.target.value);
                            calculateEndDateTimeByDuration(
                              e.target.value != "" ? e.target.value : 0
                            );
                          }}
                          disabled={disableTimeDuration}
                        />
                        {errors.end_time && <small style={{ color: "red" }}>{errors.end_time[0]}</small>}
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
                            checked={event_all_day}
                            onChange={(e) =>
                              set_event_all_day(e.target.checked)
                            }
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
                            checked={event_recurring}
                            onChange={(e) =>
                              set_event_recurring(e.target.checked)
                            }
                          />
                          This event repeats
                        </div>
                      </div>
                    </div>
                    {event_recurring && (
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
                                  onChange={(e) =>
                                    set_event_frequency(e.target.value)
                                  }
                                  checked={event_frequency === "Daily"}
                                ></input>
                                Daily
                                <input
                                  type="radio"
                                  value="Weekly"
                                  name="frequency"
                                  onChange={(e) =>
                                    set_event_frequency(e.target.value)
                                  }
                                  checked={event_frequency === "Weekly"}
                                ></input>
                                Weekly
                                <input
                                  type="radio"
                                  value="Monthly"
                                  name="frequency"
                                  onChange={(e) =>
                                    set_event_frequency(e.target.value)
                                  }
                                  checked={event_frequency === "Monthly"}
                                ></input>
                                Monthly
                                <input
                                  type="radio"
                                  value="Yearly"
                                  name="frequency"
                                  onChange={(e) =>
                                    set_event_frequency(e.target.value)
                                  }
                                  checked={event_frequency === "Yearly"}
                                ></input>
                                Yearly
                              </div>
                              {event_frequency == "Daily" && (
                                <DayTabInput
                                  values={event_repeat_on}
                                  setDaysValue={set_event_repeat_on}
                                />
                              )}
                            </div>
                          </div>
                          {event_frequency != "Daily" && (
                            <div className="formbold-input-flex align-items-end">
                              <div>
                                <label
                                  htmlFor="time"
                                  className="formbold-form-label"
                                >
                                  Every
                                </label>
                                <br></br>
                                <div style={{ position: "relative" }}>
                                  <input
                                    type="text"
                                    name="every"
                                    className="form-control"
                                    style={{
                                      paddingLeft: "25px",
                                      paddingRight: "70px",
                                    }}
                                    value={event_frequency_val}
                                    min={1}
                                    max={100}
                                    onChange={(e) =>
                                      set_event_frequency_val(e.target.value)
                                    }
                                  />
                                  <span
                                    style={{
                                      position: "absolute",
                                      right: "10px",
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                    }}
                                  >
                                    {event_frequency === "Daily" ||
                                    event_frequency === "Weekly"
                                      ? "Weeks"
                                      : event_frequency}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                          {!event_repeat_indefinitely && (
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
                                value={event_repeat_until}
                                onChange={(e) =>
                                  set_event_repeat_until(
                                    formatDate(e.target.value)
                                  )
                                }
                              />{" "}
                            </div>
                          )}

                          <div className="formbold-input-flex">
                            <div>
                              <div
                                className="preference"
                                style={{ fontSize: "15px" }}
                              >
                                <input
                                  type="checkbox"
                                  name="repeats_indefinitely"
                                  value=""
                                  onChange={(e) =>
                                    set_event_repeat_indefinitely(
                                      e.target.checked
                                    )
                                  }
                                  checked={event_repeat_indefinitely}
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

                        <textarea
                          name="public_desc"
                          value={event_public_desc}
                          onChange={(e) =>
                            set_event_public_desc(e.target.value)
                          }
                          className="form-control"
                        />
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
                            checked={pubdesc_on_calendar}
                            onChange={(e) =>
                              set_pubdesc_on_calendar(e.target.checked)
                            }
                          />{" "}
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
                    {isEditForm && event_recurring && (
                      <button
                        className="cancel"
                        onClick={(e) => saveAllEvents(e)}
                      >
                        Save This & Future Events
                      </button>
                    )}
                    <button
                      className="formbold-btn"
                      onClick={(e) => saveOneEvents(e)}
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
          isOpen={modalIsOpen === "deleteEvent"}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={quickAddLessonStyles}
          contentLabel="Example Modal"
        >
          <div className="calendar-modal">
            <div className="close-h add">
              <h4>
                <strong>Are You Sure To Delete ?</strong>
              </h4>
              <button className="closeModal" onClick={closeModal}>
                X
              </button>
            </div>
            <br></br>
            <form name="studentProfile">
              <div className="row d-flex">
                <hr></hr>
                <div className="formbold-input-flex diff">
                  <div>
                    <div
                      className="public_desc_on_calendar"
                      style={{ fontSize: "15px" }}
                    >
                      <input
                        type="checkbox"
                        name="email_students"
                        value="1"
                        checked={email_students}
                        onChange={(e) => set_email_students(e.target.checked)}
                      />{" "}
                      Email Students
                    </div>
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
                        name="email_parents"
                        value="1"
                        checked={email_parents}
                        onChange={(e) => set_email_parents(e.target.checked)}
                      />{" "}
                      Email Parents
                    </div>
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
                        name="email_tutors"
                        value="1"
                        checked={email_tutors}
                        onChange={(e) => set_email_tutors(e.target.checked)}
                      />{" "}
                      Email Tutors
                    </div>
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
                        name="sms_students"
                        value="1"
                        checked={sms_students}
                        onChange={(e) => set_sms_students(e.target.checked)}
                      />{" "}
                      SMS Students
                    </div>
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
                        name="sms_parents"
                        value="1"
                        checked={sms_parents}
                        onChange={(e) => set_sms_parents(e.target.checked)}
                      />{" "}
                      SMS Parents
                    </div>
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
                        name="sms_tutors"
                        value="1"
                        checked={sms_tutors}
                        onChange={(e) => set_sms_tutors(e.target.checked)}
                      />{" "}
                      SMS Tutors
                    </div>
                  </div>
                </div>
                <div className="formbold-input-flex diff">
                  <div>
                    <div
                      className="public_desc_on_calendar"
                      style={{ fontSize: "15px" }}
                    >
                      <label className="formbold-form-label">Notes</label>
                      <textarea
                        name="notes"
                        value={notes}
                        className="form-control"
                        onChange={(e) => set_notes(e.target.value)}
                      />{" "}
                    </div>
                  </div>
                </div>

                <div className="formbold-form-btn-wrapper">
                  <div className="btn-end">
                    <Link className="cancel" onClick={closeModal}>
                      Cancel
                    </Link>
                    <button
                      className="cancel"
                      style={{ color: "orange" }}
                      onClick={(e) => deleteEventsHandler(e, true)}
                    >
                      Delete This & Future Events
                    </button>
                    <button
                      className="formbold-btn"
                      onClick={(e) => deleteEventsHandler(e, false)}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ReactModal>

        <ReactModal
          isOpen={modalIsOpen === "cloneEvent"}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={quickAddLessonStyles}
          contentLabel="Example Modal"
        >
          <div className="calendar-modal">
            <div className="close-h add">
              <h4>
                <strong>Are You Sure To Clone ?</strong>
              </h4>
              <button className="closeModal" onClick={closeModal}>
                X
              </button>
            </div>
            <br></br>
            <form name="studentProfile">
              <div className="row d-flex">
                <hr></hr>
                <p>
                  <span className="formbold-form-label">Event Name : </span>
                  {event_name}
                </p>
                <div className="formbold-input-flex">
                  <div>
                    <label htmlFor="start_date" className="formbold-form-label">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      className="form-control"
                      value={formatDate(start_date)}
                      onChange={(e) => set_start_date(e.target.value)}
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
                        value={formatDate(end_date)}
                        onChange={(e) => set_end_date(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="formbold-input-flex">
                  <div>
                    <label htmlFor="start_time" className="formbold-form-label">
                      Start Time
                    </label>
                    <br></br>

                    <input
                      type="time"
                      name="start_time"
                      className="form-control"
                      value={start_time}
                      onChange={(e) => set_start_time(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="end_time" className="formbold-form-label">
                      End Time
                    </label>
                    <br></br>

                    <input
                      type="time"
                      name="end_time"
                      className="form-control"
                      value={end_time}
                      onChange={(e) => set_end_time(e.target.value)}
                    />
                  </div>
                </div>
                <div className="formbold-form-btn-wrapper">
                  <div className="btn-end">
                    <Link className="cancel" onClick={closeModal}>
                      Cancel
                    </Link>
                    <button
                      className="formbold-btn"
                      onClick={cloneEventsHandler}
                    >
                      Confirm
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
              <div className="col-xl-12 col-xxl-12">
                <div style={{ zIndex: "1" }}>
                  <div className="card flex-fill w-100">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-md-4">
                          <OptionBox
                            icon={settings}
                            options={[
                              {
                                label: "Categories & Locations",
                                route: "/calendar/categories",
                              },
                            ]}
                            label={"Options"}
                          />
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
