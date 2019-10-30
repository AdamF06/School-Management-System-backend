const studentController = require('../controllers/student');
const app = require('express');
const mongoose = require('mongoose'); 
const Student = require('../models/student')
const studentRouter = app.Router();

studentRouter.get('/', async(req, res) => {
    const students = await Student.find({}).exec();
    res.send(students);
});

studentRouter.get('/:id', (req, res) => {
    res.send("");
});

studentRouter.post('/', studentController.create);
studentRouter.put('/:id',studentController.update);
studentRouter.delete('/:id', studentController.delete);

module.exports = studentRouter;