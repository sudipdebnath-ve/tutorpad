import './style.css';
const InputCheckBox = ({isChecked,onChange,label,title,description})=>{
    return <div>
            <label className="formbold-form-label">{label}</label>
            <div className="rowbox">
                <div>
                    <input checked={isChecked} type="checkbox" value={1} onChange={onChange} />
                    <span className={"checkBoxtitle"}>{title}</span>
                </div>
            </div>
            {
                description && <p className="description">{description}</p>
            }
           </div>
     
}
export default InputCheckBox;