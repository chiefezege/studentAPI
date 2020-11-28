const router = require('express').Router();
const dbConn = require('../../config/db.config');
const studentController = require('../controllers/student.controller')

router.route('/')
    .post(studentController.postStudent)
    .get(studentController.getStudents)

router.route('/:id')
    .get(studentController.getById)
    .put(studentController.putById)
    .delete(studentController.deleteById)

router.route('/pagination')
    .get(studentController.getByPage)




module.exports = router;
