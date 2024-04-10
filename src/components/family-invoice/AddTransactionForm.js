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
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import {
  getFamilyAccounts,
  getFamilyAccountsDetails,
  saveTransaction,
  getInvoiceById,
  updateTransaction,
} from "../../services/invoiceService";
const AddTransactionForm = () => {
  const navigate = useNavigate();
  const [family_account_id, set_family_account_id] = useState();
  const [transaction_amount, set_transaction_amount] = useState();
  const [transaction_date, set_transaction_date] = useState();
  const [student_id, set_student_id] = useState();
  const [description, set_description] = useState();
  const [familiies, set_familiies] = useState([]);
  const [students, set_students] = useState([]);
  const { sidebarToggle } = useUserDataContext();
  const param = useParams();
  console.log(param);

  const getFamilyAccountsHandler = async () => {
    const responseFamilies = await getFamilyAccounts();
    set_familiies(responseFamilies?.data || []);

    if (param?.invoice_id) {
      const invoiceResponse = await getInvoiceById(param.invoice_id);
      if (invoiceResponse?.data) {
        const dataFamilies = responseFamilies.data.map((e) => {
          return { value: e.id, label: e.name };
        });
        const selectedFamilies = dataFamilies.filter(
          (f) => f.value == param.family_id
        );
        const accountDetailsResponse = await getFamilyAccountsDetails(
          selectedFamilies[0]?.value
        );
        set_transaction_date(invoiceResponse.data.invoice_start_date);
        set_students(accountDetailsResponse?.data?.students || []);
        set_family_account_id(selectedFamilies[0]);
      }
    } else {
      const dataFamilies = responseFamilies.data.map((e) => {
        return { value: e.id, label: e.name };
      });
      const selectedFamilies = dataFamilies.filter(
        (f) => f.value == param.family_id
      );
      const accountDetailsResponse = await getFamilyAccountsDetails(
        selectedFamilies[0]?.value
      );
      set_students(accountDetailsResponse?.data?.students || []);
      set_family_account_id(selectedFamilies[0]);
    }
  };

//   const getFamilyAccountsDetailsHandler = async (value) => {
//     set_student_id("");
//     set_students([]);
//     const response = await getFamilyAccountsDetails(value.value);
//     set_students(response.data.students);
//   };

  const saveTransactionHandler = async () => {
    const data = {
      family_account_id: family_account_id?.value || "",
      transaction_amount: transaction_amount,
      transaction_date: transaction_date,
      student_id: student_id?.value || "",
      transaction_type: param.type,
      description: description,
      invoice_id: param.invoice_id,
    };
    const response = await saveTransaction(data);
    if (response?.success == true) {
      set_family_account_id("");
      set_transaction_amount("");
      set_transaction_date("");
      set_student_id("");
      set_description("");
      toast.success(response?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(()=>{
        navigate("/familiies-and-invoices/family/" + param.family_id);
      },2000)
    } else {
      toast.error("something went wrong !", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const saveAndTransactionHandler = async () => {
    const data = {
      family_account_id: family_account_id?.value || "",
      transaction_amount: transaction_amount,
      transaction_date: transaction_date,
      student_id: student_id?.value || "",
      transaction_type: param.type,
      description: description,
    };
    const response = await saveTransaction(data);
    if (response?.success == true) {
      set_family_account_id("");
      set_transaction_amount("");
      set_transaction_date("");
      set_student_id("");
      set_description("");
      toast.success(response?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error("something went wrong !", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    getFamilyAccountsHandler();
  }, [param]);

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

        <div className="main bg-color">
          <TopBar />
          <main className="content student">
            <ToastContainer />
            <div className="container-fluid p-0">
              <div className="row d-flex">
                <div className="col-xl-12 col-xxl-12">
                  <div className={`card`}>
                    <div className="card-header">
                      <h5>Add Transaction</h5>
                    </div>
                    <div
                      className={`card-body contaner-area-min mb-2`}
                    >
                      <Link to={"/familiies-and-invoices"}>
                        <Icon icon={chevronLeft} /> Back To Family Account
                      </Link>
                      <div className="payment-type-box">
                        <div className="card card-body form-area">
                          <div className="row">
                            <div className="col-md-12">
                              <h4 style={{ textAlign: "left" }}>
                                Payment Details
                              </h4>
                            </div>
                          </div>
                          <div className="row">
                            {/* <div className="col-md-6">
                          <label>Family</label>
                          <Select value={family_account_id} onChange={(e)=>{set_family_account_id(e);getFamilyAccountsDetailsHandler(e);}} isMulti={false} options={[...familiies.map((e)=>{return {value:e.id,label:e.name}})]} />
                      </div> */}
                            <div className="col-md-12">
                              <label>Student(Optional)</label>
                              <Select
                                value={student_id}
                                onChange={(e) => {
                                  set_student_id(e);
                                }}
                                isMulti={false}
                                options={[
                                  ...students.map((e) => {
                                    return { value: e.id, label: e.name };
                                  }),
                                ]}
                              />
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-md-6">
                              <label>Date</label>
                              <input
                                type="date"
                                value={transaction_date}
                                onChange={(e) =>
                                  set_transaction_date(e.target.value)
                                }
                                className="form-control"
                                name=""
                              />
                            </div>
                            <div className="col-md-6">
                              <label>Amount</label>
                              <input
                                type="number"
                                value={transaction_amount}
                                onChange={(e) =>
                                  set_transaction_amount(e.target.value)
                                }
                                className="form-control"
                                name=""
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <label>Description</label>
                              <textarea
                                placeholder="This will appear on the invoice "
                                value={description}
                                onChange={(e) =>
                                  set_description(e.target.value)
                                }
                                className="form-control"
                                name=""
                              ></textarea>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-md-12">
                              <input type="checkbox" name="" />
                              <span className="ml-2">
                                Send an email receipt
                              </span>
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
                                  {!param?.id && (
                                    <button
                                      className="cancel"
                                      onClick={() => {
                                        saveAndTransactionHandler();
                                      }}
                                    >
                                      Save & Add Another
                                    </button>
                                  )}

                                  <button
                                    onClick={() => saveTransactionHandler()}
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

export default AddTransactionForm;
