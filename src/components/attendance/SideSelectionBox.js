import { useState } from 'react';
import './style.css';
const SideSelectionBox = ({attendees_info, start_date,start_time,end_time,require_makeup_credits,attendees_ids,set_attendees_ids})=>{
    const studentCheckedhandler = (checked,id)=>{
        if(checked)
        {
            if(attendees_ids.find((f)=>f==id)==undefined)
            {
                set_attendees_ids([...attendees_ids,id]);
            }       
        }else{
                 set_attendees_ids(attendees_ids.filter((f)=>f!=id));
        }
    }
    return <div className="container-fluid p-0 bg-color-white">
                <div className="header-info-section">
                    <div className="calendar-date-time">
                        <h4>Lesson with Nitai Koiri</h4>
                        <div className="current-date">
                            <i class="fa fa-calendar" aria-hidden="true"></i>
                            <span className="ml-5">{start_date}</span>
                        </div>
                        <div className="current-date">
                            <i class="fa fa-clock" aria-hidden="true"></i>
                            <span className="ml-5">{start_time} - {end_time}</span>
                        </div>
                        {
                            require_makeup_credits == 1  && <div className="text-makup-credit">
                                                                <i class="fa fa-recycle" aria-hidden="true"></i>
                                                                <span className="ml-5">
                                                                    Make-Up Credit Required
                                                                </span>
                                                            </div>
                        }
                        
                    </div>
                </div>
                <div className="header-group-section">
                    <label className="title">Group Notes</label>
                    <div className="group-notes-btn-area">
                        <div className="text-group-notes">
                            <i class="fa fa-check" aria-hidden="true"></i>
                            <span className="ml-5">
                                Student Group Note Added
                            </span>
                        </div>
                        <div className="text-group-notes-btn">
                                <i  class="fa fa-pencil" aria-hidden="true"></i>
                                Edit
                        </div>
                    </div>
                </div>
                <div className="header-attendees-section">
                    <label className="title">{attendees_info.length||0} Attendees</label>
                    <label className="title">{attendees_ids.length ||0} Selected</label>
                    {/* <label>
                        <input onClick={()=>console.log(attendees_ids)} type="checkbox" />
                        <span className="ml-5">Select All</span>
                        
                    </label> */}
                    <div className="attendees-list-box">
                        <ul>
                            {
                                attendees_info?.map((e)=>{
                                    return <li>
                                                <div className="addendees-box">
                                                    <div className="addendees-box-left">
                                                        <label>
                                                            <input onChange={(c)=>studentCheckedhandler(c.target.checked,e.id)} type="checkbox" />
                                                            <span className="ml-5">{e.name}</span>
                                                        </label>
                                                    </div>
                                                    <div className="addendees-box-right">
                                                        {
                                                            e.attendance_taken && e.attendance_status==2 && <i class="fa fa-check-circle" style={{color:'green'}} aria-hidden="true"></i>
                                                        }
                                                        {
                                                            e.attendance_taken && e.attendance_status!=2 && <i class="fa fa-times-circle" style={{color:'green'}} aria-hidden="true"></i>
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                })
                            }
                        </ul>
                    </div>
                    
                </div>
            </div>
}
export default SideSelectionBox;