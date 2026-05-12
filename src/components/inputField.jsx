function InputField ({label, type, name, placeholder }){

    return (
        <div>
            <label>{label}</label>
            <input type ={type} nome={name} placeholder={placeholder}/>
        </div>
    )
}

export default InputField;