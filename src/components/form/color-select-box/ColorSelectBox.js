import { colors } from "../../../utils/constant";
import "./style.css";
const ColorSelectBox = ({isColorBoxOpen,setIsColorBoxOpen,color,setColor,label})=>{

    return <div>
                <label
                    className="formbold-form-label"
                >
                {label}
                </label>
                <div
                className="form-control"
                onClick={()=>setIsColorBoxOpen(true)}
                >
                    {
                        color &&<div className="colorDotBoxShow"> 
                                <div className="colorDotBox">
                                    <div className="colorDot" style={{background:color.code}}></div> 
                                    <span>{color.color}</span>
                                </div>
                                <span className="colorDotX" onClick={()=>{setColor(null);}}>X</span>
                                </div>
                    }
                    
                </div>
                {
                    isColorBoxOpen && <div className="colorOptionBox">
                                            <ul>
                                                {
                                                    colors.map((e)=>{
                                                        return <li>
                                                                    <div onClick={()=>{setColor(e);setIsColorBoxOpen(false);}} className="colorDotBox">
                                                                        <div className="colorDot" style={{background:e.code}}></div> 
                                                                        <span>{e.color}</span>
                                                                    </div>
                                                                </li>
                                                    })
                                                }
                                                
                                            </ul>
                                        </div>
                }
            </div>
}
export default ColorSelectBox;