const form = document.getElementById('form-feedback')
const mensagem = document.getElementById('mensagem')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // Validação das estrelas (obrigatório)
    const estrelas = form.estrelas.value
    if (!estrelas) {
        mensagem.textContent = 'Por favor, selecione uma avaliação por estrelas.'
        mensagem.style.color = 'red'
        return
    }

    // Se nome vazio, envia null para o backend (o backend substitui por 'Anônimo' se quiser)
    const nomeRaw = form.nome.value.trim()
    const nome = nomeRaw === '' ? null : nomeRaw

    // Comentário opcional, enviar null se vazio
    const comentarioRaw = form.comentario.value.trim()
    const comentario = comentarioRaw === '' ? null : comentarioRaw

    const dados = { nome, estrelas, comentario }

    try {
        const response = await fetch(`${BASE_URL}/feedbacks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        })

        if (response.ok) {
            mensagem.textContent = 'Obrigado pelo seu feedback!'
            mensagem.style.color = 'green'
            form.reset()
        } else {
            mensagem.textContent = 'Erro ao enviar feedback. Tente novamente.'
            mensagem.style.color = 'red'
        }
    } catch (error) {
        mensagem.textContent = 'Erro ao enviar feedback. Tente novamente.'
        mensagem.style.color = 'red'
    }
})
