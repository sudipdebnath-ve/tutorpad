import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MiniSidebar from "../../../sidebar/MiniSidebar.js";
import Sidebar from "../../../sidebar/Sidebar.js";
import TopBar from "../../../sidebar/TopBar.js";
import "./assets/css/style.css";
import { useUserDataContext } from "../../../../contextApi/userDataContext.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../../utils/config.js";
import instructors from "../../assets/images/Instructors.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FetchStudentDatatable from "../FetchStudentDatatable.js";
import FetchStudyLog from "../FetchStudyLog.js";

const StudentEditDetails = () => {
  const { sidebarToggle, token, setLoading } = useUserDataContext();
  const [initial, setInitial] = useState("");
  const [todayDate, setTodayDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [studentFetchData, setStudentFetchData] = useState({});
  let { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const fetchStudentDetails = async () => {
    setLoading(true);
    const validateconfig = {
      method: "GET",
      url: `${API_URL}user/student/details/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        user_id: id,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        console.log(response.data);
        setStudentFetchData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  };

  useEffect(() => {
    fetchStudentDetails();
    var name = `${studentFetchData.first_name}${" "}${
      studentFetchData.last_name
    }`;

    var parts = name.split(" ");
    var initials = "";
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== "") {
        initials += parts[i][0];
      }
    }
    setInitial(initials);
    let today = new Date();
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    setStartDate(date);
  }, [id]);
  // console.log(startDate);

  const handleChange = (e) => {
    setIsOpen(!isOpen);
    console.log(e);
    let today = new Date(e);
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    setTodayDate(date);
    setStartDate(date);
    console.log(date);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className="wrapper student-details">
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
              <div className="col-xl-4 col-xxl-4">
                <div className="card">
                  <div className="card-body">
                    <div className="initials">
                      <div className="image-user">
                        <h2>{initial && initial.toLocaleUpperCase()}</h2>
                      </div>
                    </div>
                    <div className="edit-user">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </div>

                    <div className="title-user">
                      {studentFetchData?.first_name}{" "}
                      {studentFetchData?.last_name}
                    </div>
                    {studentFetchData?.student_status && (
                      <>
                        <div className="active-user">
                          <span className="active">
                            {studentFetchData?.student_status}
                          </span>
                        </div>
                      </>
                    )}

                    <div className="link-to-family">
                      <Link to={"/"}>View Family Account</Link>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="arrange-edit-sign">
                      <h3>Notes</h3>
                      <div className="student-edit-user">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </div>
                    </div>
                    <span>
                      Click the edit button to add a private note about this
                      student
                    </span>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="arrange-edit-sign">
                      <h3>Attachments</h3>
                      <div className="student-edit-user add">
                        <i className="fa fa-plus" aria-hidden="true"></i> Add
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-xxl-8">
                <div className="card">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingOne">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne"
                        >
                          <strong>Student Overview</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="student-properties-edit">
                            <h3>Student Overview</h3>
                            <div className="student-edit-user">
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <div className="formbold-input-flex">
                            <div>
                              <label
                                htmlFor="preferences"
                                className="formbold-form-label"
                              >
                                Preferences
                              </label>
                              <br></br>
                              <div className="preference">
                                <input type="checkbox" name="emailpreference" />
                                Send email lesson reminders
                              </div>
                              <div className="preference">
                                <input type="checkbox" name="smspreference" />
                                Send SMS lesson reminders
                              </div>
                              <span style={{ paddingLeft: "23px" }}>
                                Will only be sent if SMS messaging is allowed
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseTwo"
                          aria-expanded="false"
                          aria-controls="flush-collapseTwo"
                        >
                          <strong>Family Contacts</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingTwo"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="student-properties-edit">
                            {studentFetchData?.parentfirstname !== null &&
                            studentFetchData?.parentlastname !== null ? (
                              <>
                                <h3>
                                  {`${studentFetchData?.parentfirstname}, ${studentFetchData?.parentlastname}`}
                                </h3>
                              </>
                            ) : (
                              <>
                                <strong>Parents Name not submitted</strong>
                              </>
                            )}

                            <div className="student-edit-user">
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <div className="formbold-input-flex">
                            <div>
                              <label
                                htmlFor="preferences"
                                className="formbold-form-label"
                              >
                                Preferences
                              </label>
                              <br></br>
                              <div className="preference">
                                <input type="checkbox" name="emailpreference" />
                                Set as the preferred invoice recipient
                              </div>
                              <div className="preference">
                                <input type="checkbox" name="smspreference" />
                                Show in Student Portal contacts
                              </div>
                              <div className="preference">
                                <input type="checkbox" name="emailpreference" />
                                Send email lesson reminders
                              </div>
                              <div className="preference">
                                <input type="checkbox" name="smspreference" />
                                Send SMS lesson reminders
                              </div>
                              <span style={{ paddingLeft: "23px" }}>
                                Will only be sent if SMS messaging is allowed
                              </span>
                            </div>
                          </div>
                          <hr></hr>
                          <div className="formbold-form-btn-wrapper">
                            <div className="btn-end">
                              <Link className="cancel" to="/students">
                                <i
                                  className="fa fa-exchange"
                                  aria-hidden="true"
                                ></i>
                                Change Family
                              </Link>

                              <button className="formbold-btn">
                                <i
                                  style={{ color: "#ffffff" }}
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                ></i>
                                Add Another Contact
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseThree"
                          aria-expanded="false"
                          aria-controls="flush-collapseThree"
                        >
                          <strong>Assigned Tutors</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingThree"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <h3>Assigned Tutors</h3>

                          <div className="row">
                            <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                              <div className="flex-fill w-100">
                                <div className="py-3">
                                  <div className="chart chart-xs">
                                    <img src={instructors}></img>
                                  </div>
                                </div>
                                <h5>
                                  <strong>
                                    There aren't any tutors assigned to this
                                    student
                                  </strong>
                                </h5>
                                <hr></hr>
                                <div className="formbold-form-btn-wrapper">
                                  <div className="btn-end">
                                    <button className="formbold-btn">
                                      <i
                                        style={{ color: "#ffffff" }}
                                        className="fa fa-plus"
                                        aria-hidden="true"
                                      ></i>
                                      Assign Tutor
                                    </button>
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
                <div className="card">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingFour">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseFour"
                          aria-expanded="false"
                          aria-controls="flush-collapseFour"
                        >
                          <strong>Study Log</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingFour"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="calculate-study">
                            <div>
                              <div className="days-studied">
                                <i
                                  className="fa fa-calendar"
                                  aria-hidden="true"
                                ></i>{" "}
                                <h5>Days Studied</h5>
                              </div>
                              <span>
                                1 day this week <br></br>1 day in the last 30
                                days
                              </span>
                            </div>
                            <div>
                              <div className="hours-studied">
                                <i
                                  className="fa fa-clock"
                                  aria-hidden="true"
                                ></i>{" "}
                                <h5>Hours Studied</h5>
                              </div>
                              <span>
                                0:10 hours this week{" "}
                                <i
                                  className="fa fa-long-arrow-up"
                                  aria-hidden="true"
                                ></i>{" "}
                                <emp>100%</emp>
                                <br></br>0:10 hours in the last 30 days
                              </span>
                            </div>
                            <div>
                              <div className="average-study">
                                <i
                                  className="fa fa-bar-chart"
                                  aria-hidden="true"
                                ></i>{" "}
                                <h5>Average Study Time</h5>
                              </div>
                              <span>
                                0:10 hours this week{" "}
                                <i
                                  className="fa fa-long-arrow-up"
                                  aria-hidden="true"
                                ></i>{" "}
                                <emp>100%</emp>
                                <br></br>0:10 hours in the last 30 days
                              </span>
                            </div>
                            <div className="student-edit-user">
                              <i className="fa fa-cog" aria-hidden="true"></i>
                            </div>
                          </div>
                          <div className="calendar-body">
                            <h5>
                              {studentFetchData?.first_name}'s Study Log as of{" "}
                              <emp>{startDate ? startDate : "no"}</emp>{" "}
                              <i
                                onClick={handleClick}
                                className="fa fa-caret-down"
                                aria-hidden="true"
                              >
                                {isOpen && (
                                  <DatePicker
                                    selected={todayDate}
                                    onChange={handleChange}
                                    inline
                                  />
                                )}
                              </i>
                            </h5>
                            <a className="addnew" href="#" role="button">
                              <i class="fa fa-plus" aria-hidden="true"></i>
                              Add Time
                            </a>

                            <FetchStudyLog />
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

export default StudentEditDetails;
