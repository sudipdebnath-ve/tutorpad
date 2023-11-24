import React from "react";
import "../users/assets/css/style.css";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <Link className="sidebar-brand" to="/dashboard">
          <span className="align-middle">TutorPad</span>
        </Link>
        <ul className="sidebar-nav">
          <li
            className={`sidebar-item ${
              splitLocation[1] === "dashboard" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="/dashboard">
              <i className="fa fa-home" aria-hidden="true"></i>
              <span className="align-middle">Dashboard</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "students" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="/students">
              <i className="fa fa-graduation-cap" aria-hidden="true"></i>
              <span className="align-middle">Students</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "calendar" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="#">
              <i className="fa fa-calendar" aria-hidden="true"></i>
              <span className="align-middle">Calendar</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "lending-library" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="#">
              <i className="fa fa-book" aria-hidden="true"></i>
              <span className="align-middle">Lending Library</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "online-resources" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="#">
              <i className="fa fa-cloud-download" aria-hidden="true"></i>
              <span className="align-middle">Online Resources</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "familiies-and-invoices" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="#">
              <i className="fa fa-credit-card-alt" aria-hidden="true"></i>
              <span className="align-middle">Families & Invoices</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "expenses-and-other-revenues" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="#">
              <i className="fa fa-calculator" aria-hidden="true"></i>
              <span className="align-middle">Expenses & other Revenues</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "mileage" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="#">
              <i className="fa fa-bar-chart" aria-hidden="true"></i>
              <span className="align-middle">Mileage</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "website" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="#">
              <i className="fa fa-window-restore" aria-hidden="true"></i>
              <span className="align-middle">Website</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "news-blog-posts" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="#">
              <i className="fa fa-bullhorn" aria-hidden="true"></i>
              <span className="align-middle">News & Blog Posts</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              splitLocation[1] === "bussiness-reports" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="#">
              <i className="fa fa-file-text" aria-hidden="true"></i>
              <span className="align-middle">Bussiness Reports</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              splitLocation[1] === "email-templates" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="/email-templates">
              <i className="fa fa-text-width" aria-hidden="true"></i>
              <span className="align-middle">Email Templates</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
