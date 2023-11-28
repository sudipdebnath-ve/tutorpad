import React, { useState } from "react";
import MiniSidebar from "../../sidebar/MiniSidebar.js";
import Sidebar from "../../sidebar/Sidebar.js";
import TopBar from "../../sidebar/TopBar.js";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import "./assets/css/style.css";

const StudentAdd = () => {
  const { sidebarToggle } = useUserDataContext();
  const [additionalDetails, setAdditionalDetails] = useState(false);

  React.useEffect(() => {
    const stepMenuOne = document.querySelector(".formbold-step-menu1");
    const stepMenuTwo = document.querySelector(".formbold-step-menu2");
    const stepMenuThree = document.querySelector(".formbold-step-menu3");

    const stepOne = document.querySelector(".formbold-form-step-1");
    const stepTwo = document.querySelector(".formbold-form-step-2");

    const formSubmitBtn = document.querySelector(".formbold-btn");
    const formBackBtn = document.querySelector(".formbold-back-btn");

    formSubmitBtn.addEventListener("click", function (event) {
      event.preventDefault();
      if (stepMenuOne.className === "formbold-step-menu1 active") {
        event.preventDefault();

        stepMenuOne.classList.remove("active");
        stepMenuTwo.classList.add("active");

        stepOne.classList.remove("active");
        stepTwo.classList.add("active");

        formBackBtn.classList.add("active");
        formBackBtn.addEventListener("click", function (event) {
          event.preventDefault();

          stepMenuOne.classList.add("active");
          stepMenuTwo.classList.remove("active");

          stepOne.classList.add("active");
          stepTwo.classList.remove("active");

          formBackBtn.classList.remove("active");
        });
      } else if (stepTwo.className === "formbold-step-menu2 active") {
        formSubmitBtn.textContent = "Submit";
        document.querySelector("form").submit();
      }
    });
  });
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
                <h1 className="text-center">Add New Student</h1>
                <div className="formbold-main-wrapper">
                  <div className="formbold-form-wrapper">
                    <form method="POST">
                      <div className="formbold-steps">
                        <ul>
                          <li className="formbold-step-menu1 active">
                            <span>1</span>
                            Student Details
                          </li>
                          <li className="formbold-step-menu2">
                            <span>2</span>
                            Confirm
                          </li>
                        </ul>
                      </div>

                      <div className="formbold-form-step-1 active">
                        <div className="formbold-input-flex">
                          <div>
                            <label
                              htmlFor="firstname"
                              className="formbold-form-label"
                            >
                              First name
                            </label>
                            <input
                              type="text"
                              name="firstname"
                              className="form-control"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="lastname"
                              className="formbold-form-label"
                            >
                              Last name
                            </label>
                            <input
                              type="text"
                              name="lastname"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <div className="formbold-input-flex">
                          <div>
                            <label
                              htmlFor="email"
                              className="formbold-form-label"
                            >
                              Email Address <span>Optional</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                            />
                          </div>
                          <div>
                            <div>
                              <label
                                htmlFor="phone"
                                className="formbold-form-label"
                              >
                                Phone Number <span>Optional</span>
                              </label>
                              <input
                                type="text"
                                name="phone"
                                className="form-control"
                              />
                            </div>
                            <input type="checkbox" className="sms" name="sms" />
                            SMS Capable
                          </div>
                        </div>
                        <div
                          className="addn-details"
                          onClick={handleAdditionalDetails}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                          <h6>
                            {" "}
                            {additionalDetails ? "Hide" : "Show"} Additional
                            Details
                          </h6>
                        </div>
                        {additionalDetails && (
                          <>
                            <div className="formbold-input-flex">
                              <div>
                                <label
                                  htmlFor="gender"
                                  className="formbold-form-label"
                                >
                                  Gender <span>Optional</span>
                                </label>
                                <input
                                  type="text"
                                  name="gender"
                                  className="form-control"
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="dob"
                                  className="formbold-form-label"
                                >
                                  Date of Birth <span>Optional</span>
                                </label>
                                <input
                                  type="date"
                                  name="dob"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="formbold-input-flex">
                              <div>
                                <label
                                  htmlFor="skype"
                                  className="formbold-form-label"
                                >
                                  Skype Username <span>Optional</span>
                                </label>
                                <input
                                  type="text"
                                  name="skype"
                                  className="form-control"
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="facetime"
                                  className="formbold-form-label"
                                >
                                  FaceTime ID <span>Optional</span>
                                </label>
                                <input
                                  type="text"
                                  name="facetime"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="formbold-input-flex">
                              <div>
                                <label
                                  htmlFor="school"
                                  className="formbold-form-label"
                                >
                                  School <span>Optional</span>
                                </label>
                                <input
                                  type="text"
                                  name="school"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="formbold-input-flex">
                              <div>
                                <label
                                  htmlFor="studentsince"
                                  className="formbold-form-label"
                                >
                                  Student Since <span>Optional</span>
                                </label>
                                <input
                                  type="date"
                                  name="studentsince"
                                  className="form-control"
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="referrer"
                                  className="formbold-form-label"
                                >
                                  Referrer <span>Optional</span>
                                </label>
                                <input
                                  type="text"
                                  name="referrer"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="formbold-input-flex diff">
                              <div>
                                <label
                                  htmlFor="subjects"
                                  className="formbold-form-label"
                                >
                                  Subjects <span>Optional</span>
                                </label>
                                <br></br>
                                <small>
                                  Use a semicolon or press the Enter key to
                                  separate entries
                                </small>
                                <input
                                  type="text"
                                  name="subjects"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="formbold-input-flex">
                              <div>
                                <label
                                  htmlFor="skill"
                                  className="formbold-form-label"
                                >
                                  Skill Level <span>Optional</span>
                                </label>
                                <input
                                  type="text"
                                  name="skill"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="formbold-input-flex">
                              <div>
                                <label
                                  htmlFor="preferences"
                                  className="formbold-form-label"
                                >
                                  Preferences
                                </label>
                                <br></br>
                                <div className="preference">
                                  <input
                                    type="checkbox"
                                    name="emailpreference"
                                  />
                                  Send email lesson reminders
                                </div>
                                <div className="preference">
                                  <input type="checkbox" name="smspreference" />
                                  Send SMS lesson reminders
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        <br></br>
                        <div className="formbold-input-flex diff">
                          <div>
                            <div>
                              <label
                                htmlFor="status"
                                className="formbold-form-label"
                              >
                                Student Status
                              </label>
                            </div>
                            <div className="studentStatus">
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="student_status"
                                />
                                <span
                                  className="bg-design"
                                  style={{
                                    color: "#18790b",
                                    backgroundColor: "#b3f3b3bd",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Active
                                </span>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="student_status"
                                />
                                <span
                                  className="bg-design"
                                  style={{
                                    color: "#005c5c",
                                    backgroundColor: "rgb(179 210 243 / 74%)",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Trial
                                </span>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="student_status"
                                />
                                <span
                                  className="bg-design"
                                  style={{
                                    color: "#e34c00",
                                    backgroundColor: "rgb(253 232 222 / 74%)",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Waiting
                                </span>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="student_status"
                                />
                                <span
                                  className="bg-design"
                                  style={{
                                    color: "#604274",
                                    backgroundColor: "rgb(238 205 249 / 74%)",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Lead
                                </span>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="student_status"
                                />
                                <span
                                  className="bg-design"
                                  style={{
                                    color: "#344242",
                                    backgroundColor: "rgb(208 219 231 / 74%)",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Inactive
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr></hr>
                        <div className="formbold-input-flex diff">
                          <div>
                            <div>
                              <label
                                htmlFor="studentType"
                                className="formbold-form-label"
                              >
                                Student Type
                              </label>
                            </div>
                            <div className="studentStatus">
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="studentType"
                                />
                                Adult
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="studentType"
                                />
                                Child
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="formbold-input-flex diff">
                          <div>
                            <div>
                              <label
                                htmlFor="studentFamily"
                                className="formbold-form-label"
                              >
                                This student's family is a/an
                              </label>
                            </div>
                            <div className="studentStatus">
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="studentFamily"
                                />
                                New Family
                                <br />
                                <small className="d-block">
                                  reates a new account in Families & Invoices
                                </small>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  className="status"
                                  name="studentFamily"
                                />
                                Existing Family
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="formbold-form-step-2">
                        <div>
                          <label
                            htmlFor="message"
                            className="formbold-form-label"
                          >
                            {" "}
                            Message{" "}
                          </label>
                          <textarea
                            rows="6"
                            name="message"
                            id="message"
                            placeholder="Type your message"
                            className="form-control"
                          ></textarea>
                        </div>
                      </div>

                      <div className="formbold-form-btn-wrapper">
                        <button className="formbold-back-btn">Back</button>

                        <button className="formbold-btn">
                          Next Step
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_1675_1807)">
                              <path
                                d="M10.7814 7.33312L7.20541 3.75712L8.14808 2.81445L13.3334 7.99979L8.14808 13.1851L7.20541 12.2425L10.7814 8.66645H2.66675V7.33312H10.7814Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1675_1807">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
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

export default StudentAdd;