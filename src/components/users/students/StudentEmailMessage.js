import React from "react";
import MiniSidebar from "../../sidebar/MiniSidebar.js";
import Sidebar from "../../sidebar/Sidebar.js";
import TopBar from "../../sidebar/TopBar.js";
import "./assets/css/style.css";
import { Link } from "react-router-dom";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import { Editor } from "@tinymce/tinymce-react";

const StudentEmailMessage = () => {
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

      <div className="main bg-color">
        <TopBar />

        <main className="content studentemail">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
                <div className="formbold-main-wrapper">
                  <div className="back-link">
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    <Link to="/students"> Back to Students</Link>
                  </div>
                  <h1>New Email</h1>
                  <div className="formbold-form-wrapper">
                    <div className="formbold-input-flex diff">
                      <div className="from">
                        <label className="formbold-form-label">From</label>
                        <p>Sudip Debnath shashisingh@virtualemployee.com</p>
                      </div>
                    </div>
                    <div className="formbold-input-flex diff">
                      <div className="to">
                        <label className="formbold-form-label">To</label>
                        <br></br>
                        <small className="mb-1 d-block">
                          Multiple recipients are automatically BCC'ed.
                        </small>
                        <div className="formbold-input-flex">
                          <input
                            type="text"
                            name="to"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input-flex diff">
                      <div className="to">
                        <label className="formbold-form-label">
                          Extra Recipients
                        </label>
                        <br></br>
                        <small className="mb-1 d-block">
                          Use a semicolon or press the Enter key to add
                          recipients who are not in TutorBird
                        </small>
                        <div className="formbold-input-flex">
                          <input
                            type="text"
                            name="extra_recipients"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input-flex diff">
                      <div className="to">
                        <label className="formbold-form-label">Subject</label>
                        <br></br>

                        <div className="formbold-input-flex">
                          <input
                            type="text"
                            name="subject"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input-flex diff">
                      <div className="to">
                        <label className="formbold-form-label">Message</label>
                        <br></br>

                        <Editor
                          apiKey="pz9f1zsrw3kqfmqecr5si4gbtfljkwc6nhqicfr9dstcvmdn"
                          // onInit={(evt, editor) =>
                          //   (editorRef.current = editor)
                          // }
                          // initialValue={
                          //   emailData.template_content &&
                          //   `${emailData.template_content}`
                          // }
                          init={{
                            height: "400",
                            plugins:
                              "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                            toolbar:
                              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                            tinycomments_mode: "embedded",
                            images_upload_url:
                              "http://localhost/php/server.php",
                            automatic_uploads: true,
                            images_reuse_filename: true,
                            //   images_upload_handler: handleImageUpload,
                            tinycomments_author: "Tutor Pad",
                            mergetags_list: [
                              { value: "UserName", title: "User Name" },
                              { value: "FirstName", title: "First Name" },
                              { value: "LastName", title: "Last Name" },
                              { value: "Email", title: "Email" },
                            ],
                            ai_request: (request, respondWith) =>
                              respondWith.string(() =>
                                Promise.reject(
                                  "See docs to implement AI Assistant"
                                )
                              ),
                          }}
                        />
                      </div>
                    </div>
                    <div className="formbold-input-flex diff">
                      <div className="to">
                        <label className="formbold-form-label">
                          Attach Files
                        </label>
                        <br></br>

                        <div className="formbold-input-flex">
                          <input
                            type="file"
                            name="file"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="formbold-input-flex">
                      <input type="checkbox" name="cc" />
                      CC me on this email
                    </div>
                    <div className="formbold-input-flex diff">
                      <div>
                        <label
                          htmlFor="billing"
                          className="formbold-form-label"
                        >
                          Send Email
                        </label>
                        <br></br>
                        <div className="preference">
                          <input type="radio" name="send_email" />
                          Immediately <br></br>
                          <small> (Send this email as soon as possible)</small>
                        </div>
                        <div className="preference">
                          <input type="radio" name="send_email" />
                          Automatically at a future date/time{" "}
                          <small>
                            {" "}
                            (Choose a date and time to send this email)
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <label htmlFor="gender" className="formbold-form-label">
                          date
                        </label>
                        <input
                          type="date"
                          name="gender"
                          className="form-control"
                        />
                      </div>
                      <div>
                        <label htmlFor="time" className="formbold-form-label">
                          Time
                        </label>
                        <input
                          type="time"
                          name="dob"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="formbold-form-btn-wrapper">
                      <button className="formbold-back-btn">Back</button>
                      <div className="btn-end">
                        <Link className="cancel" to="/students">
                          Cancel
                        </Link>

                        <button className="formbold-btn">
                          Send
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

export default StudentEmailMessage;
