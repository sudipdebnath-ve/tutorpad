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
import { deleteTransactionById } from "../../services/categoriesService.js";
import transactions from "../../assets/images/transactions.svg";
const FetchTransactionDatatable = ({
  setSelectedId,
  set_chargecat_name,
  setModalIsOpen,
  setIsEdit,
  fromDate,
  toDate,
}) => {
  const [val, setVal] = useState(false);
  const {
    allTransactionsByDates,
    fetchTransactionsByDates,
    userId,
  } = useUserDataContext();
  const [deleteId, setDeleteId] = useState(null);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchTransactionsByDates(fromDate, toDate);
  }, [userId, fromDate, toDate]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "transaction_date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "student_fname",
      headerName: "Student",
      width: 150,
      renderCell: (params) =>
        `${params.row.student_fname} ${params.row.student_lname}`,
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
    },
    {
      field: "transaction_amount",
      headerName: "Transaction Amount",
      width: 150,
    },
    {
      field: "transaction_label",
      headerName: "Type",
      width: 150,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: 5 }}>
          <Icon
            onClick={() =>
              navigate(
                "/familiies-and-invoices/transaction-type/2/" +
                  params.row.transaction_type +
                  "/" +
                  params.row.id
              )
            }
            icon={edit2}
          />
          <Icon
            onClick={() => onDeleteModelHandler(params.row.id)}
            icon={trash2}
          />
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
    // const response = await deleteChargeCategories(id);
    const response = await deleteTransactionById(id);
    console.log("response------------", response);
    if (response.success == true) {
      fetchTransactionsByDates(fromDate, toDate);
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
    console.log(allTransactionsByDates);
  }, [allTransactionsByDates]);
  if (val) {
    var rows = allTransactionsByDates;
    
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
        {rows && allTransactionsByDates.length > 0 ? (
          
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
              <>
                <div className="py-3">
                  <div className="chart chart-xs">
                    <img src={transactions}></img>
                  </div>
                </div>
                <h4>
                  <strong>
                    There aren't any transactions for this date range
                  </strong>
                </h4>
                {/* <div className="addnewstudent addnew">
                  <i className="fa fa-plus" aria-hidden="true"></i>
                  <a className="btn dropdown-toggle" href="#" role="button">
                    Add New
                  </a>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  ></div>
                </div> */}
              </>
            
          </>
        )}
      </>
    </div>
  );
};

export default FetchTransactionDatatable;
