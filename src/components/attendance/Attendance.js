import React,{useRef, useEffect, useState} from "react";
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
import { getEventDetailsById,getAttendanceTypes } from "../../services/calenderService.js";
import { useParams } from "react-router-dom";

const Attendance = ()=>{
    const param = useParams();
    const editorRef = useRef(null);
    const [attendees_info, set_attendees_info] = useState([]);
    const [start_date, set_start_date] = useState("");
    const [start_time, set_start_time] = useState("");
    const [end_time, set_end_time] = useState("");
    const [require_makeup_credits, set_require_makeup_credits] = useState(0);
    const [attendees_ids,set_attendees_ids] = useState([]);
    const [attendance_types,set_attendance_types] = useState([]);

    const [student_id,set_student_id] = useState("");
    const [attendance_status,set_attendance_status] = useState(1);
    const [is_late,set_is_late] = useState(false);
    const [lesson_price,set_lesson_price] = useState(0);
    const [billing_type,set_billing_type] = useState("");
    const [lesson_details,set_lesson_details] = useState("");
    const [email_tutor,set_email_tutor] = useState(false);
    const [email_student,set_email_student] = useState(false);
    const [is_paid_at_lesson,set_is_paid_at_lesson] = useState(false);
    
    
    const {
        sidebarToggle
      } = useUserDataContext();

    const getAttendanceTypesHandler = async ()=>{
        const result = await getAttendanceTypes();
        set_attendance_types(result.data);
    }
    const takeAttendanceHandler= async () => {
        const result = await getEventDetailsById(param.id);
        const attendees_info = result?.data?.attendees_info;
        console.log("DATA=>",result?.data);
        set_attendees_info(attendees_info);
        set_start_date(result?.data?.start_date);
        set_start_time(result?.data?.start_time);
        set_end_time(result?.data?.end_time);
        set_require_makeup_credits(result?.data?.require_makeup_credits);
      }
    const attendanceSubmitHandler = ()=>{
        
        if(attendees_ids.length>0)
        {
            let dataObj = {
                student_id:attendees_ids,
                occurrence_id:param.id,
                attendance_status:attendance_status,
                is_late:is_late?1:0,
                lesson_price:lesson_price,
                email_tutor:email_tutor?1:0,
                email_student:email_student?1:0,
                is_paid_at_lesson:is_paid_at_lesson?1:0,
            }
            if (editorRef.current) {
                dataObj.lesson_details = editorRef.current.getContent();
                // console.log(editorRef.current.getContent());
              }
            if(billing_type=='used_makeup_credits')
            {
                dataObj.given_notice = 0;
                dataObj.give_makeup_credit = 0;
                dataObj.lesson_is_billable = 0;
                dataObj.used_makeup_credits = 1;
            }else if(billing_type=='lesson_is_billable')
            {
                dataObj.given_notice = 0;
                dataObj.give_makeup_credit = 0;
                dataObj.lesson_is_billable = 1;
                dataObj.used_makeup_credits = 0;
            }else if(billing_type=='given_notice')
            {
                dataObj.given_notice = 1;
                dataObj.give_makeup_credit = 0;
                dataObj.lesson_is_billable = 0;
                dataObj.used_makeup_credits = 0;
            }else if(billing_type=='not_billable')
            {
                dataObj.given_notice = 1;
                dataObj.give_makeup_credit = 0;
                dataObj.lesson_is_billable = 0;
                dataObj.used_makeup_credits = 0;
            }else if(billing_type=='absence_is_billable')
            {
                dataObj.given_notice = 0;
                dataObj.give_makeup_credit = 0;
                dataObj.lesson_is_billable = 1;
                dataObj.used_makeup_credits = 0;
            }else if(billing_type=='give_makeup_credit')
            {
                dataObj.given_notice = 0;
                dataObj.give_makeup_credit = 1;
                dataObj.lesson_is_billable = 0;
                dataObj.used_makeup_credits = 0;
            }
        
        }else{
            alert("please select student")
        }   
        
       
      
    }
    useEffect(()=>{
        takeAttendanceHandler();
        getAttendanceTypesHandler();
    },[])

    useEffect(()=>{
        if(attendance_status==1)
        {
            set_billing_type("");
            set_lesson_price(0);
            set_is_late(false);
            set_is_paid_at_lesson(false);
        }else if(attendance_status==2)
        {
            set_billing_type("used_makeup_credits");
            set_lesson_price(0);
            set_is_late(false);
            set_is_paid_at_lesson(false);
        }else if(attendance_status==3)
        {
            set_billing_type("given_notice");
            set_lesson_price(0);
            set_is_late(false);
            set_is_paid_at_lesson(false);
        }else if(attendance_status==4)
        {
            set_billing_type("not_billable");
            set_lesson_price(0);
            set_is_late(false);
            set_is_paid_at_lesson(false);
        }
    },[attendance_status])

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
                               <SideSelectionBox attendees_info={attendees_info} start_date={start_date} start_time={start_time} end_time={end_time} require_makeup_credits={require_makeup_credits} attendees_ids={attendees_ids} set_attendees_ids={set_attendees_ids} />
                            </div>
                            <div className="col-md-8">
                                {/* <GroupNote/> */}
                                <div className="container-fluid p-0 bg-color bg-color-white main-content-area">
                                    <div className="upper-box-area">
                                        <h4>Attendance</h4>
                                        <p>Record attendance for this lesson</p>
                                        <label className="title">Attendance Status</label>
                                        <div className="attendance-box">
                                            {
                                                attendance_types.map((e)=>{
                                                    return <label>
                                                                <input type="radio" value={e.id} onChange={()=>{set_attendance_status(e.id);set_billing_type("")}} name="attendance_status"/>
                                                                <span>{e.as_title}</span>
                                                            </label>
                                                })
                                            }
                                            
                                        </div>
                                        {
                                            attendance_status!=1 && 
                                                                <div>
                                                                <div className="attendance-box">
                                                                    {
                                                                        attendance_status==2  &&  <label>
                                                                                                        <input type="checkbox" checked={is_late} onChange={(e)=>set_is_late(e.target.checked)} name="is_late"/>
                                                                                                        <span>Student was late</span>
                                                                                                   </label>
                                                                    }
                                                                    </div>
                                                                    <label className="title">Attendance Billing</label>
                                                                    <div className="attendance-box">
                                                                        {
                                                                            (attendance_status==2 || attendance_status==3) && <label>
                                                                                                        <input type="radio" value={'used_makeup_credits'} checked={billing_type=='used_makeup_credits'?true:false} onChange={(e)=>set_billing_type(e.target.value)} name="billing_type"/>
                                                                                                        <span>Use Make-Up Credit</span>
                                                                                                    </label>
                                                                        }
                                                                        

                                                                        {
                                                                            attendance_status==2 && <label>
                                                                                                        <input type="radio" value={'lesson_is_billable'} checked={billing_type=='lesson_is_billable'?true:false} onChange={(e)=>set_billing_type(e.target.value)} name="billing_type"/>
                                                                                                        <span>Lesson is Billable</span>
                                                                                                    </label>
                                                                        }
                                                                        
                                                                    </div>
                                                                    <div className="attendance-box">
                                                                        {
                                                                             attendance_status==3 && <label>
                                                                                                        <input type="radio" value={'given_notice'} checked={billing_type=='given_notice'?true:false} onChange={(e)=>set_billing_type(e.target.value)}  name="billing_type" />
                                                                                                        <span>Notice Given (Not Billable)</span>
                                                                                                    </label>
                                                                        }
                                                                        {
                                                                             attendance_status==4 && <label>
                                                                                                        <input type="radio" value={'not_billable'} checked={billing_type=='not_billable'?true:false} onChange={(e)=>set_billing_type(e.target.value)}  name="billing_type" />
                                                                                                        <span>Not Billable</span>
                                                                                                    </label>
                                                                        }
                                                                        {
                                                                            attendance_status==3 && <label>
                                                                                                        <input type="radio" value={'absence_is_billable'} checked={billing_type=='absence_is_billable'?true:false} onChange={(e)=>set_billing_type(e.target.value)} name="billing_type" />
                                                                                                        <span>Absence is Billable</span>
                                                                                                    </label>
                                                                        }
                                                                        {
                                                                            (attendance_status==3 ||  attendance_status==4) && <label>
                                                                                                        <input type="radio" value={'give_makeup_credit'} checked={billing_type=='give_makeup_credit'?true:false} onChange={(e)=>set_billing_type(e.target.value)} name="billing_type" />
                                                                                                        <span>Bill & Give Make-Up Credit</span>
                                                                                                    </label>
                                                                        }
                                                                        
                                                                    </div>
                                                                    <div className="alert alert-warning">
                                                                        Use Make-Up options are not available because Kumar, Ramesh has insufficient credits (Kumar, Ramesh has 0 of 1 make-up credits required).
                                                                    </div>
                                                                    <label className="title">Lesson Price</label>
                                                                    <div className="attendance-box">
                                                                        {
                                                                            (billing_type=="lesson_is_billable" || billing_type=="absence_is_billable" || billing_type=="give_makeup_credit") && <label>
                                                                                                                        <input className="form-control" type="text" value={lesson_price} onChange={(e)=>set_lesson_price(e.target.value)}  name="lesson_price"/>
                                                                                                                    </label>
                                                                        }
                                                                        
                                                                        {
                                                                            (attendance_status==2 && billing_type=="lesson_is_billable") && <label>
                                                                                                        <input type="checkbox" checked={is_paid_at_lesson} onChange={(e)=>set_is_paid_at_lesson(e.target.checked)} name="is_paid_at_lesson"/>
                                                                                                        <span>Student paid at lesson</span>
                                                                                                    </label>
                                                                        }
                                                                        
                                                                    </div>
                                                                </div>
                                        }
                                        

                                        <h4>Lesson Details (Optional)</h4>
                                        <p>Add notes, assignments, and link online resources</p>
                                        <Editor
                                            apiKey={apiKey}
                                            onInit={(evt, editor) => editorRef.current = editor}
                                        />
                                        
                                        <div className="email-outer-box">
                                            <label>
                                                <input type="checkbox" checked={email_student} onChange={(e)=>set_email_student(e.target.checked)}  name="email_student" />
                                                <span>Email Students</span>
                                            </label>
                                            <label>
                                                <input type="checkbox"  checked={email_tutor} onChange={(e)=>set_email_tutor(e.target.checked)}  name="email_tutor" />
                                                <span>Email Students</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="lower-box-area">
                                        <div className="formbold-form-btn-wrapper">
                                            <div className="btn-end">
                                                <Link className="cancel">
                                                Cancel
                                                </Link>
                                                <button onClick={()=>attendanceSubmitHandler()} className="formbold-btn">
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