import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import { Editor } from "@tinymce/tinymce-react";

const EmailTemplates = () => {
  const { sidebarToggle, userData, fetchData } = useUserDataContext();
  const editorRef = useRef(null);
  const navigate = useNavigate();
  //   const log = () => {
  //     if (editorRef.current) {
  //       console.log(editorRef.current.getContent());
  //     }
  //   };
  //   console.log(userData);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tutorPad"));
    if (!token) {
      navigate("/signin");
    } else {
      fetchData();
    }
  }, []);
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
              <div className="col-xl-12 col-xxl-12">
                <h4>Registration Email Template</h4>
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
                        Promise.reject("See docs to implement AI Assistant")
                      ),
                  }}
                />
                {/* <button onClick={log}>Log editor content</button> */}
              </div>
              <div className="col-xl-12 col-xxl-12 p-3">
                <h4>Forget Password Email Template</h4>
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
                        Promise.reject("See docs to implement AI Assistant")
                      ),
                  }}
                />
                {/* <button onClick={log}>Log editor content</button> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmailTemplates;
