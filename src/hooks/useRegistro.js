import { useState, useEffect, use } from "react";

//Ponto único de Verdade
const BASE_URL = ' http://localhost:5173/registros'

export function useRegistro() {
    const [registros, setRegistros] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const buscar = async () => {
        setCarregando(true)
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

    //As funções vão entrar aqui...

    return { registros, carregando, erro}
}
