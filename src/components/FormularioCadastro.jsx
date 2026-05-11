import InputField from "./inputField";

function FormularioCadastro() {
    return (
        <div>
            <InputField label="Nome: " type="text" name="nome" />
            <InputField label="Email: " type="email" name="email" />
        </div>
    )
}

export default FormularioCadastro;