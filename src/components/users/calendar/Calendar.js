import React from "react";
import MiniSidebar from "../../sidebar/MiniSidebar.js";
import Sidebar from "../../sidebar/Sidebar.js";
import TopBar from "../../sidebar/TopBar.js";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const Calendars = () => {
  const { sidebarToggle } = useUserDataContext();
  const localizer = momentLocalizer(moment);

  const events = [
    {
      title: "DTS STARTS",
      start: new Date(2023, 11, 13, 0, 0, 0),
      end: new Date(2023, 11, 20, 0, 0, 0),
    },

    {
      title: "DTS ENDS",
      start: new Date(2023, 11, 6, 0, 0, 0),
      end: new Date(2023, 11, 13, 0, 0, 0),
    },

    {
      title: "Some Event",
      start: new Date(2023, 11, 9, 0, 0, 0),
      end: new Date(2023, 11, 9, 0, 0, 0),
    },
    {
      title: "Conference",
      start: new Date(2023, 11, 11),
      end: new Date(2023, 11, 13),
      desc: "Big conference for important people",
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
        <main className="content student">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
                <div>
                  <Calendar
                    localizer={localizer}
                    events={events}
                    style={{ height: 500 }}
                    step={60}
                    popup={true}
                    onShowMore={(events, date) =>
                      this.setState({ showModal: true, events })
                    }
                    onSelectSlot={(slotInfo) => {
                      console.log(slotInfo);
                    }}
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
