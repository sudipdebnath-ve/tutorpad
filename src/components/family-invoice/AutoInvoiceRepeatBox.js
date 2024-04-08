import React, { useState } from "react";
import DayTabInput from "../form/day-tab-input/DayTabInput";
const AutoInvoiceRepeatBox = ({ event_frequency, set_event_frequency, event_frequency_val, set_event_frequency_val }) => {
    function formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }
    return <div className="recurring">
        <div className="recurring-head" style={{ paddingBottom: "10px" }}>
            <i class="fa fa-undo" aria-hidden="true"></i>{" "}
            <strong>Auto-Invoicing Schedule</strong>
        </div>

        <div className="formbold-input-flex diff">
            <div>
                <div>
                    <label
                        htmlFor="frequency"
                        className="formbold-form-label"
                        style={{ paddingBottom: "5px" }}
                    >
                        Frequency
                    </label>
                </div>
                <div className="input-radio">
                    <input
                        type="radio"
                        value="Weekly"
                        name="frequency"
                        onChange={(e) => set_event_frequency(e.target.value)}
                        checked={event_frequency === "Weekly"}
                    ></input>
                    Weekly
                    <input
                        type="radio"
                        value="Monthly"
                        name="frequency"
                        onChange={(e) => set_event_frequency(e.target.value)}
                        checked={event_frequency === "Monthly"}
                    ></input>
                    Monthly
                    <input
                        type="radio"
                        value="Yearly"
                        name="frequency"
                        onChange={(e) => set_event_frequency(e.target.value)}
                        checked={event_frequency === "Yearly"}
                    ></input>
                    Yearly
                </div>

            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                {
                    <div className="formbold-input-flex align-items-end">
                        <div>
                            <label
                                htmlFor="time"
                                className="formbold-form-label"
                            >
                                Every
                            </label>
                            <br></br>
                            <div style={{ position: "relative" }}>
                                <input
                                    type="text"
                                    name="every"
                                    className="form-control"
                                    style={{
                                        paddingLeft: "25px",
                                        paddingRight: "70px",
                                    }}
                                    value={event_frequency_val}
                                    min={1}
                                    max={100}
                                    onChange={(e) => set_event_frequency_val(e.target.value)}
                                />
                                <span
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                    }}
                                >
                                    {event_frequency === "Daily" || event_frequency === "Weekly" ? "Weeks" : event_frequency}
                                </span>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>



    </div>
}
export default AutoInvoiceRepeatBox;