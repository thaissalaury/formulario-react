import { useState, useEffect, use } from "react";

//Ponto único de Verdade
const BASE_URL = ' http://localhost:5173/registros'

export function carregarRegistro() {
    const [registros, setRegistros] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    const buscar = async () => {
        setCarregando(true) // desabilitar o  botão 
        try {
            const res = await fetch (BASE_URL)
            const dados = await res.json()
            setRegistros(dados)
        }catch{
            setErro('Erro ao carregar registros.')
        }finally{
            setCarregando(false)
        }
    // O Hook se encarrega de buscar ao iniciar:
    useEffect(() => {
        buscar()
    }, [])
    }

    const criar = async (dados) => {
        try {
            const res = await fetch(BASE_URL,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            })
            if (!res.ok) {
                const err = await res.json()
                throw new Error (err.erro)
            }
            await buscar() //Atualiza a lista automaticamente após criar
        }catch (e){
            setErro (e.message)
            throw e // Lança o erro para o componente tratar visualmente
        }
    }
    const atualizar = async (id, dados) => {
        //...fetch com PUT para `${BASE_URL}/${id}`
        await buscar()
    }
    const deletar = async (id) => {
        //...fetch com DELETE para `${BASE_URL}/${id}`
        await buscar()
    }

    //As funções vão entrar aqui...
    return { registros, carregando, erro, buscar, criar, atualizar, deletar}
}
