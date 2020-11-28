const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const dbConn = require('./config/db.config');

dotenv.config({ path: './src/config/config.env'});

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const PORT  = process.env.PORT || 5000

app.use('/api/students', require('./src/routes/student.route'));

app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`)
})


