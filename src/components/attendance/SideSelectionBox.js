import './style.css';
const SideSelectionBox = ()=>{
    return <div className="container-fluid p-0 bg-color-white">
                <div className="header-info-section">
                    <div className="calendar-date-time">
                        <h4>Lesson with Nitai Koiri</h4>
                        <div className="current-date">
                            <i class="fa fa-calendar" aria-hidden="true"></i>
                            <span className="ml-5">23-02-2024</span>
                        </div>
                        <div className="current-date">
                            <i class="fa fa-clock" aria-hidden="true"></i>
                            <span className="ml-5">13:00 - 13:30</span>
                        </div>
                        <div className="text-makup-credit">
                            <i class="fa fa-recycle" aria-hidden="true"></i>
                            <span className="ml-5">
                                Make-Up Credit Required
                            </span>
                        </div>
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
                    <label className="title">4 Attendees</label>
                    <label className="title">0 Selected</label>
                    <label>
                        <input type="checkbox" />
                        <span className="ml-5">Select All</span>
                        
                    </label>
                    <div className="attendees-list-box">
                        <ul>
                            <li>
                                <div className="addendees-box">
                                    <div className="addendees-box-left">
                                        <label>
                                            <input type="checkbox" />
                                            <span className="ml-5">Abhishek Kumar</span>
                                        </label>
                                    </div>
                                    <div className="addendees-box-right">
                                        <i class="fa fa-check-circle" style={{color:'green'}} aria-hidden="true"></i>
                                    </div>
                                </div>
                                
                            </li>
                            <li>
                                <div className="addendees-box">
                                    <div className="addendees-box-left">
                                        <label>
                                            <input type="checkbox" />
                                            <span className="ml-5">Abhishek Kumar</span>
                                        </label>
                                    </div>
                                    <div className="addendees-box-right">
                                        <i style={{color:'red'}} class="fa fa-times-circle" aria-hidden="true"></i>
                                    </div>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
}
export default SideSelectionBox;