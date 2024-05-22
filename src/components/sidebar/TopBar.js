import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoBell } from "react-icons/go";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import avatar from "../users/assets/avatars/avatar.jpg";
import CustomizedSwitch from "../CustomizedSwitch.js";
import "./style.css";

const TopBar = () => {
  const { userData, logOut, setSidebarToggle, sidebarToggle, toggleTheme } =
    useUserDataContext();

  const [pageName, setPageName] = useState("");
  const [profileToggle, setProfileToggle] = useState(false);
  const [notificationToggle, setNotificationToggle] = useState(false);

  const user_first_name = localStorage.getItem('user_name');

  useEffect(() => {
    let name = window.location.pathname;
    var new_str = name.replace("/", "");
    var new_str = new_str.replace("-", " ");
    setPageName(new_str);
    if (new_str.includes("students")) {
      setPageName("Students");
    } else if (new_str.includes("tutors")) {
      setPageName("Tutors");
    }
  }, []);

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
  return (
    <nav className="navbar navbar-expand">
      <Link className="sidebar-toggle" onClick={handleSidebarToggle}>
        <i className="hamburger align-self-center"></i>
      </Link>
      <h2 style={{ margin: "0" }} className="page-name">
        <strong>
          {pageName ? pageName.charAt(0).toUpperCase() + pageName.slice(1) : ""}
        </strong>
      </h2>

      <div className="navbar-collapse collapse">
        <input
          className="form-control  search-box"
          type="search"
          placeholder="Search File Here"
          aria-label="Search"
        />
        <ul className="navbar-nav navbar-align align-items-center">
          <li className="nav-item dropdown bell">
            <Link
              className="nav-icon dropdown-toggle"
              to="#"
              id="alertsDropdown"
              onClick={() => setNotificationToggle(!notificationToggle)}
            >
              <div className="position-relative">
                {/* <i className="fa-regular fa-bell" area-hidden="true"></i> */}
                <GoBell />
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
                          <i className="text-warning" data-feather="bell"></i>
                        </div>
                        <div className="col-10">
                          <div className="text-dark">Lorem ipsum</div>
                          <div className="text-muted small mt-1">
                            Aliquam ex eros, imperdiet vulputate hendrerit et.
                          </div>
                          <div className="text-muted small mt-1">2h ago</div>
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
                          <div className="text-muted small mt-1">14h ago</div>
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
            {/* <Link
              className="nav-icon dropdown-toggle"
              to="#"
              id="messagesDropdown"
            >
              <div className="position-relative">
                <i className="fa fa-question-circle" aria-hidden="true"></i>
              </div>
            </Link> */}
            <span className="text-color" style={{ fontFamily: "Poppins" }}>
              Hi, { (userData?.first_name) ? userData.first_name : user_first_name}
            </span>
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
                        Aenean tellus metus, bibendum sed, posuere ac, mattis
                        non.
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
            >
              <i className="align-middle" data-feather="settings"></i>
            </Link>

            <Link
              className="nav-link dropdown-toggle d-none d-sm-inline-block"
              to="#"
              onClick={handleProfileToggle}
            >
              {userData?.business_data?.dp_url ? (
                <>
                  <img
                    src={userData?.business_data?.dp_url}
                    alt=""
                    className="avatar img-fluid  me-1"
                  />
                </>
              ) : (
                <img
                  src={avatar}
                  className="avatar img-fluid me-1"
                  alt="Charles Hall"
                />
              )}{" "}
            </Link>
            {profileToggle && (
              <>
                <div className="dropdown-menu dropdown-menu-end show">
                  <Link className="dropdown-item" to="/my-preferences">
                    <i className="fa fa-user" aria-hidden="true"></i> &nbsp; My
                    Preferences
                  </Link>
                  <Link className="dropdown-item" to="/bussiness-settings">
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
        <CustomizedSwitch />
      </div>
    </nav>
  );
};

export default TopBar;
