const mysql = require('mysql');
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env'});


const dbConn = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database   
});

dbConn.connect((err) => {
    if(err) {
        console.log(err)
    }
    console.log('Database connected')
});

module.exports = dbConn