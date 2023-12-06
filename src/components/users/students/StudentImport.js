import React, { useState } from "react";
import MiniSidebar from "../../sidebar/MiniSidebar.js";
import Sidebar from "../../sidebar/Sidebar.js";
import TopBar from "../../sidebar/TopBar.js";
import "./assets/css/style.css";
import { Link } from "react-router-dom";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";

const StudentImport = () => {
  const { sidebarToggle } = useUserDataContext();

  const handleUploadFile = () => {
    const stepMenuOne = document.querySelector(".formbold-step-menu1");
    const stepMenuTwo = document.querySelector(".formbold-step-menu2");
    const stepOne = document.querySelector(".formbold-form-step-1");
    const stepTwo = document.querySelector(".formbold-form-step-2");
    stepMenuOne.classList.remove("active");
    stepMenuTwo.classList.add("active");
    stepOne.classList.remove("active");
    stepTwo.classList.add("active");
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

      <div className="main bg-color">
        <TopBar />

        <main className="content studentadd">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
                <div className="formbold-main-wrapper">
                  <div className="back-link">
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    <Link to="/students"> Back to Students</Link>
                  </div>
                  <h1>Import Students</h1>
                  <div className="formbold-form-wrapper">
                    <form name="myForm">
                      <div className="formbold-steps">
                        <ul>
                          <li className="formbold-step-menu1 active">
                            <span>1</span>
                            Import File
                          </li>
                          <li className="formbold-step-menu2">
                            <span>2</span>
                            Confirm
                          </li>
                        </ul>
                      </div>

                      <div className="formbold-form-step-1 active">
                        <h5>
                          <strong>
                            How do you want to import your student list?
                          </strong>
                        </h5>
                        <div className="uploads-type">
                          <div
                            className="upload-file"
                            onClick={handleUploadFile}
                          >
                            <div>
                              <i
                                className="fa fa-upload"
                                aria-hidden="true"
                              ></i>{" "}
                            </div>
                            <div>
                              <strong className="pb-1">Upload a File</strong>
                              <br></br>
                              Upload your student list from a CSV/Excel format
                              file
                            </div>
                          </div>
                          <div className="upload-file">
                            <div>
                              <i
                                className="fa fa-clipboard"
                                aria-hidden="true"
                              ></i>{" "}
                            </div>
                            <div>
                              <strong className="pb-1">Copy and Paste</strong>
                              <br />
                              Upload your student list from a CSV/Excel format
                              file
                            </div>
                          </div>
                        </div>
                        <br></br>
                        <Link to="/">Sample File (Excel)</Link>
                      </div>

                      <div className="formbold-form-step-2">
                        <h5>What file do you want to import?</h5>
                        <div className="input-file">
                          <i className="fa fa-upload" aria-hidden="true"></i>{" "}
                          <input type="file" name="file"></input>
                        </div>
                        <div className="formbold-input-flex mt-3">
                          <div className="invoicing">
                            <div>
                              <input
                                type="checkbox"
                                className="status"
                                name="column_header"
                                checked
                              />
                              Use the first row as the column header
                              <br />
                            </div>
                          </div>
                        </div>
                        <div className="default-setting">
                          <div className="default">
                            <strong>Sudip Debnath</strong>
                            <div className="edit-setting-import">
                              <i class="fa fa-pencil" aria-hidden="true"></i>{" "}
                              <span>Edit Default Settings</span>
                            </div>
                          </div>
                        </div>

                        <div className="formbold-input-flex diff">
                          <div>
                            <div>
                              <label
                                htmlFor="status"
                                className="formbold-form-label"
                              >
                                What status do you want to assign to these
                                students?
                              </label>
                            </div>
                            <div className="studentStatus">
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="student_status"
                                />
                                <span
                                  className="bg-design"
                                  style={{
                                    color: "#18790b",
                                    backgroundColor: "#b3f3b3bd",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Active
                                </span>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="student_status"
                                />
                                <span
                                  className="bg-design"
                                  style={{
                                    color: "#005c5c",
                                    backgroundColor: "rgb(179 210 243 / 74%)",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Trial
                                </span>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="student_status"
                                />
                                <span
                                  className="bg-design"
                                  style={{
                                    color: "#e34c00",
                                    backgroundColor: "rgb(253 232 222 / 74%)",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Waiting
                                </span>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="student_status"
                                />
                                <span
                                  className="bg-design"
                                  style={{
                                    color: "#604274",
                                    backgroundColor: "rgb(238 205 249 / 74%)",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Lead
                                </span>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="student_status"
                                />
                                <span
                                  className="bg-design"
                                  style={{
                                    color: "#344242",
                                    backgroundColor: "rgb(208 219 231 / 74%)",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Inactive
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="formbold-form-btn-wrapper">
                          <button className="formbold-back-btn">Back</button>
                          <div className="btn-end">
                            <Link className="cancel" to="/students">
                              Cancel
                            </Link>

                            <button className="formbold-btn">
                              Next Step
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_1675_1807)">
                                  <path
                                    d="M10.7814 7.33312L7.20541 3.75712L8.14808 2.81445L13.3334 7.99979L8.14808 13.1851L7.20541 12.2425L10.7814 8.66645H2.66675V7.33312H10.7814Z"
                                    fill="white"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1675_1807">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
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

export default StudentImport;
