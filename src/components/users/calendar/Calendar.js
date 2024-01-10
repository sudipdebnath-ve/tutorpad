import React, { useState } from "react";
import MiniSidebar from "../../sidebar/MiniSidebar.js";
import Sidebar from "../../sidebar/Sidebar.js";
import TopBar from "../../sidebar/TopBar.js";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReactModal from "react-modal";

const Calendars = () => {
  const { sidebarToggle } = useUserDataContext();
  const [modalIsOpen, setIsOpen] = useState(false);

  const localizer = momentLocalizer(moment);

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
  };
  const openNewAppointmentModal = (e) => {
    alert(e);
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
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                    <i class="fa fa-commenting" aria-hidden="true"></i>
                    <i class="fa fa-clone" aria-hidden="true"></i>
                    <i class="fa fa-trash" aria-hidden="true"></i>
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
