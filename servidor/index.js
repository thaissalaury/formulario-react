import express from 'express'
import cors from 'cors'

const servidor = express()
servidor.use (cors())
servidor.use(express.json())

// Armazena os registros em memória durante a execução
const registros = []
let proximoId = 1;

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
        id: proximoId++,
        nome: nomeTrim,
        email: email ? email.trim() : null,
        telefone: telefone ? telefone.trim() : null,
        deleted: false
    };
    registros.push(novoRegistro);
    return res.status(201).json(novoRegistro);
});

// PUT /registros/:id atualiza dados de um registro existente
servidor.put('/registros/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
        return res.status(400).json({ erro: 'ID inválido.' });
    }

    const registro = registros.find(r => r.id === id && !r.deleted);
    if (!registro) {
        return res.status(404).json({ erro: 'Registro não encontrado.' });
    }

    const { nome, email, telefone } = req.body || {};
    if (!nome || typeof nome !== 'string' || !nome.trim()) {
        return res.status(400).json({ erro: 'Campo de nome é obrigatório!' });
    }

    const nomeTrim = nome.trim();
    if (nomeTrim.length > 50) {
        return res.status(400).json({ erro: 'O nome não pode ter mais de 50 caracteres.' });
    }

    if (typeof email !== 'undefined' && email !== null && typeof email !== 'string') {
        return res.status(400).json({ erro: 'Email inválido.' });
    }

    if (email && email.trim().length > 0) {
        const emailTrim = email.trim();
        if (emailTrim.length > 100) {
            return res.status(400).json({ erro: 'O email não pode ter mais de 100 caracteres.' });
        }
        if (emailTrim.length < 5 || !emailTrim.includes('@')) {
            return res.status(400).json({ erro: 'Informe um email válido.' });
        }
    }

    if (typeof telefone !== 'undefined' && telefone !== null) {
        if (typeof telefone !== 'string') {
            return res.status(400).json({ erro: 'Telefone inválido.' });
        }
        const telefoneTrim = telefone.trim();
        if (telefoneTrim.length > 15) {
            return res.status(400).json({ erro: 'O telefone não pode ter mais de 15 caracteres.' });
        }
    }

    const nomeNorm = nomeTrim.toLowerCase();
    const existente = registros.find(r => r.id !== id && String(r.nome).trim().toLowerCase() === nomeNorm && !r.deleted);
    if (existente) {
        return res.status(409).json({ mensagem: 'Nome já cadastrado' });
    }

    registro.nome = nomeTrim;
    registro.email = email ? email.trim() : null;
    registro.telefone = telefone ? telefone.trim() : null;

    return res.status(200).json(registro);
});

// GET /registros retorna apenas registros não apagados
// Se query nome for fornecida, filtra por correspondência parcial no nome
servidor.get('/registros', (req, res) => {
    const busca = String(req.query.nome || '').trim().toLowerCase();
    let lista = registros.filter(r => !r.deleted);
    if (busca) {
        lista = lista.filter(r => String(r.nome).toLowerCase().includes(busca));
    }
    res.status(200).json(lista);
});

// DELETE /registros/:id marca o registro como deleted em vez de remover
servidor.delete('/registros/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
        return res.status(400).json({ erro: 'ID inválido.' });
    }

    const registro = registros.find(r => r.id === id && !r.deleted);
    if (!registro) {
        return res.status(404).json({ erro: 'Registro não encontrado.' });
    }

    registro.deleted = true;
    return res.status(200).json({ mensagem: 'Registro removido com sucesso.' });
});

servidor.listen(3000, () => {
    console.log('servidor tá massa https://localhost:3000')
});

