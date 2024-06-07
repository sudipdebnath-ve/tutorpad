import React, { useState, useEffect } from "react";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import students from "./assets/images/students.svg";
import { Link } from "react-router-dom";
import FetchStudentDatatable from "./students/FetchStudentDatatable.js";
import FetchStudentGroupDatatable from "./students/FetchStudentGroupDatatable.js";
import Loader from "../Loader.js";
import LanguageOption from "../LanguageOption.js";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import ReactModal from "react-modal";
import { API_URL } from "../../utils/config.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const Student = () => {
  const { isDarkMode, sidebarToggle, loading, fetchStudentData, 
    fetchStudentGroupData, userId, studentData, token } = useUserDataContext();
  const [addNewDropdown, setAddNewDropdown] = useState(false);
  const [messageDropdown, setMessageDropdown] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [editRow, setEditRow] = useState(false);
  const [get_group_name, set_group_name] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [error, setError] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteRow, setDeleteRow] = useState();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    group_name: "",
    student_ids: "",
  });
  const [studentsList, setStudentsList] = useState([]);

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: isDarkMode ? "#363636" : "white",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDarkMode ? "#363636" : "white",
        color: isDarkMode ? "#FFF" : "black",
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  useEffect(() => {
    if (studentData) {
      const transformData = (data) => {
        const students = data.map((e) => ({
          value: e.id,
          label: e.name,
        }));
        setStudentsList(students);
      };
      transformData(studentData);
    }
  }, [studentData]);


  const handleClickMessage = (e) => {
    // if (messageDropdown == false) {
    //   setMessageDropdown(true);
    // } else {
    //   setMessageDropdown(false);
    // }
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

  const addStudentGroupStyles = {
    content: {
      width: "45%",
      height: "90%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      background: "#6c5a5669",
    },
  };

  const customStyles = {
    content: {
      width: "45%",
      minHeight: "35%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      background: "#6c5a5669",
      zIndex: 9999, // Ensure the modal overlay has a higher z-index
    },
  };

  function openModal(e) {
    setIsOpen(e);
  }

  function closeModal(e) {
    setIsOpen(e);
    setError('');
    set_group_name("");
    setSelectedStudents([]);
    setIsEditForm(false);
    setEditRow('');
    setDeleteRow('');
  }

  const saveStudentGroup = async (e) => {
    e.preventDefault();
    formData["group_name"] = get_group_name;
    formData["student_ids"] = selectedStudents.map((e) => e.value) || [];
    var config = {};
    if (isEditForm) {
      // Edit Form
      formData["group_id"] = editRow;
      console.log('editRow :',editRow);
      config = {
        method: "PATCH",
        url: `${API_URL}update-student-group`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      };
      
    } else {
      config = {
        method: "POST",
        url: `${API_URL}new-student-group`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      };
    }
    await axios(config)
    .then((response) => {
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      set_group_name("");
      setSelectedStudents([]);
      setIsEditForm(false);
      setEditRow('');
      setDeleteRow('');
      fetchStudentGroupData();
      closeModal();
      
    })
    .catch((error) => {
      console.log(error);
      if (error.response.data.success === false) {
        setError(error.response.data.data);
      }
    });
  };


  const handleEdit = (row) => {
    console.log("Edit clicked for id:", row);
    openModal("addStudentGroup");
    set_group_name(row.name);
    setIsEditForm(true);
    setEditRow(row.id);

    const selectedValues = [];
    const selectedTextValues = [];
    const studentArr = row.students;
    for (let i = 0; i < studentArr.length; i++) {
        selectedTextValues.push({ value: studentArr[i].id, label: studentArr[i].name });
    }
    setSelectedStudents(selectedTextValues);
    // Add your edit logic here
  };

  const handleDelete =  (id) => {
    console.log("Delete clicked for id:", id);
    setShowDeleteModal(true);
    setDeleteRow(id);
  };

  const deleteStudentGroup = async (e) => {
    console.log("Delete clicked for id:", deleteRow);
    const validateconfig = {
      method: "DELETE",
      url: `${API_URL}delete-student-group`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        group_id: deleteRow,
      },
    };
    await axios(validateconfig)
    .then((response) => {
      // console.log(response.data);
      if (response.data.success === true) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchStudentGroupData();
        setShowDeleteModal(false);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

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
        <ReactModal
          isOpen={modalIsOpen === "addStudentGroup"}
          onRequestClose={closeModal}
          style={addStudentGroupStyles}
          contentLabel="Example Modal"
        >
          <div className="calendar-modal">
            <div className="close-h add">
              <h4>
                <strong>
                  {isEditForm ? "Edit Student Group" : "Add Student Group"}
                </strong>
              </h4>
              <button className="closeModal" onClick={closeModal}>
                X
              </button>
            </div>
            <br></br>
            <form name="studentProfile">
              <div className="row d-flex">
                <div className="col-xl-12 col-xxl-12">
                  <div className="formbold-form-step-1 active">
                    <div className="formbold-input-flex diff">
                      <div>
                        <label htmlFor="tutor" className="formbold-form-label">
                          Title
                        </label>
                        <div>
                          <input
                            type="text"
                            name="group_name"
                            className="form-control"
                            value={get_group_name}
                            onChange={(e) => set_group_name(e.target.value)}
                          />
                        </div>
                        <div className="pb-2">
                          <small style={{ color: "red" }}>
                            {error?.group_name?.length ? error.group_name[0] : <></>}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <label htmlFor="tutor" className="formbold-form-label">
                          Students
                        </label>
                        {/* Rushita */}
                        <div>
                          <Select
                            value={selectedStudents}
                            onChange={(e) => setSelectedStudents(e)}
                            isMulti={true}
                            options={studentsList}
                            styles={colourStyles}
                          />
                        </div>
                        {/* <div>
                          <select
                            name="student_ids"
                            className="form-control"
                            // onChange={(e) =>
                            //   getStudentsByTutorIdHandler(e.target.value)
                            // }
                            // value={event_tutor}
                            onChange={handleSelectChange}
                            multiple
                          >
                            <option disabled>Select Student</option>
                            { studentData.length > 0 && (
                              <>
                                {studentData?.map((item) => {
                                  return (
                                    <option value={item.id} 
                                            name={item.name} 
                                            selected={selectedStudents.includes(item.id)}
                                    >{item.name}</option>
                                  );
                                })}
                              </>
                            )}
                          </select>

                          <div className="pb-2">
                            <small style={{ color: "red" }}>
                              {error?.student_ids?.length ? error.student_ids[0] : <></>}
                            </small>
                          </div>

                          <div className="mt-2">
                            <label>Selected Students:</label>
                              <ul className="selected-students-list">
                                {selectedTextStudents.map((selected) => (
                                  <li key={selected.id} className="selected-student-tag">
                                    {selected.value}
                                    <button 
                                      className="remove-button" 
                                      onClick={() => handleRemoveStudent(selected.id)}
                                    >
                                      &times;
                                    </button>
                                  </li>
                                ))}
                              </ul>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <hr></hr>
                <div className="formbold-form-btn-wrapper">
                  <div className="btn-end">
                    <Link className="cancel" onClick={closeModal}>
                      Cancel
                    </Link>
                    <button
                      className="formbold-btn"
                      onClick={(e) => saveStudentGroup(e)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ReactModal>
        <ReactModal
          isOpen={showDeleteModal}
          onRequestClose={() => setShowDeleteModal(false)}
          style={customStyles}
          contentLabel="Delete Invoice Modal"
        >
          <div className="calendar-modal">
            <div
              className="close-h"
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              <button
                className="closeModal"
                style={{
                  backgroundColor: "transparent",
                  fontSize: "25px",
                  color: "red",
                }}
                onClick={()=>setShowDeleteModal(false)}
              >
                X
              </button>
            </div>
            <div className="calendar-date-time">
              <h3 className="fw-bold">Confirm Delete</h3>
              <div className="formbold-input-flex">
                <p>
                Are you sure you want to delete this group from your student group list?
                </p>
              </div>
              <hr />
              <div className="formbold-form-btn-wrapper">
                <div className="btn-end">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="cancel"
                  >
                    No
                  </button>
                  <button
                    onClick={(e) => deleteStudentGroup(e)}
                    className="formbold-btn"
                    style={{backgroundColor:'red'}}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ReactModal>
        <main className="content student">
        <ToastContainer />
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
                      {t("Students")}
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
                      {t("Groups")}
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
                                      {t("New Student")}
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link
                                      className="dropdown-item"
                                      to={"/students/import"}
                                    >
                                      <i
                                        className="fa fa-cloud-download"
                                        aria-hidden="true"
                                      ></i>
                                      {t("Import Students")}
                                    </Link>
                                  </div>
                                </>
                              )}
                            </div>
                            <div
                              className="dropdown addnew options"
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
                                      {t("New Email")}
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link
                                      className="dropdown-item"
                                      to="/students/message-history"
                                    >
                                      {t("Go to Message History")}{" "}
                                    </Link>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="dropdown options addnew">
                              <i className="fa fa-cog" aria-hidden="true"></i>

                              <a
                                className="btn dropdown-toggle"
                                role="button"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {t("Options")}
                              </a>

                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                              >
                                <a className="dropdown-item" href="#">
                                  {t("Action")}
                                </a>
                                <a className="dropdown-item" href="#">
                                  {t("Another action")}
                                </a>
                                <a className="dropdown-item" href="#">
                                  {t("Something else here")}
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-header">
                            {/* <div className="dropdown options">
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
                            </div> */}
                            {/* <div
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
                            </div> */}
                          </div>
                          <div className="card-body d-flex">
                            <div className="align-self-center w-100">
                              <FetchStudentDatatable />
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
                                role="button"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="true"
                                onClick={(e) => openModal("addStudentGroup")}
                              >
                                {t("Add Group")}
                              </a>

                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                              >
                                <a className="dropdown-item" href="#">
                                  {t("Action")}
                                </a>
                                <a className="dropdown-item" href="#">
                                  {t("Another action")}
                                </a>
                                <a className="dropdown-item" href="#">
                                  {t("Something else here")}
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="card-header">
                            {/* <div className="dropdown options">
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
                            </div> */}
                            {/* <div className="dropdown options">
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
                            </div> */}
                          </div>
                          <div className="card-body d-flex">
                            <div className="align-self-center w-100">
                              <FetchStudentGroupDatatable 
                                onEdit={handleEdit} 
                                onDelete={handleDelete} 
                              />
                              
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
