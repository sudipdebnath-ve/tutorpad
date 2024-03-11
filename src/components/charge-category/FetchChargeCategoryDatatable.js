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
import { deleteCategories } from "../../services/categoriesService.js";
const FetchChargeCategoryDatatable = () => {
  
  const [val, setVal] = useState(false);
  const { fetchChargeCategory, userId, setLoading, loading, allChargeCategory } =
    useUserDataContext();
  const [deleteId,setDeleteId] = useState(null);
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [isDeleteLoading,setIsDeleteLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchChargeCategory();
  }, [userId]);


  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "chargecat_name",
      headerName: "Name",
      // headerClassName: "super-app-theme--header",
      // valueGetter: (params) =>
      //   `<a href="${params.row.first_name}">${params.row.first_name}</a>`,
      width: '650',
      // valueGetter: (params: GridValueGetterParams) =>
      //   `<a href="${params.row.first_name}">${params.row.first_name}</a>`,
      // },
      renderCell: (params) => (
        <Link to={`/tutors/details/${params.row.id}`}>
          {params.row.chargecat_name}
        </Link>
      ),
      editable: true,
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

  const onDeleteModelHandler = (id)=>{
    setDeleteId(id);
    setModalIsOpen(true);
  }

  const onDeleteHandler = async (id)=>{
    setIsDeleteLoading(true);
    const response = await deleteCategories(id);
    if (response.success == true) {
      fetchChargeCategory();
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


  useEffect(() => {
    setVal(true);
    console.log(allChargeCategory);
  }, [allChargeCategory]);
  if (val) {
    var rows = allChargeCategory;
    setLoading(false);
  } else {
    setLoading(true);
  }
  return (
    <div>
      <DeleteModel isLoading = {isDeleteLoading} setIsLoading={setIsDeleteLoading} modalIsOpen={modalIsOpen} id={deleteId} setIsOpen={setModalIsOpen} onOk={onDeleteHandler}  />
      <>
        {rows && allChargeCategory.length > 0 ? (
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

export default FetchChargeCategoryDatatable;
