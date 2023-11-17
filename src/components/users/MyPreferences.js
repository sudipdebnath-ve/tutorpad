import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";

const MyPreferences = () => {
  const { userData, fetchData, sidebarToggle } = useUserDataContext();
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tutorPad"));
    if (!token) {
      navigate("/signin");
    } else {
      fetchData();
    }
  }, []);

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

        <main className="content">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-5 col-xxl-5">
                <div className="card">
                  <div className="card-body">
                    <div className="initials">
                      <div className="image-user">
                        <h2>SD</h2>
                      </div>
                    </div>
                    <div className="edit-user">
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
                      <Link to="#">Change Password</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-xxl-7">
                <div className="card">
                  <div className="card-body attendance">
                    <h3>Attendance Preferences</h3>
                    <div className="attendance-user">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </div>
                    <br></br>
                    <h5>
                      <strong>Overdue Attendance</strong>
                    </h5>
                    <div className="input-check">
                      <input type="checkbox"></input>
                      Show overdue attendance on homepage
                    </div>
                    <h5>
                      <strong>Default Notes View</strong>
                    </h5>
                    <div className="input-radio">
                      <input type="radio" value="Student" selected></input>
                      Student
                      <input type="radio" value="Parent"></input>Parent
                      <input type="radio" value="Private"></input>Private
                    </div>
                    <h5>
                      <strong>Lesson Notes</strong>
                    </h5>
                    <div className="input-check">
                      <input type="checkbox"></input>
                      Automatically copy lesson notes when I take attendance
                    </div>
                    <div className="input-radio">
                      <input
                        type="radio"
                        value="Copy from most
                      recent event"
                      ></input>
                      Copy from most recent event
                      <input
                        type="radio"
                        value="Copy from same
                      category only"
                      ></input>
                      Copy from same category only
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex">
              <div className="col-xl-5 col-xxl-5">
                <div className="card">
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
                </div>
              </div>
              <div className="col-xl-7 col-xxl-7">
                <div className="card">
                  <div className="card-body email-notification">
                    <h3>Email Notification Preferences</h3>
                    <div className="attendance-user">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </div>
                    <small className="small">
                      Select what you'd like to be notified about via email and
                      how often
                    </small>
                    <div className="input-check">
                      <input type="checkbox"></input>
                      When any student registers for a lesson/event through the
                      Student Portal
                    </div>
                    <div className="input-check">
                      <input type="checkbox"></input>
                      When any student cancels a lesson/event through the
                      Student Portal
                    </div>
                    <div className="input-check">
                      <input type="checkbox"></input>
                      When any parent or student completes the sign-up form
                    </div>
                    <div className="input-check">
                      <input type="checkbox"></input>
                      When any parent or student disables email reminders
                    </div>
                    <div className="input-check">
                      <input type="checkbox"></input>
                      Allow students to email me from the Study Log
                    </div>
                    <div className="email-pad-top">
                      <h5>
                        <strong>Email Daily Agenda</strong>
                      </h5>
                      <div className="input-radio">
                        <input type="radio" value="Day Before"></input>
                        Day Before
                        <br />
                        Between 16:00 and 23:00
                        <input type="radio" value="Same Day"></input>
                        Same Day
                        <br />
                        Between 0:00 and 15:00
                        <input type="radio" value="Don't Email"></input>
                        Don't Email
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
