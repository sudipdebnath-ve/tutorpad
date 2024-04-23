import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import students from "../assets/images/students.svg";
import Loader from "../../Loader.js";
import { Link } from "react-router-dom";

const FetchTutorDatatable = () => {
  const [val, setVal] = useState(false);
  const { fetchTutorData, userId, setLoading, loading, tutorData } =
    useUserDataContext();

  useEffect(() => {
    fetchTutorData();
  }, [userId]);

  // const columns: GridColDef[] = [
  //   { field: "id", headerName: "ID", width: 90 },
  //   {
  //     field: "firstName",
  //     headerName: "First name",
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: "lastName",
  //     headerName: "Last name",
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     width: 110,
  //     editable: true,
  //   },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params: GridValueGetterParams) =>
  //       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  //   },
  // ];
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "first_name",
      headerName: "First name",
      // headerClassName: "super-app-theme--header",
      // valueGetter: (params) =>
      //   `<a href="${params.row.first_name}">${params.row.first_name}</a>`,
      width: 150,
      // valueGetter: (params: GridValueGetterParams) =>
      //   `<a href="${params.row.first_name}">${params.row.first_name}</a>`,
      // },
      renderCell: (params) => (
        <Link to={`/tutors/details/${params.row.id}`}>
          {params.row.first_name}
        </Link>
      ),
      editable: true,
    },
    {
      field: "last_name",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email Id",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
    },
    {
      field: "dob",
      headerName: "Birthday",
      width: 150,
    },
    {
      field: "skype",
      headerName: "Skype Name",
      width: 150,
    },
    {
      field: "facetime",
      headerName: "FaceTime Id",
      width: 150,
    },
    {
      field: "payroll",
      headerName: "Payroll",
      width: 150,
    },
    {
      field: "subjects",
      headerName: "Subjects",
      width: 150,
    },
    {
      field: "payrate_on_revenue",
      headerName: "Pay Rate",
      width: 150,
    },
    {
      field: "lesson",
      headerName: "Default Lesson Category",
      width: 150,
    },
    {
      field: "payrate_flat_hourly",
      headerName: "Pay Rate Hourly",
      width: 150,
    },
  ];

  useEffect(() => {
    setVal(true);
    console.log(tutorData);
  }, [tutorData]);
  if (val) {
    var rows = tutorData;
    setLoading(false);
  } else {
    setLoading(true);
  }
  return (
    <div>
      <>
        {rows && tutorData.length > 0 ? (
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
                <div className="addnewstudent addnew">
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

export default FetchTutorDatatable;
