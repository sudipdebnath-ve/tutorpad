import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import students from "../users/assets/images/students.svg";
import Loader from "../Loader.js";
import { Link } from "react-router-dom"
import { Icon } from 'react-icons-kit';
import {edit2} from 'react-icons-kit/feather/edit2';
import {trash2} from 'react-icons-kit/feather/trash2';



import { useNavigate } from "react-router-dom";
import DeleteModel from "../form/delete-model/DeleteModel.js";
import { ToastContainer, toast } from "react-toastify";
import { deleteChargeCategories } from "../../services/categoriesService.js";
import FloatingMenus from "./FloatingMenus.js";
const FetchInvoicesDatatable = ({setSelectedId,set_chargecat_name,setModalIsOpen,setIsEdit,id}) => {
  
  const [val, setVal] = useState(false);
  
  const { fetchInvoices, userId, setLoading, loading, accountInvoices } =
    useUserDataContext();
  const [deleteId,setDeleteId] = useState(null);
  const [deleteModalIsOpen,setDeleteModalIsOpen] = useState(false);
  const [isDeleteLoading,setIsDeleteLoading] = useState(false);
  
  const [isMenuOpenId,setIsMenuOpenId] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetchInvoices(id);
  }, [userId]);



  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "invoice_create_date",
      headerName: "Invoice Date",
      width: '150',
    //   renderCell: (params) => (
    //     <Link to={`/familiies-and-invoices/family/${params.row.id}`}>
    //       {params.row.name}
    //     </Link>
    //   ),
      editable: true,
    },
    {
      field: "date_range",
      headerName: "Date Range",
      width: 200,
      renderCell: (params) => (
        `${params.row.invoice_start_date} - ${params.row.invoice_end_date}`
      ),
    },
    {
      field: "private_note",
      headerName: "Private Note",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      renderCell: (params) => (
        params.row.amount==0?(<div style={{minWidth:'50px',padding:'0 5px',background:'lightgreen',textAlign:'center',color:'white'}}>
                              ₹ {params.row.amount}
                            </div>
                          ):(<div style={{minWidth:'50px',padding:'0 5px',background:'red',textAlign:'center',color:'white'}}>
                          -₹ {params.row.amount}
                        </div>)
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
      <div style={{position:'absolute'}}>
        { params.row.id ==isMenuOpenId && <FloatingMenus id={params.row.id} onMouseLeave={()=>setIsMenuOpenId(0)}  /> } 
       <div style={{display:'flex',gap:5}} className="dropdown">
        <button 
        style={{border:'none',backgroundColor:'transparent'}}
        onClick={()=>setIsMenuOpenId(params.row.id)}
        >
        <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
       </div>
       </div>
      ),
    }
  ];

  const onDeleteModelHandler = (id)=>{
    setDeleteId(id);
    setDeleteModalIsOpen(true);
  }

  const onDeleteHandler = async (id)=>{
    setIsDeleteLoading(true);
    const response = await deleteChargeCategories(id);
    if (response.success == true) {
      fetchInvoices(id);
      toast.success(response.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setDeleteModalIsOpen(false);
      setIsDeleteLoading(false);
    }else{
      setDeleteModalIsOpen(false);
      setIsDeleteLoading(false);
      toast.error(JSON.stringify(response.response.data.data), {
        position: toast.POSITION.TOP_CENTER,
      })
      
    }
    
  }


  useEffect(() => {
    setVal(true);
    console.log(accountInvoices);
  }, [accountInvoices]);
  if (val) {
    var rows = accountInvoices;
    setLoading(false);
  } else {
    setLoading(true);
  }
  return (
    <div>
      <DeleteModel isLoading = {isDeleteLoading} setIsLoading={setIsDeleteLoading} modalIsOpen={deleteModalIsOpen} id={deleteId} setIsOpen={setDeleteModalIsOpen} onOk={onDeleteHandler}  />
      <>
        {rows && accountInvoices.length > 0 ? (
          loading ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              <div className="py-3">
                <div className="chart chart-xs">
                  <Box
                    sx={{
                      height: 400,
                      width: "100%",
                      // "& .super-app-theme--header": {
                      //   backgroundColor: "rgba(255, 7, 0, 0.55)",
                      // },
                    }}
                  >
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{
                        columns: {
                          columnVisibilityModel: {
                            id: false,
                            referrer: false,
                            skill: false,
                            gender: false,
                            dob: false,
                            skype: false,
                            parentfirstname: false,
                            studentsince: false,
                            facetime: false,
                            price: false,
                            subjects: false,
                            school: false,
                          },
                        },
                        pagination: {
                          paginationModel: {
                            pageSize: 10,
                          },
                        },
                      }}
                      pageSizeOptions={[20]}
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
                  {/* {popupmenu && (
              // <>
              //   <div className="dropdown-menu dropdown-menu-end show"
              //   style={{ position: 'absolute', top: -220, right: 0 }}>
              //     <Link className="dropdown-item" to="/my-preferences">
              //       <i className="fa fa-eye" aria-hidden="true"></i> &nbsp; View
              //     </Link>
              //     <Link className="dropdown-item" to="/bussiness-settings">
              //       <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
              //       &nbsp;Email
              //     </Link>
              //     <Link className="dropdown-item" to="/bussiness-settings">
              //       <i className="fa fa-download" aria-hidden="true"></i>{" "}
              //       &nbsp;Download PDF
              //     </Link>
              //     <div className="dropdown-divider"></div>
              //     <Link className="dropdown-item" >
              //       {" "}
              //       &nbsp;Override Status
              //     </Link>
              //     <Link className="dropdown-item" >
              //      {" "}
              //       &nbsp;Void
              //     </Link>
              //     <Link className="dropdown-item" >
              //       {" "}
              //       &nbsp;Paid
              //     </Link>
              //     <div className="dropdown-divider"></div>
              //     <Link className="dropdown-item" to="/bussiness-settings">
              //       <i className="fa fa-plus" aria-hidden="true"></i>{" "}
              //       &nbsp;Add a Payment
              //     </Link>
              //     <div className="dropdown-divider"></div>
              //     <Link className="dropdown-item" to="/bussiness-settings">
              //     <i className="fa fa-archive" aria-hidden="true"></i>{" "}
              //       &nbsp;Archive
              //     </Link>
              //     <Link className="dropdown-item" to="/bussiness-settings">
              //       <i className="fa fa-trash" aria-hidden="true"></i>{" "}
              //       &nbsp;Delete
              //     </Link>
              //   </div>
              // </>
              <FloatingMenus />
            )} */}
                </div>
              </div>
            </>
          )
        ) : (
          <>
            {loading ? (
              <>
                <Loader />
              </>
            ) : (
              <>
                <div className="py-3">
                  <div className="chart chart-xs">
                    <img src={students}></img>
                  </div>
                </div>
                <h4>
                  <strong>You don't have any tutors yet</strong>
                </h4>
                <p style={{ textAlign: "center" }}>
                  Add your tutors, and more.
                </p>
                <div className="addnewstudent">
                  <i className="fa fa-plus" aria-hidden="true"></i>
                  <a className="btn dropdown-toggle" href="#" role="button">
                    Add New
                  </a>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  ></div>
                </div>
              </>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default FetchInvoicesDatatable;
