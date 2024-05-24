import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import students from "../users/assets/images/students.svg";
import Loader from "../Loader.js";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { edit2 } from "react-icons-kit/feather/edit2";
import { trash2 } from "react-icons-kit/feather/trash2";
import { chevronRight } from "react-icons-kit/feather/chevronRight";
import { useNavigate } from "react-router-dom";
import DeleteModel from "../form/delete-model/DeleteModel.js";
import { ToastContainer, toast } from "react-toastify";
import { deleteChargeCategories } from "../../services/categoriesService.js";
const FetchFamilyInvoiceDatatable = ({
  setSelectedId,
  set_chargecat_name,
  setModalIsOpen,
  setIsEdit,
}) => {
  const [val, setVal] = useState(false);
  const { fetchFamilies, userId, allFamilies } = useUserDataContext();
  const [deleteId, setDeleteId] = useState(null);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchFamilies();
  }, [userId]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Family",
      // headerClassName: "super-app-theme--header",
      // valueGetter: (params) =>
      //   `<a href="${params.row.first_name}">${params.row.first_name}</a>`,
      width: "400",
      // valueGetter: (params: GridValueGetterParams) =>
      //   `<a href="${params.row.first_name}">${params.row.first_name}</a>`,
      // },
      renderCell: (params) => (
        <Link to={`/familiies-and-invoices/family/${params.row.id}`}>
          {params.row.name}
        </Link>
      ),
      editable: true,
    },
    {
      field: "email",
      headerName: "Family Contact",
      width: 150,
    },
    {
      field: "balance",
      headerName: "Balance",
      width: 150,
      renderCell: (params) =>
        params.row.balance_negative == 0 ? (
          <div
            style={{
              minWidth: "50px",
              padding: "0 5px",
              background: "lightgreen",
              textAlign: "center",
              color: "white",
            }}
          >
            ₹ {params.row.balance}
          </div>
        ) : (
          <div
            style={{
              minWidth: "50px",
              padding: "0 5px",
              background: "red",
              textAlign: "center",
              color: "white",
            }}
          >
            -₹ {params.row.balance}
          </div>
        ),
    },
    {
      field: "auto_invoicing",
      headerName: "Auto Invoicing",
      width: 150,
      renderCell: (params) =>
        params.row.auto_invoicing == 1 ? (
          <div
            style={{
              minWidth: "50px",
              padding: "0 5px",
              background: "lightgreen",
              textAlign: "center",
              color: "white",
            }}
          >
            Enabled
          </div>
        ) : (
          <div
            style={{
              minWidth: "50px",
              padding: "0 5px",
              background: "red",
              textAlign: "center",
              color: "white",
            }}
          >
            Disabled
          </div>
        ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: 5 }}>
          <Link to={`/familiies-and-invoices/family/${params.row.id}`}>
            <Icon icon={chevronRight} />
          </Link>
        </div>
      ),
    },
  ];

  const onDeleteModelHandler = (id) => {
    setDeleteId(id);
    setDeleteModalIsOpen(true);
  };

  const onDeleteHandler = async (id) => {
    setIsDeleteLoading(true);
    const response = await deleteChargeCategories(id);
    if (response.success == true) {
      fetchFamilies();
      toast.success(response.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setDeleteModalIsOpen(false);
      setIsDeleteLoading(false);
    } else {
      setDeleteModalIsOpen(false);
      setIsDeleteLoading(false);
      toast.error(JSON.stringify(response.response.data.data), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    setVal(true);
    console.log(allFamilies);
  }, [allFamilies]);
  if (val) {
    var rows = allFamilies;
  }
  return (
    <div>
      <DeleteModel
        isLoading={isDeleteLoading}
        setIsLoading={setIsDeleteLoading}
        modalIsOpen={deleteModalIsOpen}
        id={deleteId}
        setIsOpen={setDeleteModalIsOpen}
        onOk={onDeleteHandler}
      />
      <>
        {rows && allFamilies.length > 0 ? (
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
            <p style={{ textAlign: "center" }}>Add your tutors, and more.</p>
            <div className="addnewstudent addnew">
              {/* <div>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                      <a className="btn dropdown-toggle" href="#" role="button">
                        Add New
                      </a>
                  </div> */}
              <Link to="/students/add">
                <div>
                  <i className="fa fa-plus" aria-hidden="true"></i>
                  <a className="btn dropdown-toggle" href="#" role="button">
                    Add New
                  </a>
                </div>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuLink"
              ></div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default FetchFamilyInvoiceDatatable;
