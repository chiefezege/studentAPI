const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const dbConn = require('./config/db.config');

dotenv.config({ path: './src/config/config.env'});

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/students', require('./src/routes/student.route'));

const PORT  = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Welcome to student API, to view JSON data, visit: https://stud-api-loca.herokuapp.com/api/students')
})
app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`)
})


