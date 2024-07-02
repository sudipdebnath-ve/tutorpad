import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import ReactModal from "react-modal";
import { API_URL } from "../../utils/config.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import payroll from "../users/assets/images/payroll.svg";
import Select from "react-select";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { fetchData } from '../../utils/helper.js';

const BusinessSettings = () => {
  const { userData, sidebarToggle, token, userId, setUserData, setUserId, fetchTimeZones, allTimeZones } =
    useUserDataContext();
  const navigate = useNavigate();
  const { t } = useTranslation()
  const [modalIsOpen, setIsOpen] = useState(false);
  const [attendFlag, setAttendFlag] = useState(false);
  const [availFlag, setAvailFlag] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [businessLogo, setBusinessLogo] = useState(null);
  const [error, setError] = useState({});
  const [initial, setInitial] = useState('');
  const [formData, setFormData] = useState({
    business_name: '',
    logo: '',
    phone_number: '',
    business_address: '',
    region: '',
    timeZone: ''
  });
  const customStyles = {
    content: {
      width: "60%",
      height: "80%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      background: "#6c5a5669",
    },
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tutorPad"));
    const userRole = localStorage.getItem("userRole");
    fetchData(token, userRole, setUserData, setUserId);
    fetchTimeZones();
  }, []);

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);

  useEffect(() => {
    var name = `${userData.business_data?.business_name}`;

    var parts = name.split(" ");
    var initials = "";
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== "") {
        initials += parts[i][0];
      }
    }
    setInitial(initials);
    formData.business_name = userData?.business_data?.business_name;
    formData.phone_number = userData?.business_data?.phone_number;
    formData.business_address = userData?.business_data?.business_address;
    formData.region = userData?.business_data?.region;
    formData.timeZone = userData?.business_data?.timeZone;
    setBusinessLogo(userData?.business_data?.logo);
  }, [userData]);

  function openModal(e) {
    setIsOpen(e);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      const file = files[0];
      // setBusinessLogo(URL.createObjectURL(file));
      setBusinessLogo(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const formSubmit = async (e) => {
    // formData["logo"] = businessLogo;
    formData["user_id"] = userId;
    e.preventDefault();
    const config = {
      method: "PATCH",
      url: `${API_URL}savedata`,
      headers: {
        // "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: {'tenant_data' : formData },
    };
    await axios(config)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveAttendancePreference = () => {
    setAttendFlag(true);
  };
  return (
    <div className="wrapper businesssetting">
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
            isOpen={modalIsOpen === "profile"}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Business Profile Modal"
          >
            <div className="mypreference-modal">
              <div className="close-h">
                <h4>Edit Business Profile</h4>
                <button className="closeModal" onClick={closeModal}>
                  X
                </button>
              </div>
              <form name="studentProfile">
                <div className="row d-flex">
                  <div className="col-xl-4 col-xxl-4">
                    <div className="formbold-input-flex justify-content-center">
                      <div className="student-profile-view">
                        <label htmlFor="photo" className="formbold-form-label">
                          Business Logo <span>Optional</span>
                        </label>
                        <div className="initials py-3">
                          <div className="image-user">
                            {businessLogo ? (
                              <>
                                <img
                                  src={businessLogo}
                                  alt=""
                                />
                              </>
                            ) : (
                              <h2>{initial && initial.toUpperCase()}</h2>
                            )}
                          </div>
                        </div>
                        <div className="text-center pb-2">
                          <small className="input-error-message">
                            {error?.logo?.length ? error.logo[0] : <></>}
                          </small>
                        </div>
                        <input
                          type="file"
                          name="logo"
                          className="form-control b-none"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-8 col-xxl-8">
                    <div className="formbold-form-step-1 active">
                      <div className="formbold-input-flex diff">
                        <div>
                          <label htmlFor="business_name" className="formbold-form-label">
                            Business Name
                          </label>
                          <input
                            type="text"
                            name="business_name"
                            className="form-control"
                            value={formData.business_name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="formbold-input-flex diff">
                        <div>
                          <label htmlFor="phone_number" className="formbold-form-label">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            name="phone_number"
                            className="form-control"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="formbold-input-flex diff">
                        <div>
                          <label htmlFor="business_address" className="formbold-form-label">
                            Business Address
                          </label>
                          <textarea
                            name="business_address"
                            className="form-control"
                            value={formData.business_address}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="formbold-input-flex diff">
                        <div>
                          <label htmlFor="region" className="formbold-form-label">
                            Region
                          </label>
                          <select
                            name="region"
                            className="form-control"
                            value={formData.region}
                            onChange={handleChange}
                            required
                          >
                            <option value="" disabled>Select Region</option>
                            <option value="North America">North America</option>
                            <option value="Europe">Europe</option>
                            <option value="Asia">Asia</option>
                            {/* Add more options as needed */}
                          </select>
                        </div>
                      </div>
                      <div className="formbold-input-flex diff">
                        <div>
                          <label htmlFor="timeZone" className="formbold-form-label">
                            Time Zone
                          </label>
                          <select
                            name="timeZone"
                            className="form-control"
                            value={formData.timeZone}
                            onChange={handleChange}
                            required
                          >
                            <option value="" disabled>Select Time Zone</option>

                            {allTimeZones &&
                              allTimeZones.map((timezone) => {
                                return (
                                  <option key={timezone.id} value={timezone.id} selected={timezone.id == formData.timeZone}>
                                    {timezone.offset ? timezone.offset : ""}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="formbold-form-btn-wrapper">
                    <div className="btn-end">
                      <Link className="cancel" onClick={closeModal}>
                        Cancel
                      </Link>
                      <button className="formbold-btn" onClick={formSubmit}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
        </ReactModal>
        <main className="content">
          <ToastContainer />
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-4 col-xxl-4">
                <div className="card">
                  <div className="card-body">
                    <div className="initials">
                      <div className="image-user">
                        <h2>SD</h2>
                      </div>
                    </div>
                    <div
                      className="edit-user"
                      onClick={(e) => openModal("profile")}
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </div>

                    <div className="title-user">
                      {userData.first_name} {userData.last_name}
                    </div>
                    <div className="email-user">
                      <i class="fa fa-globe" aria-hidden="true"></i> {formData.region}
                    </div>
                    <div className="location-user">
                      <i class="fa fa-clock" aria-hidden="true"></i> {formData.timeZone}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-xxl-8">
                <div className="card">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingOne">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne"
                        >
                          <strong>{t("General")}</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="student-properties-edit sec-acc">
                            <h3>{t("Event Scheduling")}</h3>

                            <div
                              className="student-edit-user"
                              onClick={(e) => setAttendFlag(!e.target.value)}
                            >
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <div className="formbold-input-flex diff">
                            <div>
                              <label
                                htmlFor="preferences"
                                className="formbold-form-label"
                              >
                                {t("Scheduling Conflicts")}
                              </label>
                              <br></br>
                              <div
                                className="preference"
                                style={{ fontSize: "15px" }}
                              >
                                <input
                                  type="checkbox"
                                  name="overdue_attendence"
                                />
                                {t("Check for scheduling conflicts when adding/editing calendar events")}
                              </div>
                            </div>
                          </div>

                        </div>
                        <div className="accordion-body pt-0">
                          <div className="student-properties-edit sec-acc">
                            <h3>Naming Format</h3>
                            <div
                              className="student-edit-user"
                              onClick={(e) => setAttendFlag(!e.target.value)}
                            >
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <div className="formbold-input-flex diff">
                            <div>
                              <div>
                                <label
                                  htmlFor="studentFamily"
                                  className="formbold-form-label"
                                >
                                  Tutor Name Format
                                </label>
                              </div>
                              <div className="input-radio">
                                <input
                                  type="radio"
                                  value="Student"
                                  selected
                                ></input>
                                Last, First
                                <input type="radio" value="Parent"></input>
                                First Last
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
                                  Student Name Format
                                </label>
                              </div>
                              <div className="input-radio">
                                <input
                                  type="radio"
                                  value="Student"
                                  selected
                                ></input>
                                Last, First
                                <input type="radio" value="Parent"></input>
                                First Last
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
                                  Parent Name Format
                                </label>
                              </div>
                              <div className="input-radio">
                                <input
                                  type="radio"
                                  value="Student"
                                  selected
                                ></input>
                                Last, First
                                <input type="radio" value="Parent"></input>
                                First Last
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseTwo"
                          aria-expanded="false"
                          aria-controls="flush-collapseTwo"
                        >
                          <strong>Membership</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingTwo"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="student-properties-edit sec-acc">
                            <h3>Membership Plan</h3>
                            <div
                              className="student-edit-user"
                              onClick={(e) => setAttendFlag(!e.target.value)}
                            >
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <div className="acc-content">
                            <p>Plan</p>
                            <h6>
                              TutorBird Monthly - 2 Tutors & Admins ($ 19.90
                              USD)
                            </h6>
                          </div>
                          <hr></hr>
                          <div className="student-properties-edit sec-acc">
                            <h3>Payment Method</h3>
                          </div>
                          {!availFlag && (
                            <>
                              <div className="payment-method">
                                <h6>
                                  <strong>No payment method on file</strong>
                                </h6>
                                <div className="credit-button">
                                  <button
                                    className="formbold-btn"
                                    style={{
                                      fontSize: "14px",
                                      padding: "6px 16px",
                                    }}
                                    onClick={(e) =>
                                      setAvailFlag(!e.target.value)
                                    }
                                  >
                                    <i
                                      className="fa fa-plus"
                                      aria-hidden="true"
                                    ></i>
                                    Subscribe with Credit Card
                                  </button>
                                  <Link
                                    className="formbold-btn"
                                    style={{
                                      fontSize: "14px",
                                      padding: "6px 16px",
                                    }}
                                    to="https://www.paypal.com/"
                                  >
                                    <i
                                      className="fa fa-plus"
                                      aria-hidden="true"
                                    ></i>
                                    Subscribe with Paypal
                                  </Link>
                                </div>
                              </div>
                            </>
                          )}
                          {availFlag && (
                            <>
                              <div className="availablity">
                                <div className="formbold-input-flex diff">
                                  <div>
                                    <label
                                      htmlFor="availability"
                                      className="formbold-form-label"
                                    >
                                      Add Availability
                                    </label>
                                  </div>
                                </div>

                                <div className="formbold-input-flex diff">
                                  <div>
                                    <label
                                      htmlFor="start_date"
                                      className="formbold-form-label"
                                    >
                                      Card Number
                                    </label>
                                    <input
                                      type="text"
                                      name="start_date"
                                      className="form-control"
                                      placeholder="1234 1234 1234"
                                    />
                                  </div>
                                </div>
                                <div className="formbold-input-flex">
                                  <div>
                                    <label
                                      htmlFor="start_time"
                                      className="formbold-form-label"
                                    >
                                      Expiry
                                    </label>
                                    <input
                                      type="text"
                                      name="start_time"
                                      className="form-control"
                                      placeholder="MM/YY"
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="end_time"
                                      className="formbold-form-label"
                                    >
                                      CVC
                                    </label>
                                    <input
                                      type="text"
                                      name="end_time"
                                      className="form-control"
                                      placeholder="CVC"
                                    />
                                  </div>
                                </div>
                                <div className="formbold-input-flex diff">
                                  <span>
                                    By providing your card information, you
                                    allow TutorBird to charge your card for
                                    future payments in accordance with their
                                    terms.
                                  </span>
                                </div>
                                <div className="formbold-input-flex diff">
                                  <div>
                                    <label
                                      htmlFor="start_time"
                                      className="formbold-form-label"
                                    >
                                      Full Name
                                    </label>
                                    <input
                                      type="text"
                                      name="start_time"
                                      className="form-control"
                                      placeholder="First and last name"
                                    />
                                  </div>
                                </div>
                                <div className="formbold-input-flex diff">
                                  <div>
                                    <label
                                      htmlFor="start_time"
                                      className="formbold-form-label"
                                    >
                                      Country or region
                                    </label>
                                    <Select
                                      options={countries}
                                      value={selectedCountry}
                                      onChange={(selectedOption) =>
                                        setSelectedCountry(selectedOption)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="formbold-input-flex diff">
                                  <div>
                                    <label
                                      htmlFor="start_time"
                                      className="formbold-form-label"
                                    >
                                      Address
                                    </label>
                                    <textarea
                                      name="start_time"
                                      className="form-control"
                                      placeholder="First and last name"
                                    />
                                  </div>
                                </div>
                                <div className="formbold-form-btn-wrapper justify-content-end">
                                  <div className="btn-end">
                                    <Link
                                      className="cancel"
                                      onClick={() => setAvailFlag(false)}
                                    >
                                      Cancel
                                    </Link>

                                    <button
                                      className="formbold-btn"
                                      onClick={saveAttendancePreference}
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          <hr></hr>
                          <div className="student-properties-edit sec-acc">
                            <h3>Membership Fee</h3>
                            <div
                              className="student-edit-user"
                              onClick={(e) => setAttendFlag(!e.target.value)}
                            >
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <div className="acc-content">
                            <h6>
                              <strong>Membership Fee Category</strong>
                            </h6>
                            <p>Memberships and Dues</p>
                          </div>
                          <hr></hr>
                          <div className="student-properties-edit sec-acc">
                            <h3>Billing History</h3>
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-12 col-xxl-12 d-flex order-2 order-xxl-3">
                              <div className="flex-fill w-100">
                                <div className="py-3">
                                  <div className="chart chart-xs payroll-img">
                                    <img src={payroll}></img>
                                  </div>
                                </div>
                                <h6 className="text-center">
                                  <strong>You haven't been billed yet</strong>
                                  <p className="pt-3">
                                    Add your payment method above to subscribe
                                    to TutorBird
                                  </p>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseThree"
                          aria-expanded="false"
                          aria-controls="flush-collapseThree"
                        >
                          <strong>Accounts & Invoices</strong>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingThree"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <div className="student-properties-edit sec-acc">
                            <h3>Family Account</h3>
                            <div
                              className="student-edit-user"
                              onClick={(e) => setAttendFlag(!e.target.value)}
                            >
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <div className="formbold-input-flex diff">
                            <div>
                              <label
                                htmlFor="preferences"
                                className="formbold-form-label"
                              >
                                Payment Methods -
                              </label>
                            </div>
                            <div>
                              <label htmlFor="preferences">
                                None Specified
                              </label>
                            </div>
                          </div>
                          <div className="formbold-input-flex diff">
                            <div>
                              <div>
                                <label
                                  htmlFor="studentFamily"
                                  className="formbold-form-label"
                                >
                                  Default Balance Date
                                </label>
                              </div>
                              <div className="input-radio">
                                <input
                                  type="radio"
                                  value="Student"
                                  selected
                                ></input>
                                Today
                                <input type="radio" value="Parent"></input>
                                End of month
                                <input type="radio" value="Parent"></input>
                                Day of month
                                <input type="radio" value="Parent"></input>
                                Specific date
                              </div>
                            </div>
                          </div>
                          <hr></hr>
                          <div className="student-properties-edit sec-acc">
                            <h3>Invoice Settings</h3>
                            <div
                              className="student-edit-user"
                              onClick={(e) => setAttendFlag(!e.target.value)}
                            >
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                          <div className="formbold-input-flex diff">
                            <div>
                              <div>
                                <label
                                  htmlFor="studentFamily"
                                  className="formbold-form-label"
                                >
                                  Automatic Late Payment Fee
                                </label>
                              </div>
                              <div className="input-radio">
                                <input
                                  type="radio"
                                  value="Student"
                                  selected
                                ></input>
                                None
                                <input type="radio" value="Parent"></input>
                                Fixed amount (₹)
                                <input type="radio" value="Parent"></input>
                                Percentage (%)
                              </div>
                            </div>
                          </div>
                          <div className="formbold-input-flex diff">
                            <div>
                              <label
                                htmlFor="preferences"
                                className="formbold-form-label"
                              >
                                Notifications & Reminders
                              </label>
                              <br></br>
                              <div className="preference">
                                <input type="checkbox" name="emailpreference" />
                                Send SMS invoice notifications and invoice
                                reminders
                              </div>
                              <div className="preference">
                                <input type="checkbox" name="smspreference" />
                                Send an overdue invoice reminder
                              </div>
                            </div>
                          </div>
                          <div className="formbold-input-flex">
                            <div>
                              <label
                                htmlFor="preferences"
                                className="formbold-form-label"
                              >
                                Email Timeframe
                              </label>
                              <p>Between 8:00 AM and 9:00 AM</p>
                            </div>
                          </div>
                        </div>
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

export default BusinessSettings;
