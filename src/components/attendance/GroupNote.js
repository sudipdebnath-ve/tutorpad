import React,{useRef} from "react";
import { Editor } from '@tinymce/tinymce-react';
import { Link } from "react-router-dom";
import './style.css';
export const apiKey = 'nme2ps9mm02xo21d5bqhv48e9lncnjdr0zru511ttlb61gnc';
const GroupNote = ()=>{

    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };
    return <div className="container-fluid p-0 bg-color bg-color-white main-content-area">
                <div className="upper-box-area">
                    <label className="title">Group Notes</label>
                    <Editor
                        apiKey={apiKey}
                        onInit={(evt, editor) => editorRef.current = editor}
                    />
                    <label className="title mt-4">Email Lesson Notes</label>
                    <div className="attendees-list-box">
                        <ul>
                            <li>
                                <div className="addendees-box">
                                    <div className="addendees-box-left">
                                        <label>
                                            <input type="checkbox" />
                                            <span className="ml-5"> All student emails</span>
                                        </label>
                                    </div>
                                
                                </div>
                                
                            </li>
                            <li>
                                <div className="addendees-box">
                                    <div className="addendees-box-left">
                                        <label>
                                            <input type="checkbox" />
                                            <span className="ml-5"> All parent emails</span>
                                        </label>
                                    </div>
                                </div>
                                
                            </li>
                            <li>
                                <div className="addendees-box">
                                    <div className="addendees-box-left">
                                        <label>
                                            <input type="checkbox" />
                                            <span className="ml-5"> Myself</span>
                                        </label>
                                    </div>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
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
}
export default GroupNote;