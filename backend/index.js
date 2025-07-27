// backend/index.js
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// importa conexão com promise do db
const db = require('./config/db')

// Importar rotas DEPOIS dos middlewares básicos, ANTES do listen
const feedbackRoutes = require('./routes/feedbackRoutes')
app.use('/feedbacks', feedbackRoutes)

app.post('/presencas', async (req, res, next) => {
  const { nome, dataNascimento, cpf, email } = req.body

  if (!nome || !dataNascimento || !cpf || !email) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
  }

  try {
    const [result] = await db.query(
      'INSERT INTO presencas (nome, data_nascimento, cpf, email) VALUES (?, ?, ?, ?)',
      [nome, dataNascimento, cpf, email]
    )
    res.status(201).json({ id: result.insertId, mensagem: 'Presença registrada com sucesso' })
  } catch (error) {
    console.error('Erro ao inserir presença:', error)
    next(error)
  }
})

app.get('/', (req, res) => {
  res.send('Casa Aberta Senac - Backend rodando')
})

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Erro interno no servidor' })
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
