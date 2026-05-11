function InputField ({label, type, name}){

    return (
        <div>
            <label>{label}</label>
            <input type ={type} nome={name}/>
        </div>
    )
}

export default InputField;