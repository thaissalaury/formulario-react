import { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:3000/registros';

export function useRegistros(buscaNome = '') {
    const [registros, setRegistros] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const buscar = async (nomeFiltro = buscaNome) => {
        setCarregando(true);
        try {
            const url = new URL(BASE_URL);
            if (nomeFiltro && nomeFiltro.trim()) {
                url.searchParams.set('nome', nomeFiltro.trim());
            }
            const resposta = await fetch(url.toString());
            if (!resposta.ok) {
                setRegistros([]);
                return;
            }
            const lista = await resposta.json();
            setRegistros(lista);
        } catch (err) {
            console.error('Erro ao carregar lista de registros', err);
            setRegistros([]);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        buscar(buscaNome);
    }, [buscaNome]);

    const criar = async (dados) => {
        const resposta = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        });
        if (!resposta.ok) {
            const resultado = await resposta.json().catch(() => ({}));
            throw { status: resposta.status, mensagem: resultado.mensagem || resultado.erro || 'Erro ao cadastrar.' };
        }
        await buscar(buscaNome);
        return await resposta.json();
    };

    const atualizar = async (id, dados) => {
        const resposta = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        });
        if (!resposta.ok) {
            const resultado = await resposta.json().catch(() => ({}));
            throw { status: resposta.status, mensagem: resultado.mensagem || resultado.erro || 'Erro ao atualizar.' };
        }
        await buscar(buscaNome);
        return await resposta.json();
    };

    const deletar = async (id) => {
        const resposta = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
        if (!resposta.ok) {
            const resultado = await resposta.json().catch(() => ({}));
            throw { status: resposta.status, mensagem: resultado.mensagem || resultado.erro || 'Erro ao deletar registro.' };
        }
        await buscar(buscaNome);
        return await resposta.json();
    };

    return {
        registros,
        carregando,
        buscar,
        criar,
        atualizar,
        deletar
    };
}
