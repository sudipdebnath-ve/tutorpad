import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import study from "./assets/images/study.png";
import createAccount from "./assets/images/create-account.png";
import createInvoice from "./assets/images/create-invoice.png";
import addStudent from "./assets/images/add-student.png";
import scheduleEvent from "./assets/images/schedule-event.png";
import youGotIt from "./assets/images/got-it.png";
import eventIcon from "./assets/images/event.svg";
import paymentIcon from "./assets/images/payment.svg";
import projectIcon from "./assets/images/project.svg";
import activeIcon from "./assets/images/active-student.svg";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import LanguageOption from "../LanguageOption.js";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const StudentDashboard = () => {
  const { userData } = useUserDataContext();
  const { t } = useTranslation();

  return (
    <div className="container-fluid p-0">
      <h1 className="h3 mb-3">
        <strong>
          {t("Let's get started,")} {userData?.first_name}!
        </strong>
      </h1>

      <div className="row all-step">
        <div className="col-xl-12 col-xxl-12 steps">

          <div className="row">
            <div className="col-auto">
              <div className="stat text-primary icon3">
                <Link className="dropdown-item" to={"/calendar"}>
                  <img src={scheduleEvent} alt="schedule-event-icon" />
                </Link>
              </div>
            </div>
            <div className="col mt-0">
              <h5 className="card-title">{t("Join Class")}</h5>
            </div>
          </div>

          <div className="row">
            <div className="col-auto">
              <div className="stat text-primary icon4">
                <img src={createInvoice} alt="create-invoice-icon" />
              </div>
            </div>
            <div className="col mt-0">
              <h5 className="card-title">{t("Find Your Report Card")}</h5>
            </div>
          </div>

          <div className="row">
            <div className="col-auto">
              <div className="stat text-primary icon5">
                <img src={youGotIt} alt="you've got it" />
              </div>
            </div>
            <div className="col mt-0">
              <h5 className="card-title">{t("You've Got It!")}</h5>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-xxl-4 d-flex"></div>
      </div>

      <div className="row d-flex box-container">
        <h1 className="h3 mb-4">
          <strong>{t("Category")}</strong>
        </h1>
        <div className="col-xl-12 col-xxl-12 d-flex">
          <div className="w-100">
            <div className="row">
              <div className="col-sm-4 pr-2">
                <div className="card">
                  <div className="card-body db-card-body">
                    <div className="row">
                      <div className="col mt-0">
                        <div className="square text-primary eventIcon">
                          <img src={eventIcon} className="eventImg" />
                        </div>
                        <h5 className="card-title">
                          {t("Upcoming Class")}
                        </h5>
                      </div>
                    </div>
                    <h1 className="mt-1 mb-3">0</h1>
                    {/* <div className="mb-0">
                    <span className="text-danger">
                      {" "}
                      <i className="mdi mdi-arrow-bottom-right"></i>{" "}
                      -3.65%{" "}
                    </span>
                    <span className="text-muted">Since last week</span>
                  </div> */}
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body db-card-body">
                    <div className="row">
                      <div className="col mt-0">
                        <div className="square text-primary paymentIcon">
                          <img src={paymentIcon} className="paymentImg" />
                        </div>
                        <h5 className="card-title">
                          {t("Total paid amount")}
                        </h5>
                      </div>
                    </div>
                    <h1 className="mt-1 mb-3">0</h1>
                    {/* <div className="mb-0">
                    <span className="text-success">
                      {" "}
                      <i className="mdi mdi-arrow-bottom-right"></i>{" "}
                      6.65%{" "}
                    </span>
                    <span className="text-muted">Since last week</span>
                  </div> */}
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body db-card-body">
                    <div className="row">
                      <div className="col mt-0">
                        <div className="square text-primary activeIcon">
                          <img src={activeIcon} />
                        </div>
                        <h5 className="card-title">{t("Total Attendence")}</h5>
                      </div>
                    </div>
                    <h1 className="mt-1 mb-3">0</h1>
                    {/* <div className="mb-0">
                    <span className="text-danger">
                      {" "}
                      <i className="mdi mdi-arrow-bottom-right"></i>{" "}
                      -2.25%{" "}
                    </span>
                    <span className="text-muted">Since last week</span>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-xl-4 col-xxl-4 d-flex">
        <img src={study} width="100%" alt="study" />
      </div> */}
      </div>

      {/* <div className="row">
      <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
        <div className="card flex-fill w-100">
          <div className="card-header">
            <h5 className="card-title mb-0">Agenda</h5>
          </div>
          <div className="card-body d-flex">
            <div className="align-self-center w-100">
              <div className="py-3">
                <div className="chart chart-xs">
                  <canvas id="chartjs-dashboard-pie"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    </div>
  );
};

export default StudentDashboard;
