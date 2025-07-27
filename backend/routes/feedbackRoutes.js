const express = require('express')
const router = express.Router()
const db = require('../config/db')

router.post('/', async (req, res) => {
    console.log('Recebido feedback:', req.body)
    try {
        const { nome, estrelas, comentario } = req.body
        const ip = req.ip || req.connection.remoteAddress || ''

        if (!estrelas || estrelas < 1 || estrelas > 5) {
            return res.status(400).json({ error: 'Avaliação por estrelas inválida' })
        }

        const nomeDb = nome && nome.trim() !== '' ? nome.trim() : null
        const comentarioDb = comentario && comentario.trim() !== '' ? comentario.trim() : null

        const sql = 'INSERT INTO feedbacks (nome, estrelas, comentario, ip) VALUES (?, ?, ?, ?)'
        await db.execute(sql, [nomeDb, estrelas, comentarioDb, ip])
        console.log('Feedback inserido com sucesso')

        res.status(201).json({ message: 'Feedback enviado com sucesso' })
    } catch (error) {
        console.error('Erro ao inserir feedback:', error)
        res.status(500).json({ error: 'Erro interno ao salvar feedback' })
    }
})

module.exports = router
