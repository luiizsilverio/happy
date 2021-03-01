// importar dependências
const express = require('express');
const path = require('path');
const pages = require('./pages.js')

// iniciando o express (criando o servidor)
const server = express()
server
    // permite utilizar o req.body. Se não precisar usar, a linha abaixo é desnecessária.
    .use(express.urlencoded({ extended: true }))

    // define onde estão os arquivos estáticos (css, imagens, scripts do front)
    .use(express.static('public'))

    // configurar o template engine (hbs)
    .set('views', path.join(__dirname, "views"))
    .set('view engine', 'hbs')

    // rotas da aplicação
    .get('/', pages.index)
    .get('/orfanato', pages.orfanato)
    .get('/orfanatos', pages.orfanatos)
    .get('/create-orfanato', pages.createOrfanato)
    .post('/save-orfanato', pages.saveOrfanato)
    .get('/del-orfanato', pages.delOrfanato)

/* versão mais simples
    .get('/', (req, resp) =>  {
        const cidade = req.query.cidade
        return resp.render('index', { cidade })
    })
*/

// ligar o servidor
//server.listen(5500)
//server.listen(5500, () => {
server.listen(process.env.PORT, () => {
    console.log('Happy rodando na porta 5500')
})

