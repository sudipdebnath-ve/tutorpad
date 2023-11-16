import React, { useEffect, useState } from "react";
import "./assets/css/style.css";
import { Link, useNavigate } from "react-router-dom";
import avatar from "./assets/avatars/avatar.jpg";
import study from "./assets/images/study.png";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";

const Dashboard = () => {
  const { userData, logOut, fetchData } = useUserDataContext();
  const navigate = useNavigate();
  console.log(userData);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [profileToggle, setProfileToggle] = useState(false);
  const [notificationToggle, setNotificationToggle] = useState(false);

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
        <nav className="navbar navbar-expand navbar-light navbar-bg">
          <Link className="sidebar-toggle" onClick={handleSidebarToggle}>
            <i className="hamburger align-self-center"></i>
          </Link>
          <h2 style={{ margin: "0" }}>Home</h2>

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
                  <span className="text-dark">{userData.first_name}</span>
                </Link>
                {profileToggle && (
                  <>
                    <div className="dropdown-menu dropdown-menu-end show">
                      <Link className="dropdown-item" to="/my-preferences">
                        <i className="fa fa-user" aria-hidden="true"></i> &nbsp;
                        My Preferences
                      </Link>
                      <Link className="dropdown-item" to="#">
                        <i className="fa fa-cog" aria-hidden="true"></i>{" "}
                        &nbsp;Bussiness Settings
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" onClick={logOut}>
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
            {/* <div
              className="image"
              style={{
                backgroundImage: `url(${study})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div> */}

            <h1 className="h3 mb-3">
              <strong>Let's get started, {userData.first_name}!</strong>
            </h1>

            <div className="row d-flex">
              <div className="col-xl-8 col-xxl-8 d-flex">
                <div className="w-100">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col mt-0">
                              <h5 className="card-title">
                                Event left this week
                              </h5>
                            </div>

                            <div className="col-auto">
                              <div className="stat text-primary">
                                <i
                                  className="fa fa-id-card"
                                  aria-hidden="true"
                                ></i>
                              </div>
                            </div>
                          </div>
                          <h1 className="mt-1 mb-3">0</h1>
                          {/* <div className="mb-0">
                            <span className="text-danger">
                              {" "}
                              <i className="mdi mdi-arrow-bottom-right"></i>{" "}
                              -3.65%{" "}
                            </span>
                            <span className="text-muted">Since last week</span>
                          </div> */}
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col mt-0">
                              <h5 className="card-title">
                                Projected revenue this month
                              </h5>
                            </div>

                            <div className="col-auto">
                              <div className="stat text-primary">
                                <i
                                  className="fa fa-line-chart"
                                  aria-hidden="true"
                                ></i>
                              </div>
                            </div>
                          </div>
                          <h1 className="mt-1 mb-3">$0.00</h1>
                          {/* <div className="mb-0">
                            <span className="text-success">
                              {" "}
                              <i className="mdi mdi-arrow-bottom-right"></i>{" "}
                              5.25%{" "}
                            </span>
                            <span className="text-muted">Since last week</span>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col mt-0">
                              <h5 className="card-title">
                                Payment recieved this month
                              </h5>
                            </div>

                            <div className="col-auto">
                              <div className="stat text-primary">
                                <i className="fa fa-usd" aria-hidden="true"></i>
                              </div>
                            </div>
                          </div>
                          <h1 className="mt-1 mb-3">0</h1>
                          {/* <div className="mb-0">
                            <span className="text-success">
                              {" "}
                              <i className="mdi mdi-arrow-bottom-right"></i>{" "}
                              6.65%{" "}
                            </span>
                            <span className="text-muted">Since last week</span>
                          </div> */}
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col mt-0">
                              <h5 className="card-title">Active Students</h5>
                            </div>

                            <div className="col-auto">
                              <div className="stat text-primary">
                                <i
                                  className="fa fa-users"
                                  aria-hidden="true"
                                ></i>
                              </div>
                            </div>
                          </div>
                          <h1 className="mt-1 mb-3">0</h1>
                          {/* <div className="mb-0">
                            <span className="text-danger">
                              {" "}
                              <i className="mdi mdi-arrow-bottom-right"></i>{" "}
                              -2.25%{" "}
                            </span>
                            <span className="text-muted">Since last week</span>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-xxl-4 d-flex">
                <img src={study} width="100%" alt="study" />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                <div className="card flex-fill w-100">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Agenda</h5>
                  </div>
                  <div className="card-body d-flex">
                    <div className="align-self-center w-100">
                      <div className="py-3">
                        <div className="chart chart-xs">
                          <canvas id="chartjs-dashboard-pie"></canvas>
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

export default Dashboard;
