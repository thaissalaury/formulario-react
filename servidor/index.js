const express = require('express')

const servidor = express();
servidor.use(express.json())


const registros = ['Hello everynyan!'] // "DB" em tempo de execução

servidor.post('/registros', (req, res) => {
    const dados = req.body // pega o corpo da requisição 

        if(!dados.nome) {
            res.status(400).json({
                erro: "Campo de nome é obrigatório!"
            })
        }

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

