const dbConn = require('../../config/db.config');

const Student = (student) => {
    this.firstname = student.firstname;
    this.lastname = student.lastname;
    this.email = student.email;
    this.phone = student.phone;
}

module.exports = Student