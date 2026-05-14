import InputField from "./inputField";
import BotaoEnviar from "./BotaoEnviar";
import Contador from "./Contador";
import { useState } from "react";

function FormularioCadastro() {
    // const [nome, setNome] = useState('')
    // const [email, setEmail] = useState('')
    // const [telefone, setTelefone] = useState('')
    const [number, setNumber] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [genero, setGenero] = useState('')
    // const[erro, setErro] = useState('')
    // const[sucesso, setSucesso] = useState(false)
    const[user, setUser] = useState({nome: "", email: "", telefone: "", segundoTelefone:""})
    const[metadinha, setMetadinha] = ({erro: "", sucesso: ""})

    const handleSubmit = (e) => {
        e.preventdefault() //Não deixa carregar a página

        if (user.nome.trim()===""){
            setErro('O campo desse nome está sem nada, preencha')
            console.log(erro)
            return
        }
        if (telefone.lenght != 11)
            setErro ("O campo necessita de 11 dígitos")
            console.log({erro})
            return 
    
    setErro('')
    setSucesso(true)
        console.log(user) // Envio para o banco 
        setSucesso(false)
}

    return (
        <form onSubmit={handleSubmit}>

            {erro && <p style = {{color: "red"}}>{erro}</p>}
            {sucesso && <p style = {{color: "green"}}>{sucesso}</p>}
            <InputField label="Nome: " type="text" name="nome" placeholder="Digite seu nome" value={user.nome} onChange={(e) => setUser((dados) => ({...dados, nome: e.target.value}))}/>
            <InputField label="Email: " type="email" name="email" placeholder="email@empresa.com" value={user.email} onChange={(e) => setUsersetUser ((dados) => ({...dados, email: e.target.value}))}/>
            <InputField label="Idade: " type="number" name="number" placeholder="19anos"  value={number} onChange={(e) => setNumber(e.target.value)} />
            <InputField label="Cidade: " type="text" name="cidade" placeholder="cidade que mora"  value={cidade} onChange={(e) => setCidade(e.target.value)}/>
            <InputField label="Estado: " type="text" name="estado" placeholder="estado que mora"  value={estado} onChange={(e) => setEstado(e.target.value)}/>
            <InputField label="Telefone" type="text" name="telefone" placeholder="(79)99999-9999"  value={user.telefone} onChange={(e) => setTelefone ((dados) => ({...dados, telefone: e.target.value}))} />
            <InputField label= "Gênero" type="select" name="Feminino " placeholder="Feminino ou Masculino"  value={genero} onChange={(e) => setGenero(e.target.value)} />
            <BotaoEnviar texto="cadastrar"/>
            <div>
                <p>Nome: {user.nome}</p>
                <p>Email: {user.email}</p>
                <p>Idade: {number}</p>
                <p>Cidade: {cidade}</p>
                <p>Estado: {estado}</p>
                <p>Telefone: {user.telefone}</p>
                <p>Gênero: {genero}</p>
            </div>
        </form>
    )
}

export default FormularioCadastro;