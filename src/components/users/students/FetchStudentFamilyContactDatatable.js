import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import attendence from "../students/assets/images/attendance.svg";
import Loader from "../../Loader.js";
import { Link } from "react-router-dom";
import { API_URL } from "../../../utils/config.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const FetchStudentFamilyContactDatatable = ({ userId }) => {
  const [val, setVal] = useState(false);
  const [addFamilyContactModel, setAddFamilyContactModel] = useState(false);
  const [phone_sms, set_phone_sms] = useState(false);
  const [home_number_sms, set_home_number_sms] = useState(false);
  const [work_number_sms, set_work_number_sms] = useState(false);
  const [preferred_invoice_recipient, set_preferred_invoice_recipient] = useState(false);
  const [student_portal_contacts, set_student_portal_contacts] = useState(false);
  const [email_lesson_reminders, set_email_lesson_reminders] = useState(false);
  const [sms_lesson_reminders, set_sms_lesson_reminders] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [isEditId, setIsEditId] = useState("");
  const { 
    fetchStudentFamilyContact,
    studentFamilyContact,
    token
  } = useUserDataContext();
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    phone_sms: "0",
    home_number: "",
    home_number_sms: "0",
    work_number: "",
    work_number_sms: "0",
    address: "",
    private_note: "",
    preferred_invoice_recipient: "0",
    student_portal_contacts: "0",
    email_lesson_reminders: "0",
    sms_lesson_reminders: "0",
  });

  useEffect(() => {
    fetchStudentFamilyContact(userId);
  }, []);

  const columns = [
    { 
      field: "title", 
      headerName: "Title", 
      width: 130,
    },
    {
      field: "name",
      headerName: "Name",
      width: 130,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 130,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 130,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
      editable: true,
    },
    {
      field: "private_note",
      headerName: "Private Note",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const customStyles = {
    content: {
      width: "60%",
      height: "80%",
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

  useEffect(() => {
    setVal(true);
  }, [studentFamilyContact]);
  if (val) {
    var rows = studentFamilyContact;
  } 

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (row) => {
    setIsEditId(row.id);
    setIsFormEdit(true);

    set_phone_sms(row.phone_sms);
    set_home_number_sms(row.home_number_sms);
    set_work_number_sms(row.work_number_sms);
    set_preferred_invoice_recipient(row.preferred_invoice_recipient);
    set_student_portal_contacts(row.student_portal_contacts);
    set_email_lesson_reminders(row.email_lesson_reminders);
    set_sms_lesson_reminders(row.sms_lesson_reminders);

    setFormData(row);
    setAddFamilyContactModel(true);
  };

  const handleDelete = async (id) => {
    const config = {
      method: "DELETE",
      url: `${API_URL}student/${userId}/family-contact/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(config)
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchStudentFamilyContact(userId);
      })
      .catch((error) => {
        toast.error("Failed to delete contact", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    formData["user_id"] = userId;
    formData["phone_sms"] = phone_sms;
    formData["home_number_sms"] = home_number_sms;
    formData["work_number_sms"] = work_number_sms;
    formData["preferred_invoice_recipient"] = preferred_invoice_recipient;
    formData["student_portal_contacts"] = student_portal_contacts;
    formData["email_lesson_reminders"] = email_lesson_reminders;
    formData["sms_lesson_reminders"] = sms_lesson_reminders;
    let urlData = "";
    let methodData = "";
    if(!isFormEdit){
      urlData = `${API_URL}student/${userId}/new-family-contact`;
      methodData = "POST";
    }else{
      urlData = `${API_URL}student/${userId}/family-contact/${isEditId}`;
      methodData = "PATCH";
    }
    const config = {
      method: methodData,
      url: urlData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    };
    await axios(config)
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchStudentFamilyContact(userId);
        setAddFamilyContactModel(false);

        setFormData({
          title: "",
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          phone_sms: "0",
          home_number: "",
          home_number_sms: "0",
          work_number: "",
          work_number_sms: "0",
          address: "",
          private_note: "",
          preferred_invoice_recipient: "0",
          student_portal_contacts: "0",
          email_lesson_reminders: "0",
          sms_lesson_reminders: "0",
        });
        setIsEditId("");
        setIsFormEdit(false);

        set_phone_sms(false);
        set_home_number_sms(false);
        set_work_number_sms(false);
        set_preferred_invoice_recipient(false);
        set_student_portal_contacts(false);
        set_email_lesson_reminders(false);
        set_sms_lesson_reminders(false);
      })
      .catch((error) => {
        if (error.response.data.success === false) {
          setError(error.response.data.data);
        }
      });
  };

  return (
    <div>
      <>
        {rows && studentFamilyContact.length > 0 ? (
          <>
            <div className="py-3">
              <div className="chart chart-xs">
                <Box
                  sx={{
                    height: 400,
                    width: "100%",
                  }}
                >
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                      toolbar: {
                        showQuickFilter: true,
                      },
                    }}
                  />
                </Box>
              </div>
            </div>
            <div className="formbold-form-btn-wrapper">
              <div className="btn-end">
                <button className="formbold-btn" onClick={() => setAddFamilyContactModel(true)}>
                  <i className="fa fa-plus" aria-hidden="true"></i>
                  Add Another Contact
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="py-3">
              <div className="chart chart-xs">
                <img src={attendence} alt="attendance"></img>
              </div>
            </div>
            <h5 className="my-1" style={{ textAlign: "center" }}>
              <strong>
                No family contacts found.
              </strong>
            </h5>
            <p style={{ textAlign: "center" }}>
              Click the "Add New Contact" button to enter contact details.
            </p>
            <div className="student">
              <div className="align-self-center w-100">
                <div className="addnewstudent addnew" style={{ width: 190 }}>
                  <div onClick={() => setAddFamilyContactModel(true)}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    <a className="btn" role="button" >
                      Add New Contact
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
      <ReactModal
        isOpen={addFamilyContactModel}
        onRequestClose={() => setAddFamilyContactModel(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="mypreference-modal">
          <div className="close-h">
            <h4>
                {isFormEdit ? "Edit Family Contact" : "Add Family Contact"}
            </h4>
            <button className="closeModal" onClick={() => setAddFamilyContactModel(false)}>
              X
            </button>
          </div>
          <form name="studentProfile">
            <div className="row d-flex">
              <div className="formbold-form-step-1 active">
                <div className="formbold-input-flex diff">
                  <div>
                    <label htmlFor="title" className="formbold-form-label">
                      Title <span>Optional</span>
                    </label>

                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      onChange={handleChange}
                      value={formData.title}
                    />
                  </div>

                  <div>
                    <label htmlFor="first_name" className="formbold-form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      className="form-control"
                      onChange={handleChange}
                      value={formData.first_name}
                    />
                    {error.first_name && (
                      <span style={{ color: "red", fontSize: "12px" }}>{error.first_name}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="last_name" className="formbold-form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      className="form-control"
                      onChange={handleChange}
                      value={formData.last_name}
                    />
                    {error.last_name && (
                      <span style={{ color: "red", fontSize: "12px" }}>{error.last_name}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="formbold-form-label">
                      Email Address
                    </label>
                    <input
                          type="email"
                      name="email"
                      className="form-control"
                      onChange={handleChange}
                      value={formData.email}
                    />
                    {error.email && (
                      <span style={{ color: "red", fontSize: "12px" }}>{error.email}</span>
                    )}
                  </div>
                </div>

                <div className="formbold-input-flex diff">
                  <div>
                    <label htmlFor="phone" className="formbold-form-label">
                      Phone Number
                    </label>
                    <input
                            type="number"
                      name="phone"
                      className="form-control"
                      onChange={handleChange}
                      value={formData.phone}
                    />
                    {error.phone && (
                      <span style={{ color: "red", fontSize: "12px" }}>{error.phone}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="home_number" className="formbold-form-label">
                      Home Number
                    </label>
                    <input
                            type="number"
                      name="home_number"
                      className="form-control"
                      onChange={handleChange}
                      value={formData.home_number}
                    />
                    {error.home_number && (
                      <span style={{ color: "red", fontSize: "12px" }}>{error.home_number}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="work_number" className="formbold-form-label">
                      Work Number
                    </label>
                    <input
                            type="number"
                      name="work_number"
                      className="form-control"
                      onChange={handleChange}
                      value={formData.work_number}
                    />
                    {error.work_number && (
                      <span style={{ color: "red", fontSize: "12px" }}>{error.work_number}</span>
                    )}
                  </div>
                </div>
                <div className="formbold-input-flex diff">
                  <div>
                    <label htmlFor="address" className="formbold-form-label">
                      Address
                    </label>
                    <textarea
                      name="address"
                      className="form-control"
                      rows="5"
                      onChange={handleChange}
                      value={formData.address}
                    />
                    {error.address && (
                      <span style={{ color: "red", fontSize: "12px" }}>{error.address}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="private_note" className="formbold-form-label">
                      Private Note
                    </label>
                    <textarea
                      name="private_note"
                      className="form-control"
                      rows="5"
                      onChange={handleChange}
                      value={formData.private_note}
                    />
                    {error.private_note && (
                      <span style={{ color: "red", fontSize: "12px" }}>{error.private_note}</span>
                    )}
                  </div>
                </div>

                <div className="formbold-input mb-5">

                  <div>
                      <div
                        className="preference"
                        style={{ fontSize: "15px" }}
                      >
                      <input
                        type="checkbox"
                        name="phone_sms"
                        id="supportCheckbox2"
                        className="formbold-input-checkbox"
                        onChange={() => set_phone_sms(phone_sms ? false : true)}
                        checked={phone_sms}
                      />
                    SMS Lesson Reminders to Phone Number
                    </div>
                  </div>
                  
                  <div>
                      <div
                        className="preference"
                        style={{ fontSize: "15px" }}
                      >
                      <input
                        type="checkbox"
                        name="home_number_sms"
                        id="supportCheckbox3"
                        className="formbold-input-checkbox"
                        onChange={() =>
                          set_home_number_sms(home_number_sms ? false : true)
                        }
                        checked={home_number_sms}
                      />
                    SMS Lesson Reminders to Home Number
                    </div>
                  </div>

                  <div>
                      <div
                        className="preference"
                        style={{ fontSize: "15px" }}
                      >
                      <input
                        type="checkbox"
                        name="work_number_sms"
                        id="supportCheckbox4"
                        className="formbold-input-checkbox"
                        onChange={() =>
                          set_work_number_sms(work_number_sms ? false : true)
                        }
                        checked={work_number_sms}
                      />
                    SMS Lesson Reminders to Work Number
                    </div>
                  </div>

                  <div>
                      <div
                        className="preference"
                        style={{ fontSize: "15px" }}
                      >
                      <input
                        type="checkbox"
                        name="email_lesson_reminders"
                        id="supportCheckbox5"
                        className="formbold-input-checkbox"
                        onChange={() =>
                          set_email_lesson_reminders(
                            email_lesson_reminders ? false : true
                          )
                        }
                        checked={email_lesson_reminders}
                      />
                    Email Lesson Reminders
                    </div>
                  </div>

                  <div>
                      <div
                        className="preference"
                        style={{ fontSize: "15px" }}
                      >
                      <input
                        type="checkbox"
                        name="sms_lesson_reminders"
                        id="supportCheckbox6"
                        className="formbold-input-checkbox"
                        onChange={() =>
                          set_sms_lesson_reminders(
                            sms_lesson_reminders ? false : true
                          )
                        }
                        checked={sms_lesson_reminders}
                      />
                    SMS Lesson Reminders
                    </div>
                  </div>

                  <div>
                      <div
                        className="preference"
                        style={{ fontSize: "15px" }}
                      >
                        <input
                          type="checkbox"
                          name="preferred_invoice_recipient"
                          id="supportCheckbox"
                          className="formbold-input-checkbox"
                          onChange={() =>
                            set_preferred_invoice_recipient(
                              preferred_invoice_recipient ? false : true
                            )
                          }
                          checked={preferred_invoice_recipient}
                        
                        />                    
                        Preferred Invoice Recipient
                      </div>
                  </div>

                  <div>
                      <div
                        className="preference"
                        style={{ fontSize: "15px" }}
                      >
                      <input
                        type="checkbox"
                        name="student_portal_contacts"
                        id="supportCheckbox1"
                        className="formbold-input-checkbox"
                        onChange={() =>
                          set_student_portal_contacts(
                            student_portal_contacts ? false : true
                          )
                        }
                        checked={student_portal_contacts}
                      />
                    Student Portal Contacts
                    </div>
                  </div>

                </div>

                <hr></hr>
                <div className="formbold-form-btn-wrapper">
                  <div className="btn-end">
                    <Link className="cancel" onClick={() => setAddFamilyContactModel(false)}>
                      Cancel
                    </Link>
                    <button className="formbold-btn" onClick={formSubmit}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </ReactModal>
    </div>
  );
};

export default FetchStudentFamilyContactDatatable;
