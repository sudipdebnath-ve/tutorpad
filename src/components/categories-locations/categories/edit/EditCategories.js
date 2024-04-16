import React, { useState, useEffect } from "react";
import MiniSidebar from "../../../sidebar/MiniSidebar.js";
import Sidebar from "../../../sidebar/Sidebar.js";
import TopBar from "../../../sidebar/TopBar.js";
import { useUserDataContext } from "../../../../contextApi/userDataContext.js";
import "../../../../components/users/students/assets/css/style.css";
import { Link } from "react-router-dom";
import { API_URL } from "../../../../utils/config.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import SelectBox from "../../../form/select-box/SelectBox.js";
import LabelInputBox from "../../../form/label-input-box/LabelInputBox.js";
import InputBox from "../../../form/input-box/InputBox.js";
import ColorSelectBox from "../../../form/color-select-box/ColorSelectBox.js";
import OptionBox from "../../../form/option-box/OptionBox.js";
import InputCheckBox from "../../../form/input-check-box/InputCheckBox.js";
import {
  getPayrollOverideTypes,
  updateCategories,
} from "../../../../services/categoriesService.js";
import { getCategoriesDetails } from "../../../../services/categoriesService.js";
import { useParams } from "react-router-dom";
import { colors } from "../../../../utils/constant.js";
const EditCategories = () => {
  const { fetchData, sidebarToggle, token, userId } = useUserDataContext();
  const navigate = useNavigate();
  const param = useParams();
  const [color, setColor] = useState({});
  const ListComponent = ({ title, text }) => {
    return (
      <div>
        <div className="formbold-form-label">{title}</div>
        <div>{text}</div>
      </div>
    );
  };
  const [eventcatPayrollList, setEventcatPayrollList] = useState([]);
  const [eventcatPayrollListData, setEventcatPayrollListData] = useState([]);
  const [timeList, setTimeList] = useState([
    {
      label: ListComponent({ title: "No Reminder", text: "" }),
      text: "No Reminder",
      value: "0",
    },
    {
      label: ListComponent({ title: "1 Hours Before", text: "" }),
      text: "1 Hours Before",
      value: "1",
    },
    {
      label: ListComponent({ title: "2 Hours Before", text: "" }),
      text: "2 Hours Before",
      value: "2",
    },
    {
      label: ListComponent({ title: "3 Hours Before", text: "" }),
      text: "3 Hours Before",
      value: "3",
    },
    {
      label: ListComponent({ title: "1 Day Before", text: "" }),
      text: "1 Day Before",
      value: "24",
    },
    {
      label: ListComponent({ title: "2 Day Before", text: "" }),
      text: "2 Day Before",
      value: "48",
    },
    {
      label: ListComponent({ title: "Custom", text: "" }),
      text: "Custom",
      value: "-1",
    },
  ]);
  const [isColorBoxOpen, setIsColorBoxOpen] = useState(false);
  const [eventcatName, setEventcatName] = useState("");
  const [eventcatColor, setEventcatColor] = useState("");
  const [eventcatPayroll, setEventcatPayroll] = useState("");

  const [eventcatEmailReminder, setEventcatEmailReminder] = useState(0);
  const [
    eventcatEmailReminderDefaultValue,
    setEventcatEmailReminderDefaultValue,
  ] = useState({});
  const [isEventcatEmailReminder, setIsEventcatEmailReminder] = useState(false);
  const [eventcatSmsReminder, setEventcatSmsReminder] = useState(0);
  const [eventcatSmsReminderDefaultValue, setEventcatSmsReminderDefaultValue] =
    useState({});
  const [isEventcatSmsReminder, setIsEventcatSmsReminder] = useState(false);
  const [eventcatPayrollValue, setEventcatPayrollValue] = useState("");
  const [eventcatMakeupCredits, setEventcatMakeupCredits] = useState(false);
  const [eventcatBlockedDates, setEventcatBlockedDates] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tutorPad"));
    if (!token) {
      navigate("/signin");
    } else {
      getPayrollOverideTypesHandller();
      getCategoriesDetailsHandler();
    }
  }, []);

  const getCategoriesDetailsHandler = async () => {
    const res = await getCategoriesDetails(param.id);
    if (res.data) {
      setEventcatName(res.data.eventcat_name);
      setEventcatColor(colors.find((f) => f.code === res.data.eventcat_color));
      setEventcatPayroll(res.data.eventcat_potype);
      setEventcatPayrollValue(res.data.eventcat_potype_val);
      setEventcatEmailReminder(res.data.eventcat_email_reminder);
      setEventcatSmsReminder(res.data.eventcat_sms_reminder);
      setEventcatMakeupCredits(res.data.eventcat_makeup_credits);
      setEventcatBlockedDates(res.data.eventcat_blocked_dates);
      setEventcatSmsReminderDefaultValue(
        timeList.find((f) => f.value === res.data.eventcat_sms_reminder)
      );
      setEventcatEmailReminderDefaultValue(
        timeList.find((f) => f.value === res.data.eventcat_email_reminder)
      );
      setIsEventcatEmailReminder(
        timeList.find((f) => f.value === res.data.eventcat_email_reminder) !==
          undefined
          ? false
          : true
      );
      setIsEventcatSmsReminder(
        timeList.find((f) => f.value === res.data.eventcat_sms_reminder) !==
          undefined
          ? false
          : true
      );
    } else {
      navigate("/calendar/categories");
    }
  };
  const getPayrollOverideTypesHandller = async () => {
    const res = await getPayrollOverideTypes();
    const list = await res.data.map((e) => {
      return {
        label: ListComponent({ title: e.po_title, text: e.po_description }),
        text: e.po_title,
        value: e.id,
      };
    });
    setEventcatPayrollListData(res.data);
    setEventcatPayrollList(list);
  };
  const formSubmit = async () => {
    const formData = {
      eventcat_name: eventcatName,
      eventcat_color: eventcatColor.code,
      eventcat_potype: eventcatPayroll,
      eventcat_potype_val: eventcatPayrollValue,
      eventcat_email_reminder: eventcatEmailReminder,
      eventcat_sms_reminder: eventcatSmsReminder,
      eventcat_makeup_credits: eventcatMakeupCredits,
      eventcat_blocked_dates: eventcatBlockedDates,
    };
    const response = await updateCategories(formData, param.id);
    if (response.success == true) {
      toast.success(response.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/calendar/categories");
    } else {
      toast.error(JSON.stringify(response.response.data.data), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const makeUpCreditOnchange = (value) => {
    setEventcatMakeupCredits(!eventcatMakeupCredits);
  };
  const blockedDatesOnchange = (value) => {
    setEventcatBlockedDates(!eventcatBlockedDates);
  };

  const eventcatEmailReminderOnchange = (value) => {
    if (value === "-1") {
      setIsEventcatEmailReminder(true);
      setEventcatEmailReminder(0);
    } else {
      setEventcatEmailReminder(value);
      setIsEventcatEmailReminder(false);
    }
  };

  const eventcatSmsReminderOnChange = (value) => {
    if (value === "-1") {
      setIsEventcatSmsReminder(true);
      setEventcatSmsReminder(0);
    } else {
      setEventcatSmsReminder(value);
      setIsEventcatSmsReminder(false);
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

      <div className="main">
        <TopBar />

        <main className="content studentadd">
          <ToastContainer />
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
                <div className="formbold-main-wrapper">
                  <div className="back-link">
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    <Link to="/calendar/categories"> Back to Categories</Link>
                  </div>
                  <h1>Add New Categories</h1>
                  <div className="formbold-form-wrapper">
                    <div className="formbold-steps">
                      <ul>
                        <li className="formbold-step-menu1 active">
                          Categories Details
                        </li>
                      </ul>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <InputBox
                          label={"Name"}
                          setValue={setEventcatName}
                          value={eventcatName}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <ColorSelectBox
                          label={"Colors"}
                          isColorBoxOpen={isColorBoxOpen}
                          setColor={setEventcatColor}
                          color={eventcatColor}
                          setIsColorBoxOpen={setIsColorBoxOpen}
                        />
                      </div>
                      <div className="col-md-6">
                        {eventcatPayrollListData?.find(
                          (f) => f.id === eventcatPayroll
                        )?.po_is_numeric === 1 ? (
                          <LabelInputBox
                            inputValue={eventcatPayrollValue}
                            setInputValue={setEventcatPayrollValue}
                            label={"Payroll Override"}
                            onClear={() => setEventcatPayroll("")}
                            unit={
                              eventcatPayrollListData.find(
                                (f) => f.id === eventcatPayroll
                              )?.po_unit_formatted
                            }
                          />
                        ) : (
                          <SelectBox
                            label={"Payroll Override"}
                            options={eventcatPayrollList}
                            onChangeSelect={setEventcatPayroll}
                          />
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        {isEventcatEmailReminder ? (
                          <LabelInputBox
                            inputValue={eventcatEmailReminder}
                            setInputValue={setEventcatEmailReminder}
                            label={"Email Reminders"}
                            onClear={() => setIsEventcatEmailReminder(false)}
                            unit={"Hours Before"}
                          />
                        ) : (
                          <SelectBox
                            label={"Email Reminders"}
                            selectValue={eventcatEmailReminderDefaultValue}
                            options={timeList}
                            onChangeSelect={eventcatEmailReminderOnchange}
                          />
                        )}
                      </div>
                      <div className="col-md-6">
                        {isEventcatSmsReminder ? (
                          <LabelInputBox
                            inputValue={eventcatSmsReminder}
                            setInputValue={setEventcatSmsReminder}
                            label={"SMS Reminders"}
                            onClear={() => setIsEventcatSmsReminder(false)}
                            unit={"Hours Before"}
                          />
                        ) : (
                          <SelectBox
                            label={"SMS Reminders"}
                            selectValue={eventcatSmsReminderDefaultValue}
                            options={timeList}
                            onChangeSelect={eventcatSmsReminderOnChange}
                          />
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <InputCheckBox
                          isChecked={eventcatMakeupCredits}
                          onChange={makeUpCreditOnchange}
                          label={"Make-Up Credit"}
                          title={
                            "This category blocks other recurring events (e.g. vacation)"
                          }
                          description={""}
                        />
                        <InputCheckBox
                          isChecked={eventcatBlockedDates}
                          onChange={blockedDatesOnchange}
                          label={"Blocked Dates"}
                          title={
                            "Allow make-up credits to be used for this event type"
                          }
                          description={
                            "This category prevents new events from being added on the same day/time (e.g. vacation) Existing events on the calendar will not be deleted when events in this category are added"
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="formbold-form-btn-wrapper">
                          <button className="formbold-back-btn">Back</button>
                          <div className="btn-end">
                            <Link className="cancel" to="/calendar/categories">
                              Cancel
                            </Link>
                            <button
                              className="formbold-btn"
                              onClick={formSubmit}
                            >
                              Submit
                            </button>
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

export default EditCategories;
