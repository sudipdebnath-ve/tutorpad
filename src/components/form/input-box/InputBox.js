const InputBox = ({value,setValue,label,type})=>{
    return <div>
                <label
                    className="formbold-form-label"
                >
                {label}
                </label>
                <input
                    type={type}
                    value={value}
                    className="form-control"
                    onChange={(e)=>setValue(e.target.value)}
                />
            </div>
}
export default InputBox;