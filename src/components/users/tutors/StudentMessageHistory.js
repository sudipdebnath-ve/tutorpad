import React, { useState } from "react";
import MiniSidebar from "../../sidebar/MiniSidebar.js";
import Sidebar from "../../sidebar/Sidebar.js";
import TopBar from "../../sidebar/TopBar.js";
import "./assets/css/style.css";
import { Link } from "react-router-dom";
import lending from "../assets/images/lending.svg";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";

const StudentMessageHistory = () => {
  const { sidebarToggle } = useUserDataContext();
  const [createMessage, setCreateMessage] = useState(false);

  const handleCreateMessage = (e) => {
    if (createMessage == false) {
      setCreateMessage(true);
    } else {
      setCreateMessage(false);
    }
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

        <main className="content messagehistory">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
                <div className="back-link">
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                  <Link to="/students"> To Student Overview</Link>
                </div>
                <h1>Message History</h1>
                <h5>
                  <strong>Messages from the </strong>
                  <select className="mes-history-drop">
                    <option>Last 3 Months</option>
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                    <option>Entire History</option>
                    <option>Scheduled Queue (Upcoming)</option>
                  </select>
                </h5>
              </div>
              <div className="col-xl-12 col-xxl-12">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                        <div className="card flex-fill w-100">
                          <div className="card-body d-flex">
                            <div className="align-self-center w-100">
                              <div className="py-3">
                                <div className="chart chart-xs">
                                  <img src={lending} alt="lending"></img>
                                </div>
                              </div>
                              <h5 style={{ textAlign: "center" }}>
                                <strong>
                                  You haven't sent any emails or SMS messages
                                  during this time
                                </strong>
                              </h5>
                              <div class="position-set">
                                <div
                                  className="add-message"
                                  onClick={handleCreateMessage}
                                >
                                  <i
                                    className="fa fa-plus"
                                    aria-hidden="true"
                                  ></i>
                                  <Link className="btn" role="button">
                                    Create New Message
                                  </Link>
                                  <i
                                    class="fa fa-caret-down"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                                {createMessage && (
                                  <>
                                    <div
                                      className="create-mes dropdown-menu addNewDropdown"
                                      aria-labelledby="dropdownMenuLink"
                                    >
                                      <Link
                                        className="dropdown-item"
                                        to="/students"
                                      >
                                        <i
                                          class="fa fa-envelope"
                                          aria-hidden="true"
                                        ></i>
                                        Email Student
                                      </Link>
                                      <div className="dropdown-divider"></div>
                                      <Link
                                        className="dropdown-item"
                                        to="/students/message-history"
                                      >
                                        <i
                                          class="fa fa-envelope"
                                          aria-hidden="true"
                                        ></i>
                                        Email All{" "}
                                      </Link>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
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

export default StudentMessageHistory;
