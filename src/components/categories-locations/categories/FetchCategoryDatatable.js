import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import students from "../../users/assets/images/students.svg";
import Loader from "../../Loader.js";
import { Icon } from 'react-icons-kit';
import {edit2} from 'react-icons-kit/feather/edit2';
import {trash2} from 'react-icons-kit/feather/trash2';
import { useNavigate } from "react-router-dom";
import { colors } from "../../../utils/constant.js";
import {mail} from 'react-icons-kit/feather/mail';
import {messageSquare} from 'react-icons-kit/feather/messageSquare';
import {xSquare} from 'react-icons-kit/feather/xSquare';
import {command} from 'react-icons-kit/feather/command';
import DeleteModel from "../../form/delete-model/DeleteModel.js";
import { ToastContainer, toast } from "react-toastify";
import { deleteCategories } from "../../../services/categoriesService.js";
const FetchCategoryDatatable = () => {
  const navigate = useNavigate();
  const [val, setVal] = useState(false);
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [deleteId,setDeleteId] = useState(null);
  const [isDeleteLoading,setIsDeleteLoading] = useState(false);
  
  const { fetchCategory, userId, allCategory, setLoading, loading } =
    useUserDataContext();

  useEffect(() => {
    fetchCategory();
  }, [userId]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "eventcat_name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "eventcat_color",
      headerName: "Color",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <div className="colorDotBoxShow"> 
          <div className="colorDotBox">
              <div className="colorDot" style={{background:params.row.eventcat_color}}></div> 
              <span>{colors.find((f)=>f.code===params.row.eventcat_color)?.color}</span>
          </div>
        </div>
       ),
    },
    {
      field: "eventcat_email_reminder",
      headerName: "Email Reminder",
      width: 150,
      renderCell: (params) => (
        params?.row?.eventcat_email_reminder!=0 && params?.row?.eventcat_email_reminder!=null && <div style={{display:'flex',gap:5}}>
                                                      <Icon icon={mail} />
                                                      <span>{`${params.row.eventcat_email_reminder} Hours Before`}</span>
                                                  </div>
       ),
    },
    {
      field: "eventcat_sms_reminder",
      headerName: "SMS Reminder",
      width: 140,
      renderCell: (params) => (
        params?.row?.eventcat_sms_reminder!=0 && params?.row?.eventcat_sms_reminder!=null && <div style={{display:'flex',gap:5}}>
                                                      <Icon icon={messageSquare} />
                                                      <span>{`${params.row.eventcat_sms_reminder} Hours Before`}</span>
                                                  </div>
       ),
    },
    {
      field: "eventcat_blocked_dates",
      headerName: "Blocked Date",
      width: 150,
      renderCell: (params) => (
        params?.row?.eventcat_blocked_dates==1 && params?.row?.eventcat_blocked_dates!=null && <div style={{display:'flex',flex:1, gap:5,justifyContent:'center'}}>
                                                      <Icon icon={xSquare} />
                                                  </div>
       ),
    },
    {
      field: "eventcat_makeup_credits",
      headerName: "Make Up Credit",
      width: 150,
      renderCell: (params) => (
        params?.row?.eventcat_makeup_credits==1 && params?.row?.eventcat_makeup_credits!=null && <div style={{display:'flex',flex:1, gap:5,justifyContent:'center'}}>
                                                      <Icon icon={command} />
                                                  </div>
       ),
    },
    {
      field: "eventcat_potype",
      headerName: "Payroll Override",
      width: 150,
      renderCell: (params) => (
        params?.row?.eventcat_makeup_credits!=null && <div style={{display:'flex',flex:1, gap:5,justifyContent:'center'}}>
                                                      <span>₹ {params.row.eventcat_potype_val}</span>
                                                      <span>{params.row?.po_type?.po_unit_title}</span>
                                                  </div>
       ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => (
       <div style={{display:'flex',gap:5}}>
          <Icon onClick={()=>navigate("/calendar/categories/edit/"+params.row.id)} icon={edit2} />
          <Icon onClick={()=>onDeleteModelHandler(params.row.id)} icon={trash2} />
       </div>
      ),
    }
  ];

  useEffect(() => {
    setVal(true);
    console.log(allCategory);
  }, [allCategory]);
  if (val) {
    var rows = allCategory;
    setLoading(false);
  } else {
    setLoading(true);
  }

  const onDeleteHandler = async (id)=>{
    setIsDeleteLoading(true);
    const response = await deleteCategories(id);
    if (response.success == true) {
      fetchCategory();
      toast.success(response.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setModalIsOpen(false);
      setIsDeleteLoading(false);
    }else{
      setModalIsOpen(false);
      setIsDeleteLoading(false);
      toast.error(JSON.stringify(response.response.data.data), {
        position: toast.POSITION.TOP_CENTER,
      })
      
    }
    
  }

  const onDeleteModelHandler = (id)=>{
    setDeleteId(id);
    setModalIsOpen(true);
  }

  return (
    <div>
      <>
      <DeleteModel isLoading = {isDeleteLoading} setIsLoading={setIsDeleteLoading} modalIsOpen={modalIsOpen} id={deleteId} setIsOpen={setModalIsOpen} onOk={onDeleteHandler}  />
        {rows && allCategory.length > 0 ? (
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
                            id: true,
                            eventcat_name: true,
                            eventcat_color: true,
                            eventcat_email_reminder: true,
                            eventcat_sms_reminder: true,
                            eventcat_makeup_credits: true,
                            eventcat_blocked_dates: true,
                            eventcat_payroll:true,
                            edit:true,
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
                  <strong>You don't have any students yet</strong>
                </h4>
                <p style={{ textAlign: "center" }}>
                  Add your students so you can take their attendance, and more.
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

export default FetchCategoryDatatable;
