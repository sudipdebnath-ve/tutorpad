const TextAreaInputBox = ({value,setValue,label})=>{
    return <div>
                <label
                    className="formbold-form-label"
                >
                {label}
                </label>
                <textarea
                    className="form-control"
                    onChange={(e)=>setValue(e.target.value)}
                >{value}</textarea>
            </div>
}
export default TextAreaInputBox;