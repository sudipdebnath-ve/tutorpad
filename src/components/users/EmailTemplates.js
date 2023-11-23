import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import { Sidebar, MiniSidebar, TopBar } from "../sidebar";
import TinyMCE from "../TinyMCE.js";

const EmailTemplates = () => {
  const {
    sidebarToggle,
    fetchData,
    emailTemplate,
    emailTemplateData,
    handleEmailTemplate,
    emailOnchange,
    token,
  } = useUserDataContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      fetchData();
    }
    emailTemplate();
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
                  <TinyMCE />
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
