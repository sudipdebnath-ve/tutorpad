import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import Select from "react-select";
import { Link, useParams, useNavigate } from "react-router-dom";
import { chevronLeft } from "react-icons-kit/feather/chevronLeft";
import { Icon } from "react-icons-kit";
import { ToastContainer, toast } from "react-toastify";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import { Editor } from "@tinymce/tinymce-react";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import {
  getFamilyAccountsDetails,
  sendEmail,
  getInvoiceById,
} from "../../services/invoiceService";
const SendInvoiceEmail = () => {
  const navigate = useNavigate();
  const [bcc, set_bcc] = useState("0");

  const [family_name, set_family_name] = useState("");
  const [to_email, set_to_email] = useState("");
  const [invoice_details, set_invoice_details] = useState({});
  const { sidebarToggle, fetchData, userData } = useUserDataContext();
  const param = useParams();
  console.log(param);
  const [message, setMessage] = useState("");
  const editorRef = useRef(null);

  const [selectedTemplate, setSelectedTemplate] = useState("invoice_email");
  // Default selected template

  const templates = {
    invoice_email: {
      subject: "Your Invoice",
      message: `<p>Dear ${family_name},</p><p>Attached, you will find a copy of your invoice. Please provide payment at your earliest convenience.</p><p>Sincerely,</p><p>${userData.first_name}</p><p>${userData.name}</p>`,
    },
    invoice_reminder: {
      subject: "Invoice Reminder",
      message: `<p>Dear ${family_name},</p><p>This is a reminder that your invoice dated ${
        invoice_details?.invoice_create_date
      } for ₹ ${invoice_details?.amount?.toFixed(
        2
      )} is now overdue; a copy is attached. Please provide payment at your earliest convenience.</p><p>If you've already sent payment, please disregard this message.</p><p>Sincerely,</p><p>${
        userData.first_name
      }</p><p>${userData.name}</p>`,
    },
  };

  const [subject, set_subject] = useState(templates[selectedTemplate].subject);
  const handleRadioChange = (e) => {
    setSelectedTemplate(e.target.value);
    set_subject(templates[e.target.value].subject);
  };

  const getFamilyAccountsDetailsHandler = async () => {
    if (param?.family_id) {
      const response = await getFamilyAccountsDetails(param.family_id);
      if (response?.data) {
        const accountDetails = response.data;
        set_to_email(accountDetails.email);
        set_family_name(accountDetails.name);
      }
    }
  };

  const getInvoiceDetailsById = async () => {
    if (param?.invoice_id) {
      const response = await getInvoiceById(param.invoice_id);
      if (response?.data) {
        set_invoice_details(response.data);
      }
    }
  };

  const sendEmailHandler = async () => {
    const data = {
      email_from: userData?.email,
      email_to: to_email,
      bcc: bcc,
      template: selectedTemplate === "invoice_email" ? "1" : "2",
      subject: subject,
      message: message,
    };
    const response = await sendEmail(data, param.invoice_id);
    if (response?.success == true) {
      toast.success(response?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        navigate("/familiies-and-invoices/family/" + param.family_id);
      }, 2000);
    } else {
      toast.error("something went wrong !", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  // useEffect(() => {
  //   getFamilyAccountsHandler();
  // }, [param]);

  useEffect(() => {
    fetchData();
    getFamilyAccountsDetailsHandler();
    getInvoiceDetailsById();
  }, [param]);

  console.log(userData);

  return (
    <>
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
          <main className="content student">
            <ToastContainer />
            <div className="container-fluid p-0">
              <div className="row d-flex">
                <div className="col-xl-12 col-xxl-12">
                  <div className={`card`}>
                    <div className="card-header">
                      <h5>Send Invoice</h5>
                    </div>
                    <div className={`card-body contaner-area-min mb-2`}>
                      <Link to={"/familiies-and-invoices"}>
                        <Icon icon={chevronLeft} /> Back To Family Account
                      </Link>
                      <div className="payment-type-box">
                        <div className="card card-body form-area">
                          <div className="row">
                            <div className="col-md-12">
                              <h4 style={{ textAlign: "left" }}>
                                Send Invoice
                              </h4>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <label>Form</label>
                              <input
                                name="form_email"
                                value={userData.email}
                                className="form-control"
                                disabled
                              />
                            </div>
                            <div className="col-md-12">
                              <label>To</label>
                              <input
                                name="to_email"
                                value={to_email}
                                className="form-control"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-md-12">
                              <input
                                type="checkbox"
                                name="bcc"
                                value={bcc}
                                onChange={(e) => set_bcc(e.target.value)}
                              />
                              <span className="ml-2">BCC me on this email</span>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <span className="fw-bold m-0">Template</span>
                            <div className="col-md-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="template"
                                value="invoice_email"
                                checked={selectedTemplate === "invoice_email"}
                                onChange={handleRadioChange}
                              />
                              <label className="form-check-label ml-2">
                                Invoice Email
                              </label>
                            </div>
                            <div className="col-md-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="template"
                                value="invoice_reminder"
                                checked={
                                  selectedTemplate === "invoice_reminder"
                                }
                                onChange={handleRadioChange}
                              />
                              <label className="form-check-label ml-2">
                                Invoice Remainder
                              </label>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-12">
                              <label>Subject</label>
                              <input
                                type="text"
                                className="form-control"
                                name="subject"
                                value={subject}
                                onChange={(e) => set_subject(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <label>Message</label>
                              <Editor
                                apiKey="pz9f1zsrw3kqfmqecr5si4gbtfljkwc6nhqicfr9dstcvmdn"
                                initialValue={
                                  templates[selectedTemplate].message
                                }
                                init={{
                                  height: 500,
                                  menubar: false,
                                  plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount",
                                  ],
                                  toolbar:
                                    "undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help",
                                }}
                                onEditorChange={(content) =>
                                  setMessage(content)
                                }
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-12">
                              <div className="formbold-form-btn-wrapper">
                                <div className="btn-end">
                                  <Link
                                    className="cancel"
                                    to={
                                      "/familiies-and-invoices/family/" +
                                      param.family_id
                                    }
                                  >
                                    Back
                                  </Link>
                                  <Link
                                    className="cancel"
                                    to={
                                      "/familiies-and-invoices/family/" +
                                      param.family_id
                                    }
                                  >
                                    Cancel
                                  </Link>
                                  <button
                                    onClick={() => sendEmailHandler()}
                                    className="formbold-btn"
                                  >
                                    Save
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
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SendInvoiceEmail;
