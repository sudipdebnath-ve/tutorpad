import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import instructors from "../users/assets/images/Instructors.svg";
import { Link } from "react-router-dom";
import FetchChargeCategoryDatatable from "./FetchChargeCategoryDatatable.js";
import Loader from "../Loader.js";
import "../users/assets/css/customDatepicker.css";
import Modal from 'react-modal';
import { Spinner } from 'react-bootstrap';
import { createChargeCategories,updateChargeCategories } from "../../services/categoriesService.js";
import { ToastContainer, toast } from "react-toastify";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const ChargeCategory = () => {
  const { fetchChargeCategory,sidebarToggle, loading } = useUserDataContext();
  const [addNewDropdown, setAddNewDropdown] = useState(false);
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [isEdit,setIsEdit] = useState(false);
  const [chargecat_name,set_chargecat_name] = useState("");
  const [selectedId,setSelectedId] = useState("");
  const handleClickAddNew = (e) => {
    if (addNewDropdown == false) {
      setAddNewDropdown(true);
    } else {
      setAddNewDropdown(false);
    }
  };

  const onSubmitHandler = async ()=>{
    setIsLoading(true);
    if(isEdit)
    {
      const response = await updateChargeCategories({chargecat_name},selectedId);
      if (response.success == true) {
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchChargeCategory();
        setIsLoading(false);
        setModalIsOpen(false);
      }else{
        setIsLoading(false);
        toast.error(JSON.stringify(response.response.data.data), {
          position: toast.POSITION.TOP_CENTER,
        })
        
      }
    }else{
      const response = await createChargeCategories({chargecat_name});
      if (response.success == true) {
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchChargeCategory();
        setIsLoading(false);
        setModalIsOpen(false);
      }else{
        setIsLoading(false);
        toast.error(JSON.stringify(response.response.data.data), {
          position: toast.POSITION.TOP_CENTER,
        })
        
      }
    }
    
  }
  const onCancel = ()=>{
    set_chargecat_name("");
    setModalIsOpen(false);
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
                      Charge Categories
                    </button>
                  </li>
                </ul>
                <Modal
                      isOpen={modalIsOpen}
                      style={customStyles}
                      contentLabel="Delete Item"
                  >
                
                    
                      <div className="row">
                        <div className="col-md-12">
                          <label>Category Name</label>
                          <input type="text" value={chargecat_name} onChange={(e)=>set_chargecat_name(e.target.value)} className="form-control" name="chargecat_name" />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-4">
                          {
                            isLoading ?(<button className="btn btn-md btn-info">
                                          <Spinner size="sm"/>
                                        </button>):(<button onClick={()=>onSubmitHandler()} className="btn btn-md btn-info">Save</button>)
                          }
                        </div>
                        <div className="col-md-4">
                            <button onClick={()=>onCancel()} className="btn btn-md btn-warning">Cancel</button>
                        </div>
                      </div>
                 
                </Modal>
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
                              onClick={()=>{set_chargecat_name("");setModalIsOpen(true);setIsEdit(false)}}
                            >
                              <i className="fa fa-plus" aria-hidden="true"></i>
                              <a className="btn">Add New</a>
                            </div>
                          </div>
                          <div className="card-body d-flex">
                            <div className="align-self-center w-100">
                              <FetchChargeCategoryDatatable setIsEdit={setIsEdit} setModalIsOpen={setModalIsOpen} set_chargecat_name={set_chargecat_name} setSelectedId={setSelectedId} />
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

export default ChargeCategory;
