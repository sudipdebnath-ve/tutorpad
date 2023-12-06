import React, { useState } from "react";
import MiniSidebar from "../../sidebar/MiniSidebar.js";
import Sidebar from "../../sidebar/Sidebar.js";
import TopBar from "../../sidebar/TopBar.js";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import "../assets/css/style.css";
import { Link } from "react-router-dom";

const Details = () => {
  const { sidebarToggle } = useUserDataContext();
  const [additionalDetails, setAdditionalDetails] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const stepMenuOne = document.querySelector(".formbold-step-menu1");
    const stepMenuTwo = document.querySelector(".formbold-step-menu2");

    const stepOne = document.querySelector(".formbold-form-step-1");
    const stepTwo = document.querySelector(".formbold-form-step-2");

    const formSubmitBtn = document.querySelector(".formbold-btn");
    const formBackBtn = document.querySelector(".formbold-back-btn");

    let input = document.querySelectorAll("input[type=text]");

    let req = false;

    for (let [key, value] of Object.entries(input)) {
      // console.log("value", value.value);
      if (
        value.required === true &&
        (value.value === "" || value.value === undefined)
      ) {
        // console.log("value.required", value.required);
        // console.log("value.value", value.value);
        value.className = "border-2 border-danger form-control";
        let label = document.getElementById(value.name);
        label.className = "formbold-form-label text-danger";
        req = true;
        label.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
      } else if (value.required && value.value) {
        // console.log("value", value.value);
        if (req === false) {
          stepMenuOne.classList.remove("active");
          stepMenuTwo.classList.add("active");

          stepOne.classList.remove("active");
          stepTwo.classList.add("active");

          formBackBtn.classList.add("active");
          formSubmitBtn.textContent = "Submit";
        }
        console.log(req);
        value.className = "form-control";
        let label = document.getElementById(value.name);
        label.className = "formbold-form-label";

        formBackBtn.addEventListener("click", function (event) {
          event.preventDefault();

          stepMenuOne.classList.add("active");
          stepMenuTwo.classList.remove("active");

          stepOne.classList.add("active");
          stepTwo.classList.remove("active");

          formBackBtn.classList.remove("active");
        });
      }
    }
  };

  const handleAdditionalDetails = () => {
    if (additionalDetails === true) {
      setAdditionalDetails(false);
    } else {
      setAdditionalDetails(true);
    }
  };
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

        <main className="content studentadd">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
                <div className="formbold-main-wrapper">
                  <div className="back-link">
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    <Link to="/students">
                      {" "}
                      Back to Lending Library Overview
                    </Link>
                  </div>
                  <h1>New Lending Item</h1>
                  <div className="formbold-form-wrapper">
                    <form name="myForm">
                      <div className="formbold-form-step-1 active">
                        <div className="formbold-input-flex">
                          <div>
                            <label
                              htmlFor="title"
                              className="formbold-form-label"
                              id="title"
                            >
                              First name
                            </label>
                            <input
                              type="text"
                              name="title"
                              className="form-control"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="type"
                              className="formbold-form-label"
                              id="type"
                            >
                              Type <span>Optional</span>
                            </label>
                            <input
                              type="text"
                              name="type"
                              className="form-control"
                              placeholder="(i.e. book, CD, DVD, etc.)"
                              required
                            />
                          </div>
                        </div>
                        <div className="formbold-input-flex">
                          <div>
                            <label
                              htmlFor="publisher"
                              className="formbold-form-label"
                            >
                              Publisher <span>Optional</span>
                            </label>
                            <input
                              type="text"
                              name="publisher"
                              className="form-control"
                            />
                          </div>
                          <div>
                            <div>
                              <label
                                htmlFor="serialnumber"
                                className="formbold-form-label"
                              >
                                Serial Number <span>Optional</span>
                              </label>
                              <input
                                type="text"
                                name="serialnumber"
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          className="sms"
                          name="lenditem"
                        />
                        I'd like to lend this item to a student
                        <br></br>
                        <br></br>
                        <div className="formbold-input-flex diff">
                          <div>
                            <label
                              htmlFor="lendto"
                              className="formbold-form-label"
                              id="lendto"
                            >
                              Lend To
                            </label>
                            <input
                              type="text"
                              name="lendto"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="formbold-input-flex">
                          <div>
                            <label
                              htmlFor="datelent"
                              className="formbold-form-label"
                            >
                              Date Lent
                            </label>
                            <input
                              type="date"
                              name="datelent"
                              className="form-control"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="duedate"
                              className="formbold-form-label"
                            >
                              Due Date
                            </label>
                            <input
                              type="date"
                              name="duedate"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="formbold-input-flex diff">
                          <div>
                            <label
                              htmlFor="publicnote"
                              className="formbold-form-label"
                            >
                              Public Note <span>Optional</span>
                            </label>
                            <br></br>

                            <textarea
                              name="publicnote"
                              className="form-control"
                              placeholder="This note will be visible to students who are lent this item"
                            />
                          </div>
                        </div>
                        <div className="formbold-input-flex diff">
                          <div>
                            <label
                              htmlFor="privatenote"
                              className="formbold-form-label"
                            >
                              Private Note <span>Optional</span>
                            </label>
                            <br></br>

                            <textarea
                              name="privatenote"
                              className="form-control"
                              placeholder="This note will only be visible to you"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="formbold-form-btn-wrapper">
                        <button className="formbold-back-btn">Back</button>
                        <div className="btn-end">
                          <Link className="cancel" to="/students">
                            Cancel
                          </Link>

                          <button
                            className="formbold-btn"
                            onClick={handleSubmit}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
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

export default Details;
