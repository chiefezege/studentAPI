const dbConn = require('../../config/db.config');
const StudentModel = require('../models/student.model')


const studentController = {
    postStudent: (req, res) => {
        if (req.body.firstname && req.body.lastname && req.body.email && req.body.phone) {
            console.log('Request received');
            dbConn.connect((err) => {
                dbConn.query(`INSERT INTO studentAPI.students (firstname, lastname, email, phone) VALUES ('${req.body.firstname}', '${req.body.lastname}', '${req.body.email}', '${req.body.phone}')`, (err, result, fields)  => {
                    if (err) res.send(err);
                    if (result) res.send({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, phone: req.body.phone});
                });
            });
        } else {
            console.log('Missing a parameter');
        }
    },
    getStudents: (req, res) => {
        const sql = 'SELECT * FROM students';
        
        dbConn.connect((err) => {
            dbConn.query(sql, (err, result, fields) =>  {
                if (err) res.status(400).send({ error: "something failed" });
                if (result) res.send(result);
            });
        });
    },
    getById: (req, res) => {
        const { id } = req.params
        const sql = `SELECT * FROM students WHERE id= ${id}`
        dbConn.connect((err) => {
            dbConn.query(sql, (err, result, fields) => {
                if (err) res.status(400).send({ error: "something failed" });
                if (result) res.send(result);
            });
        });
    },
    putById: (req, res) => {
        const { id } = req.params
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const phone = req.body.phone;

        const sql = `UPDATE students SET firstname='${firstname}', lastname='${lastname}', email='${email}', phone='${phone}'  WHERE id= ${id}`
        dbConn.connect((err) => {
            dbConn.query(sql, (err, result, fields) => {
                if (err) res.status(400).send({ error: "something failed" });
                if (result) res.send(result);
            });
        });
    },
    deleteById: (req, res) => {
        const { id } = req.params

        const sql = `DELETE FROM students WHERE id = ${id}`
        dbConn.connect((err) => {
            dbConn.query(sql, (err, result, fields) => {
                if (err) res.status(400).send({ error: "something failed" });
                if (result) res.json({ status: "Entry Deleted" });
            });
        });
    },
    getByPage: (req, res) => {
        const numPerPage = 20;
        const skip = (page - 1) * numPerPage; 
        const limit = skip + ',' + numPerPage; 
        dbConn.connect((err) => {
            dbConn.query('SELECT count(*) as numRows FROM students', (err, rows, fields) => {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }else{
                    var numRows = rows[0].numRows;
                    var numPages = Math.ceil(numRows / numPerPage);
                    sql.query('SELECT * FROM students LIMIT ' + limit, (err, rows, fields) => {
                        if(err) {
                            console.log("error: ", err);
                            result(err, null);
                        }else{
                            console.log(rows)
                            result(null, rows,numPages);
                        }
                    });            
                }
            });
        }); 
    }
}

module.exports = studentController;