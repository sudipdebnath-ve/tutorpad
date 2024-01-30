import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, GridValueGetterParams } from "@mui/x-data-grid";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import attendence from "../students/assets/images/attendance.svg";
import Loader from "../../Loader.js";
import { Link } from "react-router-dom";

const FetchAttendanceLog = () => {
  const [val, setVal] = useState(false);
  const { fetchStudentData, userId, studentData, setLoading, loading } =
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
    console.log(studentData);
  }, [studentData]);
  if (val) {
    var rows = studentData;
    setLoading(false);
  } else {
    setLoading(true);
  }
  return (
    <div>
      <>
        {rows && studentData.length > 0 ? (
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
        )}
      </>
    </div>
  );
};

export default FetchAttendanceLog;
