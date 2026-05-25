function InputField ({label, type, name, placeholder, value, onChange, onKeyDown}){

    return (
        <div>
            <label>{label}</label>
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </div>
    )
}

export default InputField;