import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import attendence from "../students/assets/images/attendance.svg";
import Loader from "../../Loader.js";
import { Link } from "react-router-dom";

const FetchAttendanceLog = ({ userId }) => {
  const [val, setVal] = useState(false);
  console.log('id : ',userId);
  const { 
    fetchStudentAttendances,
    studentAttendance,
  } = useUserDataContext();

  useEffect(() => {
    fetchStudentAttendances(userId);
  }, []);

  const columns = [
    { 
      field: "start_date", 
      headerName: "Date", 
      width: 150,
      valueGetter: (params) => params.row.event_occurrence?.start_date || '',
    },
    {
      field: "event_duration",
      headerName: "Duration",
      width: 150,
      editable: true,
      valueGetter: (params) => params.row.event_occurrence?.event_duration || '',

    },
    {
      field: "event_all_day",
      headerName: "All Day",
      width: 150,
      editable: true,
      valueGetter: (params) => params.row.event_occurrence?.event_all_day ? "Yes" : "No",

    },
    {
      field: "event_repeat_on",
      headerName: "Week Days",
      width: 150,
      editable: true,
      valueGetter: (params) => params.row.event_occurrence?.event_repeat_on || "",

    },
    {
      field: "as_title",
      headerName: "Status",
      width: 150,
    },
  ];

  useEffect(() => {
    setVal(true);
    // console.log(studentAttendance);
  }, [studentAttendance]);
  if (val) {
    var rows = studentAttendance;
    
  } 
  return (
    <div>
      <>
        {rows && studentAttendance.length > 0 ? (
         
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
                    <img src={attendence} alt="attendence"></img>
                  </div>
                </div>
                <h5 className="my-1" style={{ textAlign: "center" }}>
                  <strong>
                    There aren't any events scheduled as of the date you
                    selected
                  </strong>
                </h5>
                <p style={{ textAlign: "center" }}>
                  Adjust to a date in the future or go to the calendar to
                  schedule some lessons
                </p>
              </>
        )}
      </>
    </div>
  );
};

export default FetchAttendanceLog;
