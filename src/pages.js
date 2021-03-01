const { response } = require('express')
const Database = require('./database/db')
const saveOrfanato = require('./database/saveOrfanato')

module.exports = {

    index(req, resp) {
        const cidade = "Campinas"
        //const cidade = req.query.cidade  //localhost:5500/?cidade=Campinas
        return resp.render('index', { cidade })
    },

    async orfanato(req, resp) {
        const id = req.query.id
        try {
            const db = await Database;
            const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`)
            const orphanage = results[0]

            orphanage.images = orphanage.images.split(",")
            if (orphanage.images.length > 0)
                orphanage.firstImage = orphanage.images[0]
            else
                orphanage.firstImage = ""

            if(orphanage.open_on_weekends == "0"){
                orphanage.open_on_weekends = false
            } else {
                orphanage.open_on_weekends = true
            }

            return resp.render('orfanato', { orphanage })

        } catch (erro) {
            console.error(erro)
            return response.send('Erro no banco de dados')
        }
    },

    async orfanatos(req, resp) {
        try {
            const db = await Database;
            const orphanages = await db.all("SELECT * FROM orphanages")
            return resp.render('orfanatos', { orphanages })
        } catch (erro) {
            console.error(erro)
            return response.send('Erro no banco de dados')
        }       
    },

    createOrfanato(req, resp) {
        return resp.render('create-orfanato')
    },

    async saveOrfanato(req, resp) {
       
        const fields = req.body

        // validar se todos os campos estao preenchidos
        // Object.values transforma o objeto em um array
        if (Object.values(fields).includes('')){
            return resp.send('Todos os campos devem ser preenchidos')
        }

        //salvar o orfanato
        try {
            const db = await Database
            await saveOrfanato(db, {
                lat: fields.lat,
                lng: fields.lng,
                name: fields.name,
                about: fields.about,
                whatsapp: fields.whatsapp,
                images: fields.images.toString(),
                instructions: fields.instructions,
                opening_hours: fields.opening_hours,
                open_on_weekends: fields.open_on_weekends
            })

            //redirecionamento
            return resp.redirect('/orfanatos')

        } catch(erro) {
            console.error(erro)
            return response.send('Erro no banco de dados')
        }        
    },

    async delOrfanato(req, resp) {

        const id = req.query.id

        try {
            const db = await Database;
            const orphanages = await db.run(`
                DELETE FROM orphanages WHERE id = "${id}"
            `)

            //redirecionamento
            return resp.redirect('/orfanatos')

        } catch (erro) {
            console.error(erro)
            return response.send('Erro no banco de dados')
        }       
    }
    
}
