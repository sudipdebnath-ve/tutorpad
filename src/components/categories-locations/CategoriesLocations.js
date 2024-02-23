import React, { useState } from "react";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import students from "../users/assets/images/students.svg";
import Categories from './categories/Categories.js';
import Locations from "./locations/Locations.js";
const CategoriesLocations = () => {
  const { sidebarToggle, loading } = useUserDataContext();

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

      <div className="main bg-color">
        <TopBar />
        <main className="content student">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="categories-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#categories"
                      type="button"
                      role="tab"
                      aria-controls="categories"
                      aria-selected="true"
                    >
                      Categories
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="location-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#location"
                      type="button"
                      role="tab"
                      aria-controls="location"
                      aria-selected="false"
                    >
                     Locations
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="categories"
                    role="tabpanel"
                    aria-labelledby="categories-tab"
                  >
                    <Categories/>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="location"
                    role="tabpanel"
                    aria-labelledby="location-tab"
                  >
                    <Locations/>
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

export default CategoriesLocations;
