const Student = require('../models/student')
const status = require('http-status');
const { errorHandler } = require('../tools/helpers')

const studentController = {
    showInfo: async (req, res) => {
        const { id } = req.params
        const student = await Student.findById(id).exec();
        if (student) {
            res.status(201).send(student);
        } else {
            res.sendStatus(status.NOT_FOUND)
        }

    },
    create: async (req, res) => {
        try {
            const newStudent = new Student(req.body);
            await newStudent.save();
            res.send(newStudent);
        } catch (e) {
            errorHandler(e, res)
        }

    },
    update: async (req, res) => {
        const { id } = req.params;
        const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
        res.send(student);
    },
    delete: async (req, res) => {
        const { id } = req.params
        await Student.findByIdAndRemove(id)
        res.sendStatus(204);
    },
    login: async (req, res) => {
        const { email, password } = req.body
        const student = await Student.findByEmailPassword(email, password)
        if (!student) {
            res.sendStatus(status.UNAUTHORIZED)
        }
        res.status(200).send({ token: student.tokenGenerator() });
    },
    findByID: async (req, res) => {
    const { id } = req.params
    const student = await Student.find({student_ID:id}).exec();
    res.status(201).send(student);
    },
    fetchCourse: async (req, res) =>{
        const { id } = req.params
        const student = await Student.findById(id).exec();
        if(student){
            res.status(201).send(student.course)
        }else{
            res.sendStatus(status.NOT_FOUND)
        }
    },
};

module.exports = studentController;
