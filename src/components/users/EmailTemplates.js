import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import { Editor } from "@tinymce/tinymce-react";

const EmailTemplates = () => {
  const { sidebarToggle, userData, fetchData } = useUserDataContext();
  const [email, setEmail] = useState("");
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  console.log(userData);
  // const handleImageUpload = (blobInfo, progress, failure) => {
  //   return new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open("POST", "http://localhost:3000/server.php", true);

  //     const formData = new FormData();
  //     formData.append("file", blobInfo.blob(), blobInfo.filename());
  //     //console.log(blobInfo.filename())

  //     xhr.upload.onprogress = (e) => {
  //       progress((e.loaded / e.total) * 100);
  //       if (progress && typeof progress === "function") {
  //         const percent = 0;
  //         progress(percent);
  //       }
  //     };

  //     xhr.onload = () => {
  //       if (xhr.status === 403) {
  //         reject({ message: "HTTP Error: " + xhr.status, remove: true });
  //         return;
  //       }

  //       if (xhr.status < 200 || xhr.status >= 300) {
  //         reject("HTTP Error: " + xhr.status);
  //         return;
  //       }

  //       const json = JSON.parse(xhr.responseText);

  //       if (!json || typeof json.location != "string") {
  //         reject("Invalid JSON: " + xhr.responseText);
  //         return;
  //       }

  //       resolve(json.location);
  //     };

  //     xhr.onerror = () => {
  //       reject({ message: "Image upload failed", remove: true });
  //       if (failure && typeof failure === "function") {
  //         failure("Image upload failed");
  //       }
  //     };

  //     xhr.send(formData);
  //   });
  // };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tutorPad"));
    if (!token) {
      navigate("/signin");
    } else {
      fetchData();
    }
  }, []);

  const handleEmailTemplate = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
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

        <main className="content">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12 choose-template">
                <h5>Choose Template</h5>
                <select onChange={handleEmailTemplate}>
                  <option>Select an Option</option>
                  <option value="registration">Registration</option>
                  <option value="forget">Forget Password</option>
                </select>
              </div>
              {email === "registration" && (
                <>
                  <div className="col-xl-12 col-xxl-12">
                    <div className="input-title">
                      <h6>Template Title</h6>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email Title"
                        name="email_title"
                      ></input>
                    </div>
                    <div className="editor">
                      <h6>Template Body</h6>
                      <Editor
                        apiKey="pz9f1zsrw3kqfmqecr5si4gbtfljkwc6nhqicfr9dstcvmdn"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={`Hello ${userData.first_name}`}
                        init={{
                          height: "400",
                          plugins:
                            "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                          toolbar:
                            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                          tinycomments_mode: "embedded",
                          // tinycomments_author: "Author name",
                          // mergetags_list: [
                          //   { value: "First.Name", title: "First Name" },
                          //   { value: "Email", title: "Email" },
                          // ],
                          ai_request: (request, respondWith) =>
                            respondWith.string(() =>
                              Promise.reject(
                                "See docs to implement AI Assistant"
                              )
                            ),
                        }}
                      />
                      {/* <button onClick={log}>Log editor content</button> */}
                    </div>
                    <div className="sub-btn">
                      <input type="submit" value="Submit" />
                    </div>
                  </div>
                </>
              )}
              {email === "forget" && (
                <>
                  <div className="col-xl-12 col-xxl-12">
                    <div className="input-title">
                      <h6>Template Title</h6>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email Title"
                        name="email_title"
                      ></input>
                    </div>
                    <div className="editor">
                      <h6>Template Body</h6>
                      <Editor
                        apiKey="pz9f1zsrw3kqfmqecr5si4gbtfljkwc6nhqicfr9dstcvmdn"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={`Hello ${userData.first_name}`}
                        init={{
                          height: "400",
                          plugins:
                            "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                          toolbar:
                            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                          tinycomments_mode: "embedded",
                          // images_upload_url: "http://localhost:8000/server.php",
                          // automatic_uploads: true,
                          // images_reuse_filename: true,
                          // images_upload_handler: handleImageUpload,
                          // tinycomments_author: "Author name",
                          // mergetags_list: [
                          //   { value: "First.Name", title: "First Name" },
                          //   { value: "Email", title: "Email" },
                          // ],
                          paste_data_images: true,
                          ai_request: (request, respondWith) =>
                            respondWith.string(() =>
                              Promise.reject(
                                "See docs to implement AI Assistant"
                              )
                            ),
                        }}
                      />
                      {/* <button onClick={log}>Log editor content</button> */}
                    </div>
                    <div className="sub-btn">
                      <input type="submit" value="Submit" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmailTemplates;
