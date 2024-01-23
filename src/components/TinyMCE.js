import { Editor } from "@tinymce/tinymce-react";
import { useState, useRef } from "react";
import { useUserDataContext } from "../contextApi/userDataContext.js";
import axios from "axios";
import { API_URL } from "../utils/config.js";

export default function TinyMCE() {
  const [message, setMessage] = useState("");
  const editorRef = useRef(null);

  const { emailData, setEmailData, token } = useUserDataContext();

  const handleImageUpload = (blobInfo, progress, failure) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${API_URL}uploadmedia`, true);

      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());
      console.log(blobInfo.filename());

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
        if (progress && typeof progress === "function") {
          const percent = 0;
          progress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: "HTTP Error: " + xhr.status, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject("HTTP Error: " + xhr.status);
          return;
        }

        const json = JSON.parse(xhr.responseText);

        if (!json || typeof json.location != "string") {
          reject("Invalid JSON: " + xhr.responseText);
          return;
        }

        resolve(json.location);
      };

      xhr.onerror = () => {
        reject({ message: "Image upload failed", remove: true });
        if (failure && typeof failure === "function") {
          failure("Image upload failed");
        }
      };

      xhr.send(formData);
    });
  };
  const handleSaveData = async () => {
    const validateconfig = {
      method: "POST",
      url: `${API_URL}save_et`,
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
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setEmailData({ ...emailData, [name]: value });
  };

  return (
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
              emailData.template_content && `${emailData.template_content}`
            }
            init={{
              height: "400",
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              images_upload_url: "http://localhost/php/server.php",
              automatic_uploads: true,
              images_reuse_filename: true,
              images_upload_handler: handleImageUpload,
              tinycomments_author: "Tutor Pad",
              mergetags_list: [
                { value: "UserName", title: "User Name" },
                { value: "FirstName", title: "First Name" },
                { value: "LastName", title: "Last Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
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
          <input type="button" value="Submit" onClick={handleSaveData} />
        </div>
      </div>
    </>
  );
}
