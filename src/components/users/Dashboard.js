import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import study from "./assets/images/study.png";
import createAccount from "./assets/images/create-account.png";
import createInvoice from "./assets/images/create-invoice.png";
import addStudent from "./assets/images/add-student.png";
import scheduleEvent from "./assets/images/schedule-event.png";
import youGotIt from "./assets/images/got-it.png";
import eventIcon from "./assets/images/event.svg";
import paymentIcon from "./assets/images/payment.svg";
import projectIcon from "./assets/images/project.svg";
import activeIcon from "./assets/images/active-student.svg";

import { useUserDataContext } from "../../contextApi/userDataContext.js";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import { storeToken } from '../../utils/helper.js';

const Dashboard = () => {
  const { userData, fetchData, sidebarToggle } = useUserDataContext();
  const navigate = useNavigate();

  useEffect(() => {
    //get token and domain from url and set it into localstorage
    console.log('token 1111: ',JSON.parse(localStorage.getItem('tutorPad')));

    getTokenData();
    var token = JSON.parse(localStorage.getItem(window.location.hostname));
    if(!token){
      navigate('/signin');
    }
  }, []);

  const getTokenData = async () => {

    // Get hash fragment from URL
    const hash = window.location.hash;

    // Check if hash fragment is empty or doesn't contain parameters
    if (!hash || hash.indexOf('#') === -1) {
      fetchData();
      return; // Exit the function early if parameters are not present
    }

    // Remove the '#' character
    const hashWithoutSharp = hash.slice(1);

    // Split the hash fragment into token and domain
    const [encodedToken, encodedDomain] = hashWithoutSharp.split('#');

    // Decode the encoded values
    var token = decodeURIComponent(encodedToken);
    var domain = decodeURIComponent(encodedDomain);

    //store token in localstorage
    await storeToken(token,domain);
    await fetchData();

    // Optionally, you may want to clear the hash fragment after reading it
    window.history.replaceState({}, document.title, window.location.pathname);
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

      <div className="main main-content">
        <TopBar />

        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">
              <strong>Let's get started, {userData?.first_name}!</strong>
            </h1>

            <div className="row all-step">
              <div className="col-xl-12 col-xxl-12 steps">
                <div className="row">
                  <div className="col-auto">
                    <div className="stat text-primary icon1">
                      {/* <i className="fa fa-check" aria-hidden="true"></i> */}
                      <img src={createAccount} alt="create-account-icon" />
                    </div>
                  </div>
                  <div className="col mt-0">
                    <h5 className="card-title">Create Account</h5>
                  </div>
                </div>

                <div className="row">
                  <div className="col-auto">
                    <div className="stat text-primary icon2">
                    <Link
                          // className="dropdown-item"
                          to={"/students/add"}
                    >
                    
                      <img src={addStudent} alt="add-student-icon" />
                      </Link>
                    </div>
                  </div>
                  <div className="col mt-0">
                    <h5 className="card-title">Add Student</h5>
                    
                  </div>
                </div>

                <div className="row">
                  <div className="col-auto">
                    <div className="stat text-primary icon3">
                    <Link
                          className="dropdown-item"
                          to={"/calendar"}
                    >
                      <img src={scheduleEvent} alt="schedule-event-icon" />
                      </Link>
                    </div>
                  </div>
                  <div className="col mt-0">
                    <h5 className="card-title">Schedule Event</h5>
                  </div>
                </div>

                <div className="row">
                  <div className="col-auto">
                    <div className="stat text-primary icon4">
                      <img src={createInvoice} alt="create-invoice-icon" />
                    </div>
                  </div>
                  <div className="col mt-0">
                    <h5 className="card-title">Create Invoice</h5>
                  </div>
                </div>

                <div className="row">
                  <div className="col-auto">
                    <div className="stat text-primary icon5">
                      <img src={youGotIt} alt="you've got it" />
                    </div>
                  </div>
                  <div className="col mt-0">
                    <h5 className="card-title">You've Got It!</h5>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-xxl-4 d-flex"></div>
            </div>

            <div className="row d-flex box-container">
              <h1 className="h3 mb-4">
                <strong>Category</strong>
              </h1>
              <div className="col-xl-12 col-xxl-12 d-flex">
                <div className="w-100">
                  <div className="row">
                    <div className="col-sm-6 pr-2">
                      <div className="card">
                        <div className="card-body db-card-body">
                          <div className="row">
                            <div className="col mt-0">
                              <div className="square text-primary eventIcon">
                                <img src={eventIcon} className="eventImg" />
                              </div>
                              <h5 className="card-title">
                                Event left this week
                              </h5>
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
                        <div className="card-body db-card-body">
                          <div className="row">
                            <div className="col mt-0">
                              <div className="square text-primary projectIcon">
                                <img src={projectIcon} />
                              </div>
                              <h5 className="card-title">
                                Projected revenue this month
                              </h5>
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
                        <div className="card-body db-card-body">
                          <div className="row">
                            <div className="col mt-0">
                              <div className="square text-primary paymentIcon">
                                <img src={paymentIcon} className="paymentImg" />
                              </div>
                              <h5 className="card-title">
                                Payment recieved this month
                              </h5>
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
                        <div className="card-body db-card-body">
                          <div className="row">
                            <div className="col mt-0">
                              <div className="square text-primary activeIcon">
                                <img src={activeIcon} />
                              </div>
                              <h5 className="card-title">Active Students</h5>
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
              {/* <div className="col-xl-4 col-xxl-4 d-flex">
                <img src={study} width="100%" alt="study" />
              </div> */}
            </div>

            {/* <div className="row">
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
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
