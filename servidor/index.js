import express from 'express'
import cors from 'cors'

const servidor = express()
servidor.use (cors())
servidor.use(express.json())


const registros = [] // "DB" em tempo de execução

servidor.post('/registros', (req, res) => {
    const { nome, email } = req.body || {};

    if (!nome || typeof nome !== 'string' || !nome.trim()) {
        return res.status(400).json({
            erro: 'Campo de nome é obrigatório!'
        })
    }

    // Normaliza para comparação: trim + lowercase
    const nomeNorm = nome.trim().toLowerCase();
    const existente = registros.find(r => String(r.nome).trim().toLowerCase() === nomeNorm && !r.deleted);
    if (existente) {
        return res.status(409).json({ mensagem: 'Nome já cadastrado' })
    }

    const novoRegistro = { nome: nome.trim(), email: email || null, deleted: false };
    registros.push(novoRegistro);
    return res.status(201).json(novoRegistro);
});

servidor.get('/registros', (req, res) => {
    // Retorna registros não deletados
    const lista = registros.filter(r => !r.deleted);
    res.status(200).json(lista);
});

servidor.listen(3000, () => {
    console.log('servidor tá massa https://localhost:3000')
});

