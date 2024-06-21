import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../../contextApi/userDataContext.js";
import MiniSidebar from "../../sidebar/MiniSidebar.js";
import Sidebar from "../../sidebar/Sidebar.js";
import TopBar from "../../sidebar/TopBar.js";
import ReactModal from "react-modal";
import { API_URL } from "../../../utils/config.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useTokenStorage } from '../../../utils/helper.js';
import { AuthContext } from '../../registerLogin/AuthContext.js';


const MyPreferences = () => {
  const {
    userData,
    sidebarToggle,
    token,
    userId,
    logOut
  } = useUserDataContext();
  const { role, setRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [initial, setInitial] = useState("");
  const [updatePass, setUpdatePass] = useState({});
  const [error, setError] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const storeToken = useTokenStorage();

  const customStyles = {
    content: {
      width: "35%",
      minHeight: "35%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      background: "#6c5a5669",
      zIndex: 9999, // Ensure the modal overlay has a higher z-index
    },
  };

  const passwordStyles = {
    content: {
      width: "60%",
      height: "60%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
    },
    overlay: {
      background: "#6c5a5669",
    },
  };

  function openModal(e) {
    setIsOpen(e);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal(e) {
    setIsOpen(e);
  }
  
  useEffect(() => {
    var name = `${userData.first_name}${" "}${userData.last_name}`;

    var parts = name.split(" ");
    var initials = "";
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== "") {
        initials += parts[i][0];
      }
    }
    setInitial(initials);
    setProfilePhoto(userData?.dp_url);
  }, [userData]);


  const handleChangePassword = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdatePass({ ...updatePass, [name]: value });
  };

  const formSubmitPassword = async (e) => {
    updatePass["user_id"] = userData.id;

    e.preventDefault();
    const config = {
      method: "PATCH",
      url: `${API_URL}update-password`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: updatePass,
    };
    await axios(config)
      .then((response) => {
        closeModal();
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        if (response && response.status === 200) {
          logOut();
        }
        
      })
      .catch((error) => {
        //console.log(error);
        if (error.response.data.success === false) {
          setError(error.response.data.data.error);
        }
        // console.log(error.response.data.data.error);
      });
  };

  const logOutFromAllDevices = async (e) => {
    e.preventDefault();
    const config = {
      method: "POST",
      url: `${API_URL}logout-all-devices`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(config)
      .then((response) => {
        closeModal();
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        if (response && response.status === 200) {
          logOut();
        }
        
      })
      .catch((error) => {
        if (error.response.data.success === false) {
          setError(error.response.data.data.error);
        }
      });
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

      <div className="main">
        <TopBar />

        <ReactModal
          isOpen={modalIsOpen === "password"}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={passwordStyles}
          contentLabel="Change Password"
        >
          <div className="mypreference-modal">
            <div className="close-h">
              <h4>Change Password 123</h4>
              <button className="closeModal" onClick={closeModal}>
                X
              </button>
            </div>
            <form name="studentProfile">
              <div className="row d-flex">
                <div className="col-xl-12 col-xxl-12">
                  <div className="formbold-form-step-1 active">
                    <div className="formbold-input">
                      <div>
                        <label
                          htmlFor="current_password"
                          className="formbold-form-label"
                          id="current_password"
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          name="current_password"
                          className="form-control"
                          onChange={handleChangePassword}
                        />
                        <div className="pt-2">
                          {error?.length > 0 && (
                            <small className="input-error-message">{error}</small>
                          )}
                          {error?.current_password?.length > 0 && (
                            <small className="input-error-message">
                              {error.current_password[0]}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="formbold-input">
                      <div>
                        <label
                          htmlFor="new_password"
                          className="formbold-form-label"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          name="new_password"
                          className="form-control"
                          onChange={handleChangePassword}
                        />
                        <div className="pt-2">
                          {error?.new_password?.length > 0 && (
                            <small className="input-error-message">
                              {error.new_password[0]}
                            </small>
                          )}
                        </div>
                      </div>
                      <div>
                        <div>
                          <label
                            htmlFor="change_new_password"
                            className="formbold-form-label"
                            id="change_new_password"
                          >
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            name="confirm_new_password"
                            className="form-control"
                            onChange={handleChangePassword}
                          />
                          <div className="pt-2">
                            {error?.confirm_new_password?.length > 0 && (
                              <small className="input-error-message">
                                {error.confirm_new_password[0]}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr></hr>
                <div className="formbold-form-btn-wrapper">
                  <div className="btn-end">
                    <Link className="cancel" onClick={closeModal}>
                      Cancel
                    </Link>

                    <button
                      className="formbold-btn"
                      onClick={formSubmitPassword}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ReactModal>
        <ReactModal
          isOpen={showDeleteModal}
          onAfterOpen={afterOpenModal}
          onRequestClose={() => setShowDeleteModal(false)}
          style={customStyles}
          contentLabel="Delete Invoice Modal"
        >
          <div className="calendar-modal">
            <div
              className="close-h"
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              <button
                className="closeModal"
                style={{
                  backgroundColor: "transparent",
                  fontSize: "25px",
                  color: "red",
                }}
                onClick={()=>setShowDeleteModal(false)}
              >
                X
              </button>
            </div>
            <div className="calendar-date-time">
              <h3 className="fw-bold">Confirm Logout</h3>
              <div className="formbold-input-flex">
                <p>
                Are you sure you want to logout from all devices?
                </p>
              </div>
              <hr />
              <div className="formbold-form-btn-wrapper">
                <div className="btn-end">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="cancel"
                  >
                    No
                  </button>
                  <button
                    onClick={(e) => logOutFromAllDevices(e)}
                    className="formbold-btn"
                    style={{backgroundColor:'red'}}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ReactModal>
        <main className="content">
          <ToastContainer />
          <div className="container-fluid p-0">
            <div className="d-flex justify-content-center align-items-center">
              <div className="col-xl-6 col-xxl-6">
                <div className="card">
                  <div className="card-body">
                    <div className="initials">
                      <div className="image-user">
                        {userData?.dp_url ? (
                          <>
                            <img src={userData?.dp_url} alt="" />
                          </>
                        ) : (
                          <h2>{initial}</h2>
                        )}
                      </div>
                    </div>
                    <div className="title-user">
                      {userData.first_name} {userData.last_name}
                    </div>
                    <div className="email-user">
                      <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
                      {userData.email}
                    </div>
                    <div className="location-user">
                      <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                      First Available Location
                    </div>
                    <div className="logout-user">
                      <Link className="logout" onClick={()=>setShowDeleteModal(true)}>
                        Log Out of All Devices
                      </Link>
                      <Link onClick={(e) => openModal("password")}>
                        Change Password
                      </Link>
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

export default MyPreferences;
