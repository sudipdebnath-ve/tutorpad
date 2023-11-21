import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { API_URL } from "../../utils/config.js";

const EmailTemplates = () => {
  const {
    sidebarToggle,
    userData,
    fetchData,
    emailTemplate,
    emailTemplateData,
  } = useUserDataContext();

  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [emailData, setEmailData] = useState({
    template_title: "",
    template_content: "",
  });
  const [emailOnchange, setEmailOnchange] = useState(false);
  const editorRef = useRef(null);
  const navigate = useNavigate();

  const handleSaveData = async () => {
    const validateconfig = {
      method: "POST",
      url: `${API_URL}user/save_et`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
        user_id: emailData.user_id,
        template_id: emailData.id,
        template_title: emailData.template_title,
        template_content: editorRef.current.getContent(),
      }),
    };
    await axios(validateconfig)
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.message);

        setTimeout(() => {
          setMessage("");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(emailTemplateData);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tutorPad"));
    if (!token) {
      navigate("/signin");
    } else {
      fetchData();
      setToken(token);
    }
    emailTemplate();
  }, []);

  const handleEmailTemplate = async (e) => {
    if (e.target.value === 0) {
      setEmailOnchange(false);
    } else {
      setEmailOnchange(true);
    }
    const validateconfig = {
      method: "GET",
      url: `${API_URL}user/et/${e.target.value}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(validateconfig)
      .then((response) => {
        // console.log(response.data);
        if (response.data.success === true) {
          setEmailData(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setEmailData({ ...emailData, [name]: value });
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
                  <option value="0">Select an Option</option>
                  {emailTemplateData.map((item) => {
                    const { id, template_name } = item;
                    return (
                      <option key={id} value={id}>
                        {template_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {emailOnchange && (
                <>
                  <div className="col-xl-12 col-xxl-12">
                    <div className="input-title">
                      <h6>Template Title</h6>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email Title"
                        name="template_title"
                        value={emailData.template_title}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="editor">
                      <h6>Template Body</h6>
                      <Editor
                        apiKey="pz9f1zsrw3kqfmqecr5si4gbtfljkwc6nhqicfr9dstcvmdn"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={
                          emailData.template_content &&
                          `${emailData.template_content}`
                        }
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
                    </div>
                    {message && (
                      <span
                        style={{
                          color: "green",
                          textAlign: "center",
                          display: "block",
                          transition: "opacity 1s ease",
                          paddingTop: "10px",
                        }}
                      >
                        {message}
                      </span>
                    )}
                    <div className="sub-btn">
                      <input
                        type="button"
                        value="Submit"
                        onClick={handleSaveData}
                      />
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
