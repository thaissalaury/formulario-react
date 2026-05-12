import InputField from "./inputField";
import BotaoEnviar from "./BotaoEnviar";
import Contador from "./Contador";
import { useState } from "react";

function FormularioCadastro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [idade, setIdade] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [genero, setGenero] = useState('')
    return (
        <form>
            <InputField label="Nome: " type="text" name="nome" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
            <InputField label="Email: " type="email" name="email" placeholder="email@empresa.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <InputField label="Idade: " type="number" name="number" placeholder="19anos"  value={idade} onChange={(e) => setIdade(e.target.value)} />
            <InputField label="Cidade: " type="text" name="cidade" placeholder="cidade que mora"  value={cidade} onChange={(e) => setCidade(e.target.value)}/>
            <InputField label="Estado: " type="text" name="estado" placeholder="estado que mora"  value={estado} onChange={(e) => setEstado(e.target.value)}/>
            <InputField label="Telefone" type="text" name="telefone" placeholder="(79)99999-9999"  value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            <InputField label= "Gênero" type="select" name="Feminino " placeholder="Feminino ou Masculino"  value={genero} onChange={(e) => setGenero(e.target.value)} />
            <BotaoEnviar texto="cadastrar"/>
            <div>
                <p>Nome: {nome}</p>
                <p>Email: {email}</p>
                <p>Idade: {idade}</p>
                <p>Cidade: {cidade}</p>
                <p>Estado: {estado}</p>
                <p>Telefone: {telefone}</p>
                <p>Gênero: {genero}</p>
            </div>
        </form>
    )
}

export default FormularioCadastro;