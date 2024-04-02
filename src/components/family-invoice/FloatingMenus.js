import React from 'react'
import { Link } from "react-router-dom"

function FloatingMenus({onMouseLeave,id}) {

  return (
    <>
    <div onMouseLeave={onMouseLeave} className="dropdown-menu dropdown-menu-end show"
    style={{ position: 'absolute', right: 80,top:0,zIndex:99999999 }}>
        <Link className="dropdown-item" to="/my-preferences">
        <i className="fa fa-eye" aria-hidden="true"></i> &nbsp; View
        </Link>
        <Link className="dropdown-item" to="/bussiness-settings">
        <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
        &nbsp;Email
        </Link>
        <Link className="dropdown-item" to="/bussiness-settings">
        <i className="fa fa-download" aria-hidden="true"></i>{" "}
        &nbsp;Download PDF
        </Link>
        <div className="dropdown-divider"></div>
        <Link className="dropdown-item" >
        {" "}
        &nbsp;Override Status
        </Link>
        <Link className="dropdown-item" >
        {" "}
        &nbsp;Void
        </Link>
        <Link className="dropdown-item" >
        {" "}
        &nbsp;Paid
        </Link>
        <div className="dropdown-divider"></div>
        <Link className="dropdown-item" to="/bussiness-settings">
        <i className="fa fa-plus" aria-hidden="true"></i>{" "}
        &nbsp;Add a Payment
        </Link>
        <div className="dropdown-divider"></div>
        <Link className="dropdown-item" to="/bussiness-settings">
        <i className="fa fa-archive" aria-hidden="true"></i>{" "}
        &nbsp;Archive
        </Link>
        <Link className="dropdown-item" to="/bussiness-settings">
        <i className="fa fa-trash" aria-hidden="true"></i>{" "}
        &nbsp;Delete
        </Link>
    </div>
    </>
  )
}

export default FloatingMenus
