import InputField from "./inputField";
import BotaoEnviar from "./BotaoEnviar";
import { useState } from "react";

function FormularioCadastro() {
    const [number, setNumber] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [genero, setGenero] = useState('');
    const [user, setUser] = useState({ nome: "", email: "", telefone: "", segundoTelefone: "" });
    const [metadinha, setMetadinha] = useState({ erro: "", sucesso: "" });
    const [enviando, setEnviando] = useState(false);
    const [registrosLista, setRegistrosLista] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMetadinha({ erro: "", sucesso: "" });

        if (user.nome.trim() === "") {
            setMetadinha({ erro: "O campo nome � obrigat�rio.", sucesso: "" });
            return;
        }

        if (user.telefone.trim() !== "" && user.telefone.trim().length !== 11) {
            setMetadinha({ erro: "O campo telefone precisa ter 11 d�gitos.", sucesso: "" });
            return;
        }

        setEnviando(true);

        try {
            const resposta = await fetch('http://localhost:3000/registros', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: user.nome.trim(),
                    email: user.email.trim(),
                    telefone: user.telefone.trim()
                })
            });

            const resultado = await resposta.json().catch(() => ({}));
            console.log(resultado);

            if (resposta.status === 409) {
                setMetadinha({ erro: resultado.mensagem || 'Registro duplicado.', sucesso: '' });
                return;
            }

            if (!resposta.ok) {
                setMetadinha({ erro: resultado.mensagem || resultado.erro || 'Erro ao cadastrar.', sucesso: '' });
                return;
            }

            setMetadinha({ erro: '', sucesso: 'Cadastro realizado com sucesso!' });
            setUser({ nome: "", email: "", telefone: "", segundoTelefone: "" });
            setNumber('');
            setCidade('');
            setEstado('');
            setGenero('');

            // Atualiza a lista de registros após cadastro
            try {
                const r = await fetch('http://localhost:3000/registros');
                if (r.ok) {
                    const lista = await r.json();
                    setRegistrosLista(lista);
                }
            } catch (err) {
                console.log('Erro ao atualizar lista de registros', err);
            }
        } catch (error) {
            console.log('Erro ao conectar com o servidor');
            setMetadinha({ erro: 'Erro ao conectar com o servidor.', sucesso: '' });
        } finally {
            setEnviando(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {metadinha.erro && <p style={{ color: "red" }}>{metadinha.erro}</p>}
            {metadinha.sucesso && <p style={{ color: "green" }}>{metadinha.sucesso}</p>}
            <InputField label="Nome: " type="text" name="nome" placeholder="Digite seu nome" value={user.nome} onChange={(e) => setUser((dados) => ({ ...dados, nome: e.target.value }))} />
            <InputField label="Email: " type="email" name="email" placeholder="email@empresa.com" value={user.email} onChange={(e) => setUser((dados) => ({ ...dados, email: e.target.value }))} />
            <InputField label="Idade: " type="number" name="number" placeholder="19anos" value={number} onChange={(e) => setNumber(e.target.value)} />
            <InputField label="Telefone" type="text" name="telefone" placeholder="(79)99999-9999" value={user.telefone} onChange={(e) => setUser((dados) => ({ ...dados, telefone: e.target.value }))} />
            <InputField label="G�nero" type="text" name="genero" placeholder="Feminino ou Masculino" value={genero} onChange={(e) => setGenero(e.target.value)} />
            <BotaoEnviar texto={enviando ? "Enviando..." : "Cadastrar"} disabled={enviando} />

            <div>
                <p>Nome: {user.nome}</p>
                <p>Email: {user.email}</p>
                <p>Idade: {number}</p>
                <p>Cidade: {cidade}</p>
                <p>Estado: {estado}</p>
                <p>Telefone: {user.telefone}</p>
                <p>G�nero: {genero}</p>
            </div>
        </form>
    );
}

export default FormularioCadastro;
