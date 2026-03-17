const express = require("express")
const cors = require("cors")
const { Sequelize, DataTypes } = require('sequelize')

// Configuração da conexão com o banco de dados -= MySQL
const sequelize = new  Sequelize('db_projeto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

// Criando a tabela do banco 
// Definição de tabelas (modelo) de clientes.
const Cliente = sequelize.define('Cliente', {
    nome:{
        type: DataTypes.STRING,
        allowNull: 'false',
    },
    email:{
        type: DataTypes.STRING,
        allowNull: 'false',
        unique: true
    },
    telefone:{
        type: DataTypes.STRING,

    }

})

// Configuração do servidor express
const app = express()
app.use(cors()) // permite o front-end acessa a api
app.use(express.json()) // perminestate o servidor entender JSON.

const port = 3001

// Definição de rotas (endpoints)
// req: request
// res: response
app.get('/clientes', async (req, res) =>{
    const todosOsClientes = await Cliente.findAll()
    res.json(todosOsClientes)
})

app.post('/clientes', async(req, res) => {
    try {
        const {nome, email, telefone} = req.body
        const novoCliente = await Cliente.create({nome, email, telefone})
        res.status(201).json({
            message: 'Cliente cadastrado com sucesso.',
             cliente: novoCliente
             })
        } catch (error) {
            res.status(400).json({
                error: 'Erro ao cadastrar cliente. Verifique se o cliente já existe.'
            })

    }
})

// Inicializando  o servidor.
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Servidor rodando na porta: ${port}`)
        console.log(`😎 Banco de dados sicronizando`)
    })
}).catch((error) => {
    console.error(`❌ erro ao conectar ou sicronizar com o banco de dados`)
    console.error(error)
})