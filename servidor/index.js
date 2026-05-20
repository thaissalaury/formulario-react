import express from 'express'
import cors from 'cors'

const servidor = express()
servidor.use (cors())
servidor.use(express.json())


const registros = ['Hello everynyan!'] // "DB" em tempo de execução

servidor.post('/registros', (req, res) => {

        if(!dados.nome) {
            res.status(400).json({
                erro: "Campo de nome é obrigatório!"
            })
        }

    const nomeDuplicado = registros.find (r => r.nome.toLowerCase() === dados.nome.toLowerCase());
    if (nomeDuplicado) {
        return res.status(409).json({
            mensagem: 'Nome já cadastrado'
        })
    }
    const novoRegistro = { nome,email}
    registros.push(novoRegistro)
    return res.status(201).json(novoRegistro) // interrompe a função para duplicar 
    


    console.log(`
        $(Dados da requisição! o que tem no corpo que o frontend me mandou: ${dados}`)
        registros.push(dados) // simulando salvar dados no banco

  res.status(201).json({
    sucesso: true,
    mensagem: "Registro Criado com Sucesso!",
    dados: dados

  })

})

 servidor.get('/registros', (req, res) => {
    res.status(200).json({
        mensagem: "Vamos nessa, Servidor no ar BEBE!",
        status: "ok 100%"
    });
 });

servidor.listen(3000, () => {
    console.log('servidor tá massa https://localhost:3000')
});

