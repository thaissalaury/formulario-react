import InputField from "./inputField";

function FormularioCadastro() {
    return (
        <div>
            <InputField label="Nome: " type="text" name="nome" />
            <InputField label="Email: " type="email" name="email" />
            <InputField label="idade: " type="number" name="number"/>
            <InputField label="data de nascimento: " type="date" name="date"/>
            <InputField label="Cidade: " type="text" name="cidade"/>
            <InputField label="Estado: " type="text" name="estado"/>
        </div>
    )
}

export default FormularioCadastro;