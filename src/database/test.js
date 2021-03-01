
const Database = require('./db')
const saveOrfanato = require('./saveOrfanato')

Database.then(async db => {
    
/*    
    // inserir dados na tabela
    const instituicao = {
        lat: "-22.8979918",
        lng: "-47.059976",
        name: "André Luis",
        about: "Bla bla bla Lorem ipsum bla bla bla",
        whatsapp: "8111-9010",
        images: [
            "https://images.unsplash.com/photo-1590033821368-7f7f469b1561?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9", 
            "https://images.unsplash.com/photo-1598137203989-3152bec01cf4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9" 
        ].toString(),
        instructions: "Lorem ipsum tortor tristique vitae elit.",
        opening_hours: "Lorem 08:00 ipsum 17:00 dolor sit amet.",
        open_on_weekends: "1"
    }
    
    await saveOrfanato(db, instituicao)
*/
        
    //consultar dados da tabela
    const resultado = await db.all("SELECT * FROM orphanages")
    console.log(resultado)

/*
    //consultar um orfanato pelo id
    const orfanato = await db.all('SELECT * FROM orphanages WHERE id = "1"')
    console.log(orfanato)

    //deletar dado da tabela
    console.log( await db.run("DELETE FROM orphanages WHERE id = '3'"))
*/

})
