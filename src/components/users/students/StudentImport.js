import React, { useState } from "react";
import MiniSidebar from "../../sidebar/MiniSidebar.js";
import Sidebar from "../../sidebar/Sidebar.js";
import TopBar from "../../sidebar/TopBar.js";
import "./assets/css/style.css";
import { Link } from "react-router-dom";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import { API_URL } from "../../../utils/config.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import Papa from "papaparse";

const StudentImport = () => {
  const { sidebarToggle, token, userId } = useUserDataContext();
  const [files, setFiles] = useState({});
  const [fileContent, setFileContent] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [studentSettings, setStudentSettings] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Collect edited data
    const tableRows = document.querySelectorAll(".editable-table tbody tr");
    const editedRows = Array.from(tableRows).map((row) => {
      const cells = row.querySelectorAll("td");
      console.log('preview cells : ',cells);
      const rowData = Array.from(cells).reduce((acc, cell, index) => {
        const key = Object.keys(previewData[0])[index];
        console.log('preview cells innerText: ',cell.innerText);
        acc[key] = cell.innerText;
        return acc;
      }, {});
      console.log("preview rowData : ",rowData);
      return rowData;
    });

    console.log("preview editedRows : ",editedRows);

    let formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));
    formData.append("data", JSON.stringify(editedRows));
    formData.append("studentSettings", JSON.stringify(studentSettings));
    const config = {
      method: "POST",
      url: `${API_URL}import-students`,
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    };
    await axios(config)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          navigate("/students");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === "application/vnd.ms-excel" || fileType === "text/csv" || fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        setFiles(file);
        readFile(file);
      } else {
        toast.error("Please upload a CSV or Excel file.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      if (file.type === "text/csv") {
        const parsedData = Papa.parse(data, { header: true });
        console.log('preview : ',parsedData);
        setPreviewData(parsedData.data);
      } else {
        const workbook = XLSX.read(data, { type: "binary" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const excelData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
        console.log('preview : ',excelData);
        setPreviewData(excelData);
      }
    };
    if (file.type === "text/csv") {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStudentSettings({ ...studentSettings, [name]: value });
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

        <main className="content studentadd">
          <ToastContainer />
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
                          <input
                            type="file"
                            name="file"
                            onChange={handleUpload}
                            accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          ></input>
                        </div>
                        {previewData.length > 0 && (
                          <div className="file-preview mt-4">
                            <h5>File Preview:</h5>
                            <table className="card table editable-table">
                              <thead>
                                <tr>
                                  {Object.keys(previewData[0]).map((key, index) => (
                                    <th key={index}>{key}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {previewData.slice(0, 6).map((row, rowIndex) => (
                                  <tr key={rowIndex}>
                                    {Object.values(row).map((cell, cellIndex) => (
                                      <td key={cellIndex} contentEditable={true}>{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        <div className="formbold-input-flex mt-3">
                          <div className="invoicing">
                            <div>
                              <input
                                type="checkbox"
                                className="status"
                                name="column_header"
                              />
                              Use the first row as the column header
                              <br />
                            </div>
                          </div>
                        </div>
                        <div className="default-setting">
                          <div className="default justify-content-between">
                            <strong>Student Default Settings</strong>
                            <div className="edit-setting-import" onClick={() => setIsEditable(true)}>
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>{" "}
                              <span>Edit</span>
                            </div>
                          </div>
                          { isEditable && (
                            <div className="formbold p-4">
                              <div className="formbold-input-flex">
                                <div>
                                  <label
                                    htmlFor="parentpreferences"
                                    className="formbold-form-label"
                                  >
                                    Preferences
                                  </label>
                                  <br></br>
                                  <div className="preference">
                                    <input
                                      type="checkbox"
                                      name="parentemailpreference"
                                      onChange={handleChange}
                                    />
                                    Send email lesson reminders
                                  </div>
                                  <div className="preference">
                                    <input
                                      type="checkbox"
                                      name="parentsmspreference"
                                      onChange={handleChange}
                                    />
                                    Send SMS lesson reminders
                                  </div>
                                  <span>
                                    Will only be sent if SMS messaging is allowed
                                  </span>
                                </div>
                              </div>
                              <div className="formbold-input-flex diff">
                                <div>
                                  <input
                                    type="checkbox"
                                    className="sms"
                                    name="enable_login_access"
                                    onChange={handleChange}
                                    id="enable_login_access"
                                  />
                                  <label htmlFor="enable_login_access">
                                    {" "}
                                    Enable login access
                                  </label>
                                  <br />
                                  <span>
                                    An email will be sent with a link to set up their
                                    password
                                  </span>
                                </div>
                              </div>
                              <div className="formbold-input-flex diff">
                                <div>
                                  <label
                                    htmlFor="billing"
                                    className="formbold-form-label"
                                  >
                                    Default Billing
                                  </label>
                                  <br></br>
                                  <div className="preference">
                                    <input
                                      type="radio"
                                      name="billing"
                                      onChange={handleChange}
                                      value="Don't automatically create any calendar-generated
                                      charges"
                                    />
                                    Don't automatically create any calendar-generated
                                    charges
                                  </div>
                                  <div className="preference">
                                    <input
                                      type="radio"
                                      name="billing"
                                      onChange={handleChange}
                                      value="Student pays based on the number of lessons taken"
                                    />
                                    Student pays based on the number of lessons taken
                                  </div>
                                  <div className="preference">
                                    <input
                                      type="radio"
                                      name="billing"
                                      onChange={handleChange}
                                      value="Student pays the same amount each month regardless
                                      of number of lessons"
                                    />
                                    Student pays the same amount each month regardless
                                    of number of lessons
                                  </div>
                                  <div className="preference">
                                    <input
                                      type="radio"
                                      name="billing"
                                      onChange={handleChange}
                                      value="Student pays an hourly rate"
                                    />
                                    Student pays an hourly rate
                                  </div>
                                  <span>
                                    Charges will automatically adjust to lesson length
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
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

                            <button
                              className="formbold-btn"
                              onClick={handleSubmit}
                            >
                              Submit
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
