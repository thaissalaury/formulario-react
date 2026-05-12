function InputField ({label, type, name, placeholder, value, onChange}){

    return (
        <div>
            <label>{label}</label>
            <input 
                type ={type} 
                nome={name} 
                placeholder={placeholder}
                value ={value}
                onChange ={onChange}
            />
        </div>
    )
}

export default InputField;