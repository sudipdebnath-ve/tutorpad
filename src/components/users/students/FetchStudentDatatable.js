import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import students from "../assets/images/students.svg";
import Loader from "../../Loader.js";
import { Link } from "react-router-dom";

const FetchStudentDatatable = () => {
  const [val, setVal] = useState(false);
  const { fetchStudentData, userId, studentData } =
    useUserDataContext();

  useEffect(() => {
    fetchStudentData();
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
        <Link to={`/students/details/${params.row.id}`}>
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
      field: "student_status",
      headerName: "Status",
      width: 140,
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
      field: "school",
      headerName: "School",
      width: 150,
    },
    {
      field: "studentsince",
      headerName: "Student Since",
      width: 150,
    },
    {
      field: "referrer",
      headerName: "Referrer",
      width: 150,
    },
    {
      field: "subjects",
      headerName: "Subjects",
      width: 150,
    },
    {
      field: "skill",
      headerName: "Skill Level",
      width: 150,
    },
    {
      field: "parentfirstname",
      headerName: "Parent First Name",
      width: 150,
    },
    {
      field: "price",
      headerName: "Default Price",
      width: 150,
    },
    {
      field: "lessonlen",
      headerName: "Default Lesson Length",
      width: 150,
    },
  ];

  useEffect(() => {
    setVal(true);
    console.log(studentData);
  }, [studentData]);
  if (val) {
    var rows = studentData;
    
  } 
  return (
    <div>
      <>
        {rows && studentData.length > 0 ? (
         
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
                  <strong>You don't have any students yet</strong>
                </h4>
                <p style={{ textAlign: "center" }}>
                  Add your students so you can take their attendance, and more.
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
    </div>
  );
};

export default FetchStudentDatatable;
