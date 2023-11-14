import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import avatar from "./assets/avatars/avatar.jpg";

const MyPreferences = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [profileToggle, setProfileToggle] = useState(false);
  const [notificationToggle, setNotificationToggle] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const handleSidebarToggle = () => {
    if (sidebarToggle === true) {
      setSidebarToggle(false);
    } else {
      setSidebarToggle(true);
    }
  };

  const handleProfileToggle = () => {
    if (profileToggle === true) {
      setProfileToggle(false);
    } else {
      setProfileToggle(true);
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tutorPad"));
    if (!token) {
      navigate("/signin");
    }
  });

  return (
    <div className="wrapper">
      {sidebarToggle ? (
        <>
          <nav id="sidebar" className="minisidebar js-sidebar">
            <div className="sidebar-content js-simplebar">
              <Link className="sidebar-brand" to="/dashboard"></Link>
              <ul className="sidebar-nav">
                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "dashboard" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="/dashboard">
                    <i className="fa fa-home" aria-hidden="true"></i>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "students" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="/dashboard">
                    <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "calendar" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "lending-library" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-book" aria-hidden="true"></i>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "online-resources" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-cloud-download" aria-hidden="true"></i>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "familiies-and-invoices"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-credit-card-alt" aria-hidden="true"></i>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "expenses-and-other-revenues"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-calculator" aria-hidden="true"></i>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "mileage" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-bar-chart" aria-hidden="true"></i>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "website" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-window-restore" aria-hidden="true"></i>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "news-blog-posts" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-bullhorn" aria-hidden="true"></i>
                  </Link>
                </li>
                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "bussiness-reports" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-file-text" aria-hidden="true"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav id="sidebar" className="sidebar js-sidebar">
            <div className="sidebar-content js-simplebar">
              <Link className="sidebar-brand" to="/dashboard">
                <span className="align-middle">TutorPad</span>
              </Link>
              <ul className="sidebar-nav">
                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "dashboard" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="/dashboard">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    <span className="align-middle">Dashboard</span>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "students" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="/dashboard">
                    <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                    <span className="align-middle">Students</span>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "calendar" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                    <span className="align-middle">Calendar</span>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "lending-library" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-book" aria-hidden="true"></i>
                    <span className="align-middle">Lending Library</span>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "online-resources" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-cloud-download" aria-hidden="true"></i>
                    <span className="align-middle">Online Resources</span>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "familiies-and-invoices"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-credit-card-alt" aria-hidden="true"></i>
                    <span className="align-middle">Families & Invoices</span>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "expenses-and-other-revenues"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-calculator" aria-hidden="true"></i>
                    <span className="align-middle">
                      Expenses & other Revenues
                    </span>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "mileage" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-bar-chart" aria-hidden="true"></i>
                    <span className="align-middle">Mileage</span>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "website" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-window-restore" aria-hidden="true"></i>
                    <span className="align-middle">Website</span>
                  </Link>
                </li>

                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "news-blog-posts" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-bullhorn" aria-hidden="true"></i>
                    <span className="align-middle">News & Blog Posts</span>
                  </Link>
                </li>
                <li
                  className={`sidebar-item ${
                    splitLocation[1] === "bussiness-reports" ? "active" : ""
                  }`}
                >
                  <Link className="sidebar-link" to="#">
                    <i className="fa fa-file-text" aria-hidden="true"></i>
                    <span className="align-middle">Bussiness Reports</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </>
      )}

      <div className="main bg-color">
        <nav className="navbar navbar-expand navbar-light navbar-bg">
          <Link className="sidebar-toggle" onClick={handleSidebarToggle}>
            <i className="hamburger align-self-center"></i>
          </Link>
          <h2 style={{ margin: "0" }}>My Preferences</h2>
          <div className="navbar-collapse collapse">
            <ul className="navbar-nav navbar-align">
              <li className="nav-item dropdown">
                <Link
                  className="nav-icon dropdown-toggle"
                  to="#"
                  id="alertsDropdown"
                  data-bs-toggle="dropdown"
                  onClick={() => setNotificationToggle(!notificationToggle)}
                >
                  <div className="position-relative">
                    <i className="fa fa-bell" aria-hidden="true"></i>
                    <span className="indicator">0</span>
                  </div>
                </Link>
                {notificationToggle && (
                  <>
                    <div
                      className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0 show"
                      aria-labelledby="alertsDropdown"
                    >
                      <div className="dropdown-menu-header">
                        0 New Notifications
                      </div>
                      <div className="list-group">
                        <Link to="#" className="list-group-item">
                          <div className="row g-0 align-items-center">
                            <div className="col-2">
                              <i
                                className="text-warning"
                                data-feather="bell"
                              ></i>
                            </div>
                            <div className="col-10">
                              <div className="text-dark">Lorem ipsum</div>
                              <div className="text-muted small mt-1">
                                Aliquam ex eros, imperdiet vulputate hendrerit
                                et.
                              </div>
                              <div className="text-muted small mt-1">
                                2h ago
                              </div>
                            </div>
                          </div>
                        </Link>
                        <Link to="#" className="list-group-item">
                          <div className="row g-0 align-items-center">
                            <div className="col-2">
                              <i
                                className="text-success"
                                data-feather="user-plus"
                              ></i>
                            </div>
                            <div className="col-10">
                              <div className="text-dark">New connection</div>
                              <div className="text-muted small mt-1">
                                Christina accepted your request.
                              </div>
                              <div className="text-muted small mt-1">
                                14h ago
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="dropdown-menu-footer">
                        <Link to="#" className="text-muted">
                          Show all notifications
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-icon dropdown-toggle"
                  to="#"
                  id="messagesDropdown"
                  data-bs-toggle="dropdown"
                >
                  <div className="position-relative">
                    <i className="fa fa-question-circle" aria-hidden="true"></i>
                  </div>
                </Link>
                <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0"
                  aria-labelledby="messagesDropdown"
                >
                  <div className="dropdown-menu-header">
                    <div className="position-relative">4 New Messages</div>
                  </div>
                  <div className="list-group">
                    <Link to="#" className="list-group-item">
                      <div className="row g-0 align-items-center">
                        <div className="col-2">
                          <img
                            src={avatar}
                            className="avatar img-fluid rounded-circle"
                            alt="Vanessa Tucker"
                          />
                        </div>
                        <div className="col-10 ps-2">
                          <div className="text-dark">Vanessa Tucker</div>
                          <div className="text-muted small mt-1">
                            Nam pretium turpis et arcu. Duis arcu tortor.
                          </div>
                          <div className="text-muted small mt-1">15m ago</div>
                        </div>
                      </div>
                    </Link>
                    <Link to="#" className="list-group-item">
                      <div className="row g-0 align-items-center">
                        <div className="col-2">
                          <img
                            src="img/avatars/avatar-2.jpg"
                            className="avatar img-fluid rounded-circle"
                            alt="William Harris"
                          />
                        </div>
                        <div className="col-10 ps-2">
                          <div className="text-dark">William Harris</div>
                          <div className="text-muted small mt-1">
                            Curabitur ligula sapien euismod vitae.
                          </div>
                          <div className="text-muted small mt-1">2h ago</div>
                        </div>
                      </div>
                    </Link>
                    <Link to="#" className="list-group-item">
                      <div className="row g-0 align-items-center">
                        <div className="col-2">
                          <img
                            src="img/avatars/avatar-4.jpg"
                            className="avatar img-fluid rounded-circle"
                            alt="Christina Mason"
                          />
                        </div>
                        <div className="col-10 ps-2">
                          <div className="text-dark">Christina Mason</div>
                          <div className="text-muted small mt-1">
                            Pellentesque auctor neque nec urna.
                          </div>
                          <div className="text-muted small mt-1">4h ago</div>
                        </div>
                      </div>
                    </Link>
                    <Link to="#" className="list-group-item">
                      <div className="row g-0 align-items-center">
                        <div className="col-2">
                          <img
                            src="img/avatars/avatar-3.jpg"
                            className="avatar img-fluid rounded-circle"
                            alt="Sharon Lessman"
                          />
                        </div>
                        <div className="col-10 ps-2">
                          <div className="text-dark">Sharon Lessman</div>
                          <div className="text-muted small mt-1">
                            Aenean tellus metus, bibendum sed, posuere ac,
                            mattis non.
                          </div>
                          <div className="text-muted small mt-1">5h ago</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="dropdown-menu-footer">
                    <Link to="#" className="text-muted">
                      Show all messages
                    </Link>
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-icon dropdown-toggle d-inline-block d-sm-none"
                  to="#"
                  data-bs-toggle="dropdown"
                >
                  <i className="align-middle" data-feather="settings"></i>
                </Link>

                <Link
                  className="nav-link dropdown-toggle d-none d-sm-inline-block"
                  to="#"
                  data-bs-toggle="dropdown"
                  onClick={handleProfileToggle}
                >
                  <img
                    src={avatar}
                    className="avatar img-fluid rounded me-1"
                    alt="Charles Hall"
                  />{" "}
                  <span className="text-dark">Sudip</span>
                </Link>
                {profileToggle && (
                  <>
                    <div className="dropdown-menu dropdown-menu-end show">
                      <Link className="dropdown-item" to="/">
                        <i className="fa fa-user" aria-hidden="true"></i> &nbsp;
                        My Preferences
                      </Link>
                      <Link className="dropdown-item" to="#">
                        <i className="fa fa-cog" aria-hidden="true"></i>{" "}
                        &nbsp;Bussiness Settings
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" to="#">
                        <i className="fa fa-sign-out" aria-hidden="true"></i>{" "}
                        &nbsp;Log out
                      </Link>
                    </div>
                  </>
                )}
              </li>
            </ul>
          </div>
        </nav>

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

                    <div className="title-user">Sudip Debnath</div>
                    <div className="email-user">
                      <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
                      sudip@virtualemployee.com
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
