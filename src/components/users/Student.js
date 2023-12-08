import React, { useState, useEffect } from "react";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import adduser from "./assets/images/add-users.webp";
import students from "./assets/images/students.svg";
import { Link } from "react-router-dom";
import FetchStudentDatatable from "./students/FetchStudentDatatable.js";

const Student = () => {
  const { sidebarToggle, fetchData, studentData } = useUserDataContext();
  const [addNewDropdown, setAddNewDropdown] = useState(false);
  const [messageDropdown, setMessageDropdown] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);

  const handleClickMessage = (e) => {
    if (messageDropdown == false) {
      setMessageDropdown(true);
    } else {
      setMessageDropdown(false);
    }
  };
  const handleClickAddNew = (e) => {
    if (addNewDropdown == false) {
      setAddNewDropdown(true);
    } else {
      setAddNewDropdown(false);
    }
  };
  const handleClickSearch = (e) => {
    console.log(searchDropdown);
    if (searchDropdown == false) {
      setSearchDropdown(true);
    } else {
      setSearchDropdown(false);
    }
  };

  useEffect(() => {
    fetchData();
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

        <main className="content student">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Students
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Groups
                    </button>
                  </li>
                </ul>
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
                          <div className="card-header">
                            <div
                              className="dropdown addnew"
                              onClick={handleClickAddNew}
                            >
                              <i className="fa fa-plus" aria-hidden="true"></i>
                              <a className="btn dropdown-toggle">Add New</a>
                              {addNewDropdown && (
                                <>
                                  <div className="dropdown-menu addNewDropdown">
                                    <Link
                                      className="dropdown-item"
                                      to={"/students/add"}
                                    >
                                      <i
                                        className="fa fa-plus"
                                        aria-hidden="true"
                                      ></i>
                                      New Student
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link
                                      className="dropdown-item"
                                      to={"/students/import"}
                                    >
                                      <i
                                        class="fa fa-cloud-download"
                                        aria-hidden="true"
                                      ></i>
                                      Import Students
                                    </Link>
                                  </div>
                                </>
                              )}
                            </div>
                            <div
                              className="dropdown"
                              onClick={handleClickMessage}
                            >
                              <i
                                className="fa fa-envelope"
                                aria-hidden="true"
                              ></i>
                              <a className="btn dropdown-toggle">Messaging</a>
                              {messageDropdown && (
                                <>
                                  <div
                                    className="dropdown-menu addNewDropdown"
                                    aria-labelledby="dropdownMenuLink"
                                  >
                                    <Link
                                      className="dropdown-item"
                                      to="/students/message"
                                    >
                                      New Email
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item">
                                      Go to Message History{" "}
                                    </Link>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="dropdown options">
                              <i className="fa fa-cog" aria-hidden="true"></i>

                              <a
                                className="btn dropdown-toggle"
                                role="button"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Options
                              </a>

                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                              >
                                <a className="dropdown-item" href="#">
                                  Action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Another action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Something else here
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-header">
                            <div className="dropdown options">
                              <i
                                className="fa fa-columns"
                                aria-hidden="true"
                              ></i>
                              <a
                                className="btn dropdown-toggle"
                                href="#"
                                role="button"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Columns
                              </a>

                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                              >
                                <a className="dropdown-item" href="#">
                                  Action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Another action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Something else here
                                </a>
                              </div>
                            </div>
                            <div className="dropdown options">
                              <i className="fa fa-sort" aria-hidden="true"></i>
                              <a
                                className="btn dropdown-toggle"
                                href="#"
                                role="button"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Sort
                              </a>

                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                              >
                                <a className="dropdown-item" href="#">
                                  Action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Another action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Something else here
                                </a>
                              </div>
                            </div>
                            <div
                              className="dropdown"
                              onClick={handleClickSearch}
                            >
                              <i
                                className="fa fa-search"
                                aria-hidden="true"
                              ></i>

                              <a className="btn dropdown-toggle">Search</a>

                              {searchDropdown && (
                                <>
                                  <div className="dropdown-menu addNewDropdown search">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="search"
                                    ></input>
                                    <label>By Status</label>
                                    <select className="form-control">
                                      <option value="active">Active</option>
                                      <option value="all">All</option>
                                      <option value="inactive">Inactive</option>
                                      <option value="lead">Lead</option>
                                      <option value="trail">Trail</option>
                                      <option value="waiting">Waiting</option>
                                    </select>
                                    <label>By Tutor</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Select.."
                                    ></input>
                                    <div className="dropdown-divider"></div>
                                    <div className="button-search">
                                      <button>Clear Search</button>
                                      <button>Search</button>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="card-body d-flex">
                            <div className="align-self-center w-100">
                              <div className="py-3">
                                <div className="chart chart-xs">
                                  {/* {studentData ? (
                                    <> */}
                                  <FetchStudentDatatable />
                                  {/* </>
                                  ) : (
                                    <>
                                      <img src={students}></img>
                                    </>
                                  )} */}
                                </div>
                              </div>
                              <h4>
                                <strong>You don't have any students yet</strong>
                              </h4>
                              <p style={{ textAlign: "center" }}>
                                Add your students so you can take their
                                attendance, and more.
                              </p>
                              <div className="addnewstudent">
                                <i
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                ></i>
                                <a
                                  className="btn dropdown-toggle"
                                  href="#"
                                  role="button"
                                >
                                  Add New
                                </a>

                                <div
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuLink"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="row">
                      <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                        <div className="card flex-fill w-100">
                          <div className="card-header">
                            <div className="dropdown addnew">
                              <i className="fa fa-plus" aria-hidden="true"></i>
                              <a
                                className="btn dropdown-toggle"
                                href="#"
                                role="button"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="true"
                              >
                                Add Group
                              </a>

                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                              >
                                <a className="dropdown-item" href="#">
                                  Action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Another action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Something else here
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-header">
                            <div className="dropdown options">
                              <i
                                className="fa fa-columns"
                                aria-hidden="true"
                              ></i>
                              <a
                                className="btn dropdown-toggle"
                                href="#"
                                role="button"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Columns
                              </a>

                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                              >
                                <a className="dropdown-item" href="#">
                                  Action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Another action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Something else here
                                </a>
                              </div>
                            </div>
                            <div className="dropdown options">
                              <i className="fa fa-sort" aria-hidden="true"></i>
                              <a
                                className="btn dropdown-toggle"
                                href="#"
                                role="button"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Sort
                              </a>

                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                              >
                                <a className="dropdown-item" href="#">
                                  Action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Another action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Something else here
                                </a>
                              </div>
                            </div>
                            <div className="dropdown options">
                              <i
                                className="fa fa-search"
                                aria-hidden="true"
                              ></i>

                              <a
                                className="btn dropdown-toggle"
                                href="#"
                                role="button"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Search
                              </a>

                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                              >
                                <a className="dropdown-item" href="#">
                                  Action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Another action
                                </a>
                                <a className="dropdown-item" href="#">
                                  Something else here
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-body d-flex">
                            <div className="align-self-center w-100">
                              <div className="py-3">
                                <div className="chart chart-xs">
                                  <img src={students}></img>
                                </div>
                              </div>
                              <h4>
                                <strong>You don't have any Groups yet</strong>
                              </h4>
                              <p style={{ textAlign: "center" }}>
                                Keep your students organized by assigning them
                                into groups
                              </p>
                              <div className="addnewstudent">
                                <i
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                ></i>
                                <a
                                  className="btn dropdown-toggle"
                                  href="#"
                                  role="button"
                                >
                                  Add Group
                                </a>

                                <div
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuLink"
                                ></div>
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

export default Student;
