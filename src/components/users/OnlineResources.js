import React, { useState } from "react";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import "./assets/css/style.css";
import { Link } from "react-router-dom";
import { useUserDataContext } from "../../contextApi/userDataContext.js";

const OnlineResources = () => {
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

        <main className="content onlineresources">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
                <div className="arrange">
                  <div className="resource">
                    <div className="dis">
                      <i class="fa fa-users" aria-hidden="true"></i>
                      <div className="folder-files">
                        <strong>Shared Space</strong>
                        <p>0 Folders, 0 Files</p>
                      </div>
                    </div>
                    <span className="arrow">
                      <svg
                        role="img"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fal"
                        data-icon="angle-right"
                        class="svg-inline--fa fa-angle-right fa-fw"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        style={{ height: "1.4rem" }}
                      >
                        <path
                          fill="currentColor"
                          d="M219.9 266.7L75.89 426.7c-5.906 6.562-16.03 7.094-22.59 1.188c-6.918-6.271-6.783-16.39-1.188-22.62L186.5 256L52.11 106.7C46.23 100.1 46.75 90.04 53.29 84.1C59.86 78.2 69.98 78.73 75.89 85.29l144 159.1C225.4 251.4 225.4 260.6 219.9 266.7z"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <div className="resource">
                    <div className="dis">
                      <div className="initials">
                        <div className="image-user">
                          <h2>SD</h2>
                        </div>
                      </div>
                      <div className="folder-files">
                        <strong>Sudip Debnath</strong>
                        <p>0 Folders, 0 Files</p>
                      </div>
                    </div>
                    <span className="arrow">
                      <svg
                        role="img"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fal"
                        data-icon="angle-right"
                        class="svg-inline--fa fa-angle-right fa-fw"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        style={{ height: "1.4rem" }}
                      >
                        <path
                          fill="currentColor"
                          d="M219.9 266.7L75.89 426.7c-5.906 6.562-16.03 7.094-22.59 1.188c-6.918-6.271-6.783-16.39-1.188-22.62L186.5 256L52.11 106.7C46.23 100.1 46.75 90.04 53.29 84.1C59.86 78.2 69.98 78.73 75.89 85.29l144 159.1C225.4 251.4 225.4 260.6 219.9 266.7z"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <div className="resource">
                    <div className="dis">
                      <i class="fa fa-users" aria-hidden="true"></i>
                      <div className="folder-files">
                        <strong>Shared Space</strong>
                        <p>0 Folders, 0 Files</p>
                      </div>
                    </div>
                    <span className="arrow">
                      <svg
                        role="img"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fal"
                        data-icon="angle-right"
                        class="svg-inline--fa fa-angle-right fa-fw"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        style={{ height: "1.4rem" }}
                      >
                        <path
                          fill="currentColor"
                          d="M219.9 266.7L75.89 426.7c-5.906 6.562-16.03 7.094-22.59 1.188c-6.918-6.271-6.783-16.39-1.188-22.62L186.5 256L52.11 106.7C46.23 100.1 46.75 90.04 53.29 84.1C59.86 78.2 69.98 78.73 75.89 85.29l144 159.1C225.4 251.4 225.4 260.6 219.9 266.7z"
                        ></path>
                      </svg>
                    </span>
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

export default OnlineResources;
