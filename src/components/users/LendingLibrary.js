import React from "react";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import lending from "./assets/images/lending.svg";
import { Link } from "react-router-dom";
const LendingLibrary = () => {
  const { sidebarToggle } = useUserDataContext();

  return (
    <div className="wrapper">
      {sidebarToggle ? (
        <>
          <MiniSidebar />
        </>
      ) : (
        <>
          <Sidebar />
        </>
      )}

      <div className="main">
        <TopBar />

        <main className="content student">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                        <div className="card flex-fill w-100">
                          <div className="card-body d-flex">
                            <div className="align-self-center w-100">
                              <div className="py-3">
                                <div className="chart chart-xs">
                                  <img src={lending} alt="lending"></img>
                                </div>
                              </div>
                              <h4>
                                <strong>
                                  You don't have any library items yet
                                </strong>
                              </h4>
                              <p style={{ textAlign: "center" }}>
                                Add your lending items so you can track your
                                lent items, assign them due dates and more.
                              </p>
                              <div className="addnewstudent addnew lending">
                                <i
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                ></i>
                                <Link
                                  to="/lending-library/details"
                                  className="btn"
                                  role="button"
                                >
                                  Add Library Item
                                </Link>

                                <div
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuLink"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LendingLibrary;
