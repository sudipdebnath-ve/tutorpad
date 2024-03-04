import React,{useRef} from "react";
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import { ToastContainer } from "react-toastify";
import './style.css';
import SideSelectionBox from "./SideSelectionBox.js";
import { Editor } from '@tinymce/tinymce-react';
import { Link } from "react-router-dom";
import { apiKey } from "./GroupNote.js";
const Attendance = ()=>{

    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };
    
    const {
        sidebarToggle
      } = useUserDataContext();
    return <div className="wrapper">
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
                    <ToastContainer />
                    <div className="container-fluid p-0">
                        <div className="row">
                            <div className="col-md-4">
                               <SideSelectionBox/>
                            </div>
                            <div className="col-md-8">
                                {/* <GroupNote/> */}
                                <div className="container-fluid p-0 bg-color bg-color-white main-content-area">
                                    <div className="upper-box-area">
                                        <h4>Attendance</h4>
                                        <p>Record attendance for this lesson</p>
                                        <label className="title">Attendance Status</label>
                                        <div className="attendance-box">
                                            <label>
                                                <input type="radio" name="attendance"/>
                                                <span>Unrecorded</span>
                                            </label>
                                            <label>
                                                <input type="radio" name="attendance"/>
                                                <span>Present</span>
                                            </label>
                                            <label>
                                                <input type="radio" name="attendance"/>
                                                <span>Absent</span>
                                            </label>
                                            <label>
                                                <input type="radio" name="attendance"/>
                                                <span>Tutor Canceled</span>
                                            </label>
                                        </div>
                                        <div className="attendance-box">
                                            <label>
                                                <input type="checkbox" name="attendance-chk"/>
                                                <span>Student was late</span>
                                            </label>
                                        </div>
                                        <label className="title">Attendance Billing</label>
                                        <div className="attendance-box">
                                            <label>
                                                <input type="radio" name="attendance"/>
                                                <span>Use Make-Up Credit</span>
                                            </label>
                                            <label>
                                                <input type="radio" name="attendance"/>
                                                <span>Lesson is Billable</span>
                                            </label>
                                        </div>
                                        <div className="attendance-box">
                                            <label>
                                                <input type="radio" name="attendance"/>
                                                <span>Notice Given (Not Billable)</span>
                                            </label>
                                            <label>
                                                <input type="radio" name="attendance"/>
                                                <span>Absence is Billable</span>
                                            </label>
                                            <label>
                                                <input type="radio" name="attendance"/>
                                                <span>Bill & Give Make-Up Credit</span>
                                            </label>
                                        </div>
                                        <div className="alert alert-warning">
                                            Use Make-Up options are not available because Kumar, Ramesh has insufficient credits (Kumar, Ramesh has 0 of 1 make-up credits required).
                                        </div>
                                        <label className="title">Lesson Price</label>
                                        <div className="attendance-box">
                                            <label>
                                                <input className="form-control" type="text" name="attendance"/>
                                            </label>
                                            <label>
                                                <input type="checkbox" name="attendance"/>
                                                <span>Student paid at lesson</span>
                                            </label>
                                        </div>
                                        <h4>Lesson Details (Optional)</h4>
                                        <p>Add notes, assignments, and link online resources</p>
                                        <Editor
                                            apiKey={apiKey}
                                            onInit={(evt, editor) => editorRef.current = editor}
                                        />
                                    </div>
                                    <div className="lower-box-area">
                                        <div className="formbold-form-btn-wrapper">
                                            <div className="btn-end">
                                                <Link className="cancel">
                                                Cancel
                                                </Link>
                                                <button className="formbold-btn">
                                                    Save
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
            </div>;
}
export default Attendance;