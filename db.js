const mysql = require("mysql2/promise")


// exportar para outros arquivos
 export const db= mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database:"escola"
})

module.exports =db