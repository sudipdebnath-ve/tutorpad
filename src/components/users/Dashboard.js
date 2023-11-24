import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import study from "./assets/images/study.png";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";

const Dashboard = () => {
  const { userData, fetchData, sidebarToggle } = useUserDataContext();
  const navigate = useNavigate();
  // console.log(userData);

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
            <h1 className="h3 mb-3">
              <strong>Let's get started, {userData.first_name}!</strong>
            </h1>

            <div className="row all-step">
              <div className="col-xl-8 col-xxl-8 steps">
                <div className="card step1">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-auto">
                        <div className="stat text-primary">
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </div>
                      </div>
                      <div className="col mt-0">
                        <h5 className="card-title">Create Account</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <i class="fa fa-arrow-right" aria-hidden="true"></i>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-auto">
                        <div className="stat text-primary">
                          <i class="fa fa-user-plus" aria-hidden="true"></i>
                        </div>
                      </div>
                      <div className="col mt-0">
                        <h5 className="card-title">Add Student</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <i class="fa fa-arrow-right" aria-hidden="true"></i>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-auto">
                        <div className="stat text-primary">
                          <i class="fa fa-calendar" aria-hidden="true"></i>
                        </div>
                      </div>
                      <div className="col mt-0">
                        <h5 className="card-title">Schedule Event</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <i class="fa fa-arrow-right" aria-hidden="true"></i>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-auto">
                        <div className="stat text-primary">
                          <i class="fa fa-file-text" aria-hidden="true"></i>
                        </div>
                      </div>
                      <div className="col mt-0">
                        <h5 className="card-title">Create Invoice</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>

                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-auto">
                        <div className="stat text-primary">
                          <i class="fa fa-gift" aria-hidden="true"></i>
                        </div>
                      </div>
                      <div className="col mt-0">
                        <h5 className="card-title">You've Got It!</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-xxl-4 d-flex"></div>
            </div>

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
