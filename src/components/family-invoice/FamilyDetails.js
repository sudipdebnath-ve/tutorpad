import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import instructors from "../users/assets/images/Instructors.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import FetchChargeCategoryDatatable from "./FetchFamilyInvoiceDatatable.js";
import Loader from "../Loader.js";
import "../users/assets/css/customDatepicker.css";
import Modal from 'react-modal'; 
import { Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import Invoice from "./Invoice.js";
import Family from "./Family.js";
import Transaction from "./Transaction.js";
import Select from "react-select";
import {user} from 'react-icons-kit/feather/user';
import { Icon } from 'react-icons-kit'; 
import {settings} from 'react-icons-kit/feather/settings';
import {mail} from 'react-icons-kit/feather/mail';
import {ic_receipt_outline} from 'react-icons-kit/md/ic_receipt_outline';
import TransactionByFamily from "./TransactionByFamily.js";
import { getFamilyAccountsDetails, disableAutoInvoicesTransaction } from "../../services/invoiceService.js";
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import { Icon as ReactIcon  } from 'react-icons';

const FamilyDetails = () => {
  const {sidebarToggle,allFamilies } = useUserDataContext();
  const param = useParams();
  const navigate = useNavigate();
  const [selectedFamily,setSelectedFamily] = useState();
  const [students,setStudents] = useState([]);
  const [family, set_family] = useState({});
  const [isAutoInvoicing,setIsAutoInvoicing] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const onChangeSelectFamiliyHandler = (e)=>{
    setSelectedFamily(e);
    navigate('/familiies-and-invoices/family/'+e.value);
  }
  const getFamilyAccountsDetailsHandler = async()=>{
    const response = await getFamilyAccountsDetails(param.id);
    console.log("response of a student------------->",response.data.students);
    console.log("response of a family-------------->",response.data);
    set_family(response?.data);
    setStudents(response?.data?.students||[]);
    setIsAutoInvoicing(response?.data?.auto_invoicing || 0);
  }

  const disableAutoInvoicesTransactionHandler = async()=>{
    try {
      // Call the API function to disable auto-invoicing
      const response = await disableAutoInvoicesTransaction(param.id);
      console.log("Disable auto-invoicing response:", response);
      setIsDisabled(true);
      handleCloseModal();
    } catch (error) {
      console.error('Error disabling auto-invoicing:', error);
      setError(error.response.data.message); // Set error message
    }
  }


  useEffect(()=>{
    const familiyData = allFamilies.filter((f)=>f.id==param.id);
    const familySelectedData = familiyData.map((e)=>{return {label:e.name,value:e.id}});
    setIsAutoInvoicing(familiyData[0]?.auto_invoicing);
    setSelectedFamily(...familySelectedData);
    getFamilyAccountsDetailsHandler();
  },[param, isDisabled])

//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             // Fetch auto-invoicing data from the backend
//             const response = await getFamilyAccountsDetails(param.id);
//             const autoInvoicingStatus = response?.data?.auto_invoicing || 0; // Assuming auto_invoicing is a boolean value
//             setIsAutoInvoicing(autoInvoicingStatus);
//             setSelectedFamily({ label: response?.data?.name, value: response?.data?.id }); // Update selected family data if needed
//             set_family(response?.data); // Update family details data if needed
//             setStudents(response?.data?.students || []);
//         } catch (error) {
//             console.error('Error fetching auto-invoicing data:', error);
//             // Handle error
//         }
//     };

//     fetchData(); // Call the fetch data function
// }, [param.id]);


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
              <div className="col-xl-4 col-xxl-4">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <Link to={"/familiies-and-invoices"}>{`<`} Back To family & Invoice</Link>
                        <Select value={selectedFamily}  onChange={(e)=>onChangeSelectFamiliyHandler(e)} isMulti={false} options={[...allFamilies.map((e)=>{return {label:e.name,value:e.id}})]} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <h6 style={{textAlign:'center',marginTop:'10px',marginBottom:'10px'}}><strong>Family Details</strong></h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label>Students</label>
                        <ul>
                          {
                            students.map((e)=>{
                              return <li><Link to={"/"}><Icon icon={user} /> {e?.name||""} </Link><span style={{background:`${e?.status_color}`,padding:'2px 5px',color:'white'}}>{e?.status_label}</span></li>
                            })
                          }
                          
                        </ul>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label>Family Contact</label>
                        <ul>
                          <li><Link to={"/"}><Icon icon={user} /> {selectedFamily?.label||""} </Link><span style={{background:'lightblue',padding:'2px 5px',color:'white'}}>Invoice Recipient</span></li>
                        </ul>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label><Icon icon={ic_receipt_outline}/> Next Invoice XYZ</label>
                        <div style={{lineHeight:'0px',fontSize:10}}>
                          <p>Invoice Date: {family.invoice_create_date}</p>
                          <p>Date Range: 01-04-2024 to 30-04-2024</p>
                          <p>Invoice Date: 01-04-2024</p>
                          <p>Total Due: <span style={{background:'red',padding:'2px 5px',color:'white'}}>₹ 100.00 balance owing</span></p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label><Icon icon={settings}/> Auto-Invoice Settings</label>
                        <div style={{lineHeight:'1.2',fontSize:10}}>
                          <p>{family.is_prepaid_invoice === 0 ? 'Prepaid Lessons' : 'Postpaid Lessons'}</p>
                          <p>Repeats: The 1st of the month every 1 month</p>
                          <p>Balance Forward:
                              <span style={{minWidth:'50px',padding:'2px 5px',background: family.balance_forward === 1 ? 'lightgreen' : 'red',textAlign:'center',color:'white'}}>
                              {family.balance_forward === 1 ? 'Enabled' : 'Disabled'}
                              </span>
                          </p>
                          {/* <p>Balance Forward: {family.balance_forward} <span style={{minWidth:'50px',padding:'2px 5px',background:'lightgreen',textAlign:'center',color:'white'}}>
                                                Enabled
                                              </span>
                          </p> */}
                          <p>Auto-Email: 
                              <span style={{minWidth:'50px',padding:'2px 5px',background: family.auto_email===1 ?"lightgreen":'red',textAlign:'center',color:'white'}}>
                              {family.auto_email === 1 ? 'Enabled' : 'Disabled'}
                              </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                      {
                        isAutoInvoicing==1 && <><div className="col-md-12">
                                              <Link to = {"/familiies-and-invoices/autoinvoice-formdetails/"+param.id}>
                                              <button className="btn btn-md btn-info form-control"><Icon icon={settings} style={{color:'white',marginRight:5}} />Edit Auto-Invoice Settings</button>
                                              </Link>
                                            </div>
                                            <div style={{marginTop:5}} className="col-md-12">
                                              <button className="btn btn-md btn-danger form-control" onClick={handleShowModal}><Icon icon={mail} style={{color:'white',marginRight:5}} />Disable Auto-Invoicing</button>
                                            </div>

                                    <BootstrapModal show={showModal} onHide={handleCloseModal}>
                                        <BootstrapModal.Header closeButton>
                                            <BootstrapModal.Title >Disable Auto-Invoicing</BootstrapModal.Title>
                                            </BootstrapModal.Header>
                                            <BootstrapModal.Body>
                                              <p >Are you sure you want to disable auto-invoicing? The selected family will no longer receive auto-invoices and you will have to send them manually.</p>
                                            </BootstrapModal.Body>
                                            <BootstrapModal.Footer>
                                              <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                                              <Button variant="primary" onClick={disableAutoInvoicesTransactionHandler} >Disable auto invoicing</Button>
                                            </BootstrapModal.Footer>
                                          </BootstrapModal>
                                            </>
                      }
                      {
                        isAutoInvoicing==0 && <div className="col-md-12">
                                              <Link to = {"/familiies-and-invoices/autoinvoice-formdetails/"+param.id}>
                                              <button className="btn btn-md btn-info form-control"><Icon icon={settings} style={{color:'white',marginRight:5}} />Enable Auto-Invoice</button>
                                              </Link>
                                             </div>
                      }
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-xxl-8">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="transaction-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#transaction"
                      type="button"
                      role="tab"
                      aria-controls="transaction"
                      aria-selected="true"
                    >
                      Transaction
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="invoice-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#invoice"
                      type="button"
                      role="tab"
                      aria-controls="invoice"
                      aria-selected="true"
                    >
                      Invoice
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="transaction"
                    role="tabpanel"
                    aria-labelledby="transaction-tab"
                  >
                    <TransactionByFamily/>
                    
                  </div>
                  <div
                    className="tab-pane fade"
                    id="invoice"
                    role="tabpanel"
                    aria-labelledby="invoice-tab"
                  >
                    <Invoice/>
                    
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
                              <div className="py-3">
                                <div className="chart chart-xs">
                                  <img src={instructors}></img>
                                </div>
                              </div>
                              <h4>
                                <strong>You don't have any Groups yet</strong>
                              </h4>
                              <p style={{ textAlign: "center" }}>
                                Keep your tutors organized by assigning them
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

export default FamilyDetails;
