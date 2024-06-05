import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import students from "../assets/images/students.svg";
import Loader from "../../Loader.js";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const FetchStudentGroupDatatable = ({onEdit, onDelete}) => {
  const [val, setVal] = useState(false);
  const { fetchStudentGroupData, userId, studentGroupData } =
    useUserDataContext();

  useEffect(() => {
    fetchStudentGroupData();
  }, []);

  useEffect(() => {
    studentGroupData != false &&  setVal(true);
  }, [studentGroupData]);

  const transformData = (data) => {
    console.log('data : ',data);
    return data.map((group) => ({
      ...group,
      students_name: group.students.map(student => student.name).join(', '),
    }));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "students_name",
      headerName: "Students",
      width: 250,
      editable: true,
    },
    {
      field: "count",
      headerName: "Student Count",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton size="small" onClick={() => onEdit(params.row)}>
            <EditIcon fontSize="small"/>
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(params.row.id)}>
            <DeleteIcon fontSize="small"/>
          </IconButton>
        </div>
      ),
    },
  ];

  console.log('studentGroupData : ',studentGroupData);
  const rows = val ? transformData(studentGroupData) : [];

  return (
    <div>
      <>
        {rows && studentGroupData.length > 0 ? (
         
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

export default FetchStudentGroupDatatable;
