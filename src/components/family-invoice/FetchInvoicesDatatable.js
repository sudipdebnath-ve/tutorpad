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
import Families_Invoices from "../../assets/images/Families_Invoices.svg";

import { useNavigate } from "react-router-dom";
import DeleteModel from "../form/delete-model/DeleteModel.js";
import { ToastContainer, toast } from "react-toastify";
import { deleteChargeCategories } from "../../services/categoriesService.js";
import { getInvoicePdf } from "../../services/invoiceService.js";
import FloatingMenus from "./FloatingMenus.js";
const FetchInvoicesDatatable = ({
  setSelectedId,
  set_chargecat_name,
  setModalIsOpen,
  setIsEdit,
  id,
}) => {
  const [val, setVal] = useState(false);

  const { fetchInvoices, userId, accountInvoices } =
    useUserDataContext();
  const [deleteId, setDeleteId] = useState(null);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [invoice_link, set_invoice_link] = useState("");
  const [is_paid, set_is_paid] = useState("");
  const [is_archived, set_is_archived] = useState("");
  const [is_void, set_is_void] = useState("");
  const [is_deleted, set_is_deleted] = useState(false);

  const [isMenuOpenId, setIsMenuOpenId] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetchInvoices(id);
  }, [userId, is_paid, is_archived, is_void, is_deleted]);

  const viewPdf = async (id) => {
    const response = await getInvoicePdf(id);
    const pdf_url = response?.data.pdf_url;
    set_invoice_link(pdf_url);
    if (pdf_url) {
      window.open(pdf_url, "_blank");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "invoice_create_date",
      headerName: "Invoice Date",
      width: "180",
      renderCell: (params) => (
        <div>
          <div style={{ marginBottom: "5px" }}>
            <Link to="#" onClick={(e) => viewPdf(params.row.id)}>
              {params.row.invoice_create_date}
            </Link>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            {params.row.is_paid == 1 && (
              <div
                style={{
                  minWidth: "50px",
                  padding: "0 5px",
                  background: "#eafcd2",
                  color: "#18790b",
                  textAlign: "center",
                }}
              >
                Paid
              </div>
            )}
            {params.row.is_void == 1 && (
              <div
                style={{
                  minWidth: "50px",
                  padding: "0 5px",
                  background: "#ffe4d7",
                  color: "#b71c37",
                  textAlign: "center",
                }}
              >
                Void
              </div>
            )}
            {params.row.is_archived == 1 && (
              <div
                style={{
                  minWidth: "50px",
                  padding: "0 5px",
                  background: "#eaeeee",
                  color: "#344242",
                  textAlign: "center",
                }}
              >
                Archive
              </div>
            )}
          </div>
        </div>
      ),
      editable: true,
    },
    {
      field: "date_range",
      headerName: "Date Range",
      width: 200,
      renderCell: (params) =>
        `${params.row.invoice_start_date} - ${params.row.invoice_end_date}`,
    },
    {
      field: "private_note",
      headerName: "Private Note",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      renderCell: (params) =>
        params.row.amount == 0 ? (
          <div
            style={{
              minWidth: "50px",
              padding: "0 5px",
              background: "lightgreen",
              textAlign: "center",
              color: "white",
            }}
          >
            ₹ {params.row.amount}
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
            -₹ {params.row.amount}
          </div>
        ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <div style={{ position: "absolute" }}>
          {params.row.id == isMenuOpenId && (
            <FloatingMenus
              id={params.row.id}
              onMouseLeave={() => setIsMenuOpenId(0)}
              is_paid={params.row.is_paid}
              set_is_paid={set_is_paid}
              is_archived={params.row.is_archived}
              set_is_archived={set_is_archived}
              is_void={params.row.is_void}
              set_is_void={set_is_void}
              set_is_deleted={set_is_deleted}
              family_id={id}
            />
          )}
          <div style={{ display: "flex", gap: 5 }} className="dropdown">
            <button
              style={{ border: "none", backgroundColor: "transparent" }}
              onClick={() => setIsMenuOpenId(params.row.id)}
            >
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </div>
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
      fetchInvoices(id);
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
    console.log(accountInvoices);
  }, [accountInvoices]);
  if (val) {
    var rows = accountInvoices;
    
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
        {rows && accountInvoices.length > 0 ? (
          
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
                    <img src={Families_Invoices}></img>
                  </div>
                </div>
                <h4>
                  <strong>You don't have any invoices yet</strong>
                </h4>
                <div className="addnewstudent addnew">
                  <div>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    <a className="btn dropdown-toggle" href="#" role="button">
                      Add New
                    </a>
                  </div>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  ></div>
                </div>
              </>
          
          </>
        )}
      </>
    </div>
  );
};

export default FetchInvoicesDatatable;
