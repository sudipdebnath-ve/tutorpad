import styles from "./style.css";
const LabelInputBox = ({label,inputValue,setInputValue,unit,onClear})=>{
    return  <div>
                <label className="formbold-form-label">{label}</label>
                <div className="input-outer-box">
                    <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} className="form-control" />
                    <span>{unit}</span>
                    <button type="button" onClick={()=>onClear()} className="btn btn-md btn-info">Edit</button>
                </div>
            </div>
}
export default LabelInputBox;