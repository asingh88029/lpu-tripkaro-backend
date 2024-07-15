const fs = require("fs")

async function logger(request, response, next){
    try{

        const date = new Date().toISOString()

        const log = `${request.url} ${request.method} ${date} \n`

        fs.appendFileSync("logs/req.txt", log, 'utf-8')

        next()


    }catch(err){
        console.log(err)
        response.status(500).json({
            success : false
        })
    }
}

module.exports = logger