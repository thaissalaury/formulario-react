import InputField from "./inputField";
import BotaoEnviar from "./BotaoEnviar";
import { useState, useEffect } from "react";

function FormularioCadastro() {
    //const [number, setNumber] = useState('');
    // const [cidade, setCidade] = useState('');
    // const [estado, setEstado] = useState('');
    // const [genero, setGenero] = useState('');
     const [user, setUser] = useState({ nome: "", email: "", telefone: "", segundoTelefone: "" });
     const {registro, carregando, criar, atualizar, deletar} = useState('')
     const [ erroForm, setErroForm] = useState ('') // Erro de validação da tela 
    // const [metadinha, setMetadinha] = useState({ erro: "", sucesso: "" });
    // const [enviando, setEnviando] = useState(false);
    // const [registrosLista, setRegistrosLista] = useState([]);
    // const [buscaNome, setBuscaNome] = useState('');
    // const [listaCarregando, setListaCarregando] = useState(false);
    // const [editingId, setEditingId] = useState(null);

    // Função para buscar registros do backend, com filtro opcional por nome
    const carregarRegistros = async (nomeFiltro = buscaNome) => {
        setListaCarregando(true);
        try {
            const url = new URL(' http://localhost:5173/');
            if (nomeFiltro && nomeFiltro.trim()) {
                url.searchParams.set('nome', nomeFiltro.trim());
            }
            const resposta = await fetch(url.toString());
            if (!resposta.ok) {
                setRegistrosLista([]);
                return;
            }
            const lista = await resposta.json();
            setRegistrosLista(lista);
        } catch (err) {
            console.log('Erro ao carregar lista de registros', err);
            setRegistrosLista([]);
        } finally {
            setListaCarregando(false);
        }
    };

    // useEffect(() => {
    //     carregarRegistros(buscaNome);
    // }, [buscaNome]);

    const handleEdit = (registro) => {
        setEditingId(registro.id);
        setUser({ nome: registro.nome || "", email: registro.email || "", telefone: registro.telefone || "", segundoTelefone: "" });
        setMetadinha({ erro: "", sucesso: "" });
    };

    // Exclui um registro via soft delete e atualiza a lista
    const handleDelete = async (id) => {
        try {
            const resposta = await fetch(` http://localhost:5173/${id}`, { method: 'DELETE' });
            const resultado = await resposta.json().catch(() => ({}));
            if (!resposta.ok) {
                setMetadinha({ erro: resultado.erro || resultado.mensagem || 'Erro ao deletar registro.', sucesso: '' });
                return;
            }
            setMetadinha({ erro: '', sucesso: 'Registro removido com sucesso.' });
            carregarRegistros();
        } catch (error) {
            console.log('Erro ao conectar com o servidor para deletar', error);
            setMetadinha({ erro: 'Erro ao conectar com o servidor.', sucesso: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(indiceEditando !== null) {
                await atualizar (indiceEditando, { nome, email, telefone})
            }else{
                await criar ({ nome, email, telefone})
            }
        } setErroForm('') // Limpa o erro
        }catch(e) {
        setErroForm(e.message) //Mostra o erro que o hook jogou 
    }
}
    //     // setMetadinha({ erro: "", sucesso: "" });

    //     // if (user.nome.trim() === "") {
    //     //     setMetadinha({ erro: "O campo nome é obrigatório.", sucesso: "" });
    //     //     return;
    //     // }

    //     // if (user.telefone.trim() !== "" && user.telefone.trim().length !== 11) {
    //     //     setMetadinha({ erro: "O campo telefone precisa ter 11 dgitos.", sucesso: "" });
    //     //     return;
    //     // }

    //     // setEnviando(true);

    //     try {
    //         const metodo = editingId ? 'PUT' : 'POST';
    //         const url = editingId ? ` http://localhost:5173/registros/${editingId}` : ' http://localhost:5173/registros';
    //         const resposta = await fetch(url, {
    //             method: metodo,
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 nome: user.nome.trim(),
    //                 email: user.email.trim(),
    //                 telefone: user.telefone.trim()
    //             })
    //         });

    //         const resultado = await resposta.json().catch(() => ({}));
    //         console.log(resultado);

    //         if (resposta.status === 409) {
    //             setMetadinha({ erro: resultado.mensagem || 'Registro duplicado.', sucesso: '' });
    //             return;
    //         }

    //         if (!resposta.ok) {
    //             setMetadinha({ erro: resultado.mensagem || resultado.erro || 'Erro ao cadastrar.', sucesso: '' });
    //             return;
    //         }

    //         setMetadinha({ erro: '', sucesso: editingId ? 'Registro atualizado com sucesso!' : 'Cadastro realizado com sucesso!' });
    //         setUser({ nome: "", email: "", telefone: "", segundoTelefone: "" });
    //         setNumber('');
    //         setCidade('');
    //         setEstado('');
    //         setGenero('');
    //         setEditingId(null);

    //         // Recarrega a lista após novo registro ou edição
    //         await carregarRegistros();
    //     } catch (error) {
    //         console.log('Erro ao conectar com o servidor');
    //         setMetadinha({ erro: 'Erro ao conectar com o servidor.', sucesso: '' });
    //     } finally {
    //         setEnviando(false);
    //     }
    // };

    // return (
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
