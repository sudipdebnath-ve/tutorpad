import React, { useState } from "react";
import { Link } from "react-router-dom";
import FetchLocationDatatable from "./FetchLocationDatatable.js";

const Locations = ()=>{

    const [addNewDropdown, setAddNewDropdown] = useState(false);
    const handleClickAddNew = (e) => {
        if (addNewDropdown == false) {
          setAddNewDropdown(true);
        } else {
          setAddNewDropdown(false);
        }
      };

    return <div className="row">
                <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                <div className="card flex-fill w-100">
                    <div className="card-header">
                    <div
                        className="dropdown addnew"
                        onClick={handleClickAddNew}
                    >
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        <a className="btn dropdown-toggle">Add New</a>
                        {addNewDropdown && (
                        <>
                            <div className="dropdown-menu addNewDropdown">
                            <Link
                                className="dropdown-item"
                                to={"/calendar/locations/add"}
                            >
                                <i
                                className="fa fa-plus"
                                aria-hidden="true"
                                ></i>
                                New Location
                            </Link>
                            <div className="dropdown-divider"></div>
                            <Link
                                className="dropdown-item"
                                to={"/students/import"}
                            >
                                <i
                                className="fa fa-cloud-download"
                                aria-hidden="true"
                                ></i>
                                Import Students
                            </Link>
                            </div>
                        </>
                        )}
                    </div>
                    </div>
                    <div className="card-body d-flex">
                    <div className="align-self-center w-100">
                        <FetchLocationDatatable />
                    </div>
                    </div>
                </div>
                </div>
            </div>
}
export default Locations;