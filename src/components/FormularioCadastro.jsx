import InputField from "./inputField";
import BotaoEnviar from "./BotaoEnviar";

function FormularioCadastro() {
    return (
        <div>
            <InputField label="Nome: " type="text" name="nome" placeholder="Digite seu nome"/>
            <InputField label="Email: " type="email" name="email" placeholder="email@empresa.com"/>
            <InputField label="Idade: " type="number" name="number" placeholder="19anos"/>
            <InputField label="Cidade: " type="text" name="cidade" placeholder="cidade que mora"/>
            <InputField label="Estado: " type="text" name="estado" placeholder="estado que mora"/>
            <InputField label="Telefone" type="text" name="telefone" placeholder="(79)99999-9999"/>
            <InputField label= "Gênero" type="select" name="Feminino " placeholder="Feminino ou Masculino"/>
            <BotaoEnviar texto="cadastrar"/>
        </div>
    )
}

export default FormularioCadastro;