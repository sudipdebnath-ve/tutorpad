import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import attendence from "../students/assets/images/attendance.svg";
import Loader from "../../Loader.js";
import { Link } from "react-router-dom";
import { API_URL } from "../../../utils/config.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";


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
    console.log('handleChange : ',name, value);
    setFormData({ ...formData, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    formData["user_id"] = userId;
    const config = {
      method: "POST",
      url: `${API_URL}student/${userId}/new-family-contact`,
      headers: {
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
        fetchStudentFamilyContact(userId);
        setAddFamilyContactModel(false);
      })
      .catch((error) => {
        console.log(error);
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
                  {/* <Link className="cancel" to="/students">
                    <i
                      className="fa fa-exchange"
                      aria-hidden="true"
                    ></i>
                    Change Family
                  </Link> */}

                  <button className="formbold-btn" onClick={() => setAddFamilyContactModel(true)}>
                    <i
                      className="fa fa-plus"
                      aria-hidden="true"
                    ></i>
                    Add Another Contact
                  </button>
                </div>
              </div>
            </>
          
        ) : (
              <>
                <div className="py-3">
                  <div className="chart chart-xs">
                    <img src={attendence} alt="attendence"></img>
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
              <h4>Add Family Contact</h4>
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
                          value={formData?.title}
                        />
                        <small style={{ color: "red" }}>
                          {error?.title?.length ? error.title[0] : <></>}
                        </small>
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <label
                          htmlFor="first_name"
                          className="formbold-form-label"
                          id="first_name"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          className="form-control"
                          onChange={handleChange}
                          value={formData?.first_name}
                          required
                        />
                        <small style={{ color: "red" }}>
                          {error?.first_name?.length ? error.first_name[0] : <></>}
                        </small>
                      </div>
                      <div>
                        <label
                          htmlFor="last_name"
                          className="formbold-form-label"
                          id="last_name"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          className="form-control"
                          onChange={handleChange}
                          value={formData?.last_name}
                          required
                        />
                        <small style={{ color: "red" }}>
                          {error?.last_name?.length ? error.last_name[0] : <></>}
                        </small>
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <label
                          htmlFor="email"
                          className="formbold-form-label"
                          id="email"
                        >
                          Email Address <span>Optional</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          onChange={handleChange}
                          value={formData?.email}
                        />
                        <small style={{ color: "red" }}>
                          {error?.email?.length ? error.email[0] : <></>}
                        </small>
                      </div>
                      <div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="formbold-form-label"
                            id="phone"
                          >
                            Phone Number <span>Optional</span>
                          </label>
                          <input
                            type="number"
                            name="phone"
                            className="form-control"
                            onChange={handleChange}
                            value={formData?.phone}
                          />
                          
                        </div>
                        <div  className="preference inputWithCheckbox">
                          <input
                            type="checkbox"
                            name="phone_sms"
                            value="This event repeats"
                            checked={phone_sms}
                            onChange={(e) =>
                              set_phone_sms(e.target.checked)
                            }
                          />
                          Allow SMS on your phone number
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <div>
                          <label
                            htmlFor="home_number"
                            className="formbold-form-label"
                            id="home_number"
                          >
                            Home Number <span>Optional</span>
                          </label>
                          <input
                            type="number"
                            name="home_number"
                            className="form-control"
                            onChange={handleChange}
                            value={formData?.home_number}
                          />
                          
                        </div>
                        <div  className="preference inputWithCheckbox">
                          <input
                            type="checkbox"
                            name="home_number_sms"
                            value="This event repeats"
                            checked={home_number_sms}
                            onChange={(e) =>
                              set_home_number_sms(e.target.checked)
                            }
                          />
                          Allow SMS on your home number
                        </div>
                      </div>
                      <div>
                        <div>
                          <label
                            htmlFor="work_number"
                            className="formbold-form-label"
                            id="work_number"
                          >
                            Work Number <span>Optional</span>
                          </label>
                          <input
                            type="number"
                            name="work_number"
                            className="form-control"
                            onChange={handleChange}
                            value={formData?.work_number}
                          />
                          
                        </div>
                        <div  className="preference inputWithCheckbox">
                          <input
                            type="checkbox"
                            name="work_number_sms"
                            value="This event repeats"
                            checked={work_number_sms}
                            onChange={(e) =>
                              set_work_number_sms(e.target.checked)
                            }
                          />
                          Allow SMS on your work number
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input-flex diff">
                      <div>
                        <label
                          htmlFor="address"
                          className="formbold-form-label"
                        >
                          Address <span>Optional</span>
                        </label>
                        <br></br>

                        <textarea
                          name="address"
                          className="form-control"
                          onChange={handleChange}
                          value={formData?.address}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="private_note"
                          className="formbold-form-label"
                        >
                          Private Note <span>Optional</span>
                        </label>
                        <br></br>

                        <textarea
                          name="private_note"
                          className="form-control"
                          onChange={handleChange}
                          value={formData?.private_note}
                        />
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <div
                          className="preference"
                          style={{ fontSize: "15px" }}
                        >
                          <input
                            type="checkbox"
                            name="preferred_invoice_recipient"
                            value="This event repeats"
                            checked={preferred_invoice_recipient}
                            onChange={(e) =>
                              set_preferred_invoice_recipient(e.target.checked)
                            }
                          />
                          Preferred invoice recipient
                        </div>
                        <div
                          className="preference"
                          style={{ fontSize: "15px" }}
                        >
                          <input
                            type="checkbox"
                            name="student_portal_contacts"
                            value="This event repeats"
                            checked={student_portal_contacts}
                            onChange={(e) =>
                              set_student_portal_contacts(e.target.checked)
                            }
                          />
                          Receive student portal updates
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
                            value="This event repeats"
                            checked={email_lesson_reminders}
                            onChange={(e) =>
                              set_email_lesson_reminders(e.target.checked)
                            }
                          />
                          Receive lesson reminders via email
                        </div>
                        <div
                          className="preference"
                          style={{ fontSize: "15px" }}
                        >
                          <input
                            type="checkbox"
                            name="sms_lesson_reminders"
                            value="This event repeats"
                            checked={sms_lesson_reminders}
                            onChange={(e) =>
                              set_sms_lesson_reminders(e.target.checked)
                            }
                          />
                          Receive lesson reminders via SMS
                        </div>
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
            </form>
          </div>
        </ReactModal>
    </div>
  );
};

export default FetchStudentFamilyContactDatatable;
