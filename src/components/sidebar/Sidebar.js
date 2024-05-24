import React, {useContext} from "react";
import "../users/assets/css/style.css";
import { Link, useLocation } from "react-router-dom";
import LanguageOption from "../LanguageOption";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { AuthContext } from '../registerLogin/AuthContext';


const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const { t} = useTranslation()
  const { role } = useContext(AuthContext);


  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <Link className="sidebar-brand" to="/dashboard">
          <span className="align-middle">{t("TutorPad")}</span>
        </Link>
        <ul className="sidebar-nav">
          <li
            className={`sidebar-item ${
              splitLocation[1] === "dashboard" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="/dashboard">
              <i className="fa fa-home" aria-hidden="true"></i>
              <span className="align-middle">{t("Dashboard")}</span>
            </Link>
          </li>

          { role === `${process.env.REACT_APP_BUSINESS_ROLE}` &&
            <li
              className={`sidebar-item ${
                splitLocation[1] === "tutors" ? "active" : ""
              }`}
            >
              <Link className="sidebar-link" to="/tutors">
                <i className="fa fa-id-badge" aria-hidden="true"></i>
                <span className="align-middle">{t("Tutors & Staffs")}</span>
              </Link>
            </li>
          }

          <li
            className={`sidebar-item ${
              splitLocation[1] === "students" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="/students">
              <i className="fa fa-graduation-cap" aria-hidden="true"></i>
              <span className="align-middle">{t("Students")}</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "calendar" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="/calendar">
              <i className="fa fa-calendar" aria-hidden="true"></i>
              <span className="align-middle">{t("Calendar")}</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "lending-library" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="/lending-library">
              <i className="fa fa-book" aria-hidden="true"></i>
              <span className="align-middle">{t("Lending Library")}</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "online-resources" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="/online-resources">
              <i className="fa fa-cloud-download" aria-hidden="true"></i>
              <span className="align-middle">{t("Online Resources")}</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "familiies-and-invoices" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="/familiies-and-invoices">
              <i className="fa fa-credit-card-alt" aria-hidden="true"></i>
              <span className="align-middle">{t("Families & Invoices")}</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "expenses-and-other-revenues" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="#">
              <i className="fa fa-calculator" aria-hidden="true"></i>
              <span className="align-middle">{t("Expenses & other Revenues")}</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "mileage" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="#">
              <i className="fa fa-bar-chart" aria-hidden="true"></i>
              <span className="align-middle">{t("Mileage")}</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "website" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="#">
              <i className="fa fa-window-restore" aria-hidden="true"></i>
              <span className="align-middle">{t("Website")}</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              splitLocation[1] === "news-blog-posts" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="#">
              <i className="fa fa-bullhorn" aria-hidden="true"></i>
              <span className="align-middle">{t("News & Blog Posts")}</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              splitLocation[1] === "bussiness-reports" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="#">
              <i className="fa fa-file-text" aria-hidden="true"></i>
              <span className="align-middle">{t("Bussiness Reports")}</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              splitLocation[1] === "email-templates" ? "active" : ""
            }`}
          >
            <Link className="sidebar-link" to="/email-templates">
              <i className="fa fa-text-width" aria-hidden="true"></i>
              <span className="align-middle">{t("Email Templates")}</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
