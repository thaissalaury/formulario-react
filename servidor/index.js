import express from 'express'
import cors from 'cors'

const servidor = express()
servidor.use (cors())
servidor.use(express.json())


const registros = [] // "DB" em tempo de execução

servidor.post('/registros', (req, res) => {
    const { nome, email, telefone } = req.body || {};

    if (!nome || typeof nome !== 'string' || !nome.trim()) {
        return res.status(400).json({
            erro: 'Campo de nome é obrigatório!'
        })
    }

    const nomeTrim = nome.trim();
    if (nomeTrim.length > 50) {
        return res.status(400).json({
            erro: 'O nome não pode ter mais de 50 caracteres.'
        })
    }

    if (typeof email !== 'undefined' && email !== null && typeof email !== 'string') {
        return res.status(400).json({ erro: 'Email inválido.' })
    }

    if (email && email.trim().length > 0) {
        const emailTrim = email.trim();
        if (emailTrim.length > 100) {
            return res.status(400).json({
                erro: 'O email não pode ter mais de 100 caracteres.'
            })
        }
        if (emailTrim.length < 5 || !emailTrim.includes('@')) {
            return res.status(400).json({
                erro: 'Informe um email válido.'
            })
        }
    }

    if (typeof telefone !== 'undefined' && telefone !== null) {
        if (typeof telefone !== 'string') {
            return res.status(400).json({ erro: 'Telefone inválido.' })
        }
        const telefoneTrim = telefone.trim();
        if (telefoneTrim.length > 15) {
            return res.status(400).json({
                erro: 'O telefone não pode ter mais de 15 caracteres.'
            })
        }
    }

    const nomeNorm = nomeTrim.toLowerCase();
    const existente = registros.find(r => String(r.nome).trim().toLowerCase() === nomeNorm && !r.deleted);
    if (existente) {
        return res.status(409).json({ mensagem: 'Nome já cadastrado' })
    }

    const novoRegistro = {
        nome: nomeTrim,
        email: email ? email.trim() : null,
        telefone: telefone ? telefone.trim() : null,
        deleted: false
    };
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

