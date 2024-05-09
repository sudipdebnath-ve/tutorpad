import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import students from "../assets/images/students.svg";
import Loader from "../../Loader.js";
import { Link } from "react-router-dom";

const FetchStudyLog = () => {
  const [val, setVal] = useState(false);
  const { fetchStudentData, userId, studentData } =
    useUserDataContext();

  useEffect(() => {
    fetchStudentData();
  }, [userId]);

  const columns = [
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "day_of_week",
      headerName: "Day Of Week",
      width: 150,
      editable: true,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 150,
      editable: true,
    },
    {
      field: "attachment",
      headerName: "Attachment",
      width: 150,
    },
    {
      field: "student_status",
      headerName: "Status",
      width: 140,
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 150,
    },
  ];

  useEffect(() => {
    setVal(true);
    // console.log(studentData);
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
                    }}
                  >
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      pageSizeOptions={[10]}
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
                <h4 style={{ textAlign: "center" }}>
                  <strong>You don't have any students yet</strong>
                </h4>
                <p style={{ textAlign: "center" }}>
                  Add your students so you can take their attendance, and more.
                </p>
              </>
          
        )}
      </>
    </div>
  );
};

export default FetchStudyLog;
