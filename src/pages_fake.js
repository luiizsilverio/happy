const orphanages = require('./database/fakedata.js')

//Busca os dados de um BD falso, apenas para praticar

module.exports = {

    index(req, resp) {
        //const cidade = "Nova Odessa"
        const cidade = req.query.cidade  //localhost:5500/?cidade=Campinas
        return resp.render('index', { cidade })
    },

    orfanato(req, resp) {
        return resp.render('orfanato')
    },

    orfanatos(req, resp) {
        return resp.render('orfanatos', { orphanages })
    },

    createOrfanato(req, resp) {
        return resp.render('create-orfanato')
    }

}
