import InputField from "./inputField";
import BotaoEnviar from "./BotaoEnviar";
import { useState, useEffect } from "react";
import { useRegistros } from '../hooks/useRegistros';

function FormularioCadastro() {
    const [number, setNumber] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [genero, setGenero] = useState('');
    const [user, setUser] = useState({ nome: "", email: "", telefone: "", segundoTelefone: "" });
    const [metadinha, setMetadinha] = useState({ erro: "", sucesso: "" });
    const [enviando, setEnviando] = useState(false);
    const [buscaNome, setBuscaNome] = useState('');
    const [editingId, setEditingId] = useState(null);

    const {
        registros: registrosLista,
        carregando: listaCarregando,
        buscar: carregarRegistros,
        criar,
        atualizar,
        deletar
    } = useRegistros(buscaNome);

    const handleEdit = (registro) => {
        setEditingId(registro.id);
        setUser({ nome: registro.nome || "", email: registro.email || "", telefone: registro.telefone || "", segundoTelefone: "" });
        setMetadinha({ erro: "", sucesso: "" });
    };

    const handleDelete = async (id) => {
        try {
            await deletar(id);
            setMetadinha({ erro: '', sucesso: 'Registro removido com sucesso.' });
        } catch (error) {
            console.log('Erro ao deletar', error);
            setMetadinha({ erro: error.mensagem || 'Erro ao conectar com o servidor.', sucesso: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMetadinha({ erro: "", sucesso: "" });

        if (user.nome.trim() === "") {
            setMetadinha({ erro: "O campo nome é obrigatório.", sucesso: "" });
            return;
        }

        if (user.telefone.trim() !== "" && user.telefone.trim().length !== 11) {
            setMetadinha({ erro: "O campo telefone precisa ter 11 dígitos.", sucesso: "" });
            return;
        }

        setEnviando(true);

        try {
            const dados = {
                nome: user.nome.trim(),
                email: user.email.trim(),
                telefone: user.telefone.trim()
            };

            if (editingId) {
                await atualizar(editingId, dados);
                setMetadinha({ erro: '', sucesso: 'Registro atualizado com sucesso!' });
            } else {
                await criar(dados);
                setMetadinha({ erro: '', sucesso: 'Cadastro realizado com sucesso!' });
            }

            setUser({ nome: "", email: "", telefone: "", segundoTelefone: "" });
            setNumber('');
            setCidade('');
            setEstado('');
            setGenero('');
            setEditingId(null);
        } catch (error) {
            console.log('Erro ao salvar registro', error);
            setMetadinha({ erro: error.mensagem || 'Erro ao conectar com o servidor.', sucesso: '' });
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {metadinha.erro && <p style={{ color: "red" }}>{metadinha.erro}</p>}
                {metadinha.sucesso && <p style={{ color: "green" }}>{metadinha.sucesso}</p>}
                <InputField
                    label="Busca por nome: "
                    type="text"
                    name="buscaNome"
                    placeholder="Digite para buscar"
                    value={buscaNome}
                    onChange={(e) => setBuscaNome(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                />
                {listaCarregando ? <p>Carregando registros...</p> : <p>{registrosLista.length} registro(s) encontrado(s)</p>}
                <InputField label="Nome: " type="text" name="nome" placeholder="Digite seu nome" value={user.nome} onChange={(e) => setUser((dados) => ({ ...dados, nome: e.target.value }))} />
                <InputField label="Email: " type="email" name="email" placeholder="email@empresa.com" value={user.email} onChange={(e) => setUser((dados) => ({ ...dados, email: e.target.value }))} />
                <InputField label="Idade: " type="number" name="number" placeholder="19anos" value={number} onChange={(e) => setNumber(e.target.value)} />
                <InputField label="Telefone" type="text" name="telefone" placeholder="(79)99999-9999" value={user.telefone} onChange={(e) => setUser((dados) => ({ ...dados, telefone: e.target.value }))} />
                <InputField label="Gênero" type="text" name="genero" placeholder="Feminino ou Masculino" value={genero} onChange={(e) => setGenero(e.target.value)} />
                <BotaoEnviar texto={enviando ? "Enviando..." : editingId ? "Salvar edição" : "Cadastrar"} disabled={enviando} />
                {editingId && (
                    <button type="button" onClick={() => {
                        setEditingId(null);
                        setUser({ nome: "", email: "", telefone: "", segundoTelefone: "" });
                        setMetadinha({ erro: "", sucesso: "" });
                    }} style={{ marginLeft: '8px' }}>
                        Cancelar edição
                    </button>
                )}
            </form>

            <section>
                <h2>Registros</h2>
                {!listaCarregando && registrosLista.length === 0 && <p>Nenhum registro encontrado.</p>}
                <ul>
                    {registrosLista.map((registro) => (
                        <li key={registro.id}>
                            <strong>{registro.nome}</strong> (ID {registro.id}) — {registro.email || 'Sem email'} — {registro.telefone || 'Sem telefone'}
                            <button type="button" onClick={() => handleEdit(registro)} style={{ marginLeft: '8px' }}>Editar</button>
                            <button type="button" onClick={() => handleDelete(registro.id)} style={{ marginLeft: '8px' }}>Excluir</button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default FormularioCadastro;
