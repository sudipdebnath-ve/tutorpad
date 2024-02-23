import styles from './style.css';
import React, { useState, useEffect } from "react";
const SelectBox = ({options,label,onChangeSelect,selectValue})=>{
    const [value, setValue] = useState({label:'No Record',value:''});
    const [isBoxOpen, setIsBoxOpen] = useState(false);
    useEffect(()=>{
        setValue(selectValue);
    },[selectValue]);
    return <div>
                <label className="formbold-form-label" >{label}</label>
                <div
                className="form-control"
                onClick={()=>setIsBoxOpen(true)}
                >
                    {
                        value?value.text:<div>Select</div>
                    }
                </div>
                {
                    isBoxOpen && <div className="optionBox">
                                            <ul>
                                                {
                                                    options.map((e)=>{
                                                        return <li onClick={()=>{setValue(e);setIsBoxOpen(false);onChangeSelect(e.value);}}>
                                                                    {e.label}
                                                                </li>
                                                    })
                                                }
                                                
                                            </ul>
                                        </div>
                }
            </div>
}
export default SelectBox;