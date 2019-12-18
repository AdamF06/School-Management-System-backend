const Teacher = require('../models/teacher')
const status = require('http-status');
const { errorHandler } = require('../tools/helpers')

const teacherController = {
    showInfo: async (req, res) => {
        const { id } = req.params
        const teacher = await Teacher.find({teacher_ID:id}).exec();
        
        if (teacher) {
            res.status(201).send(teacher);
        } else {
            res.sendStatus(status.NOT_FOUND)
        }

    },
    create: async (req, res) => {
        try {
            const newTeacher = new Teacher(req.body);
            await newTeacher.save();
            res.send(newTeacher);
        } catch (e) {
            errorHandler(e, res)
        }

    },
    update: async (req, res) => {
        const { id } = req.params;
        const teacher = await Teacher.findByIdAndUpdate(id, req.body, { new: true });
        res.send(teacher);
    },

    login: async (req, res) => {
        const { email, password } = req.body
        const teacher = await Teacher.findByEmailPassword(email, password)
        if (!teacher) {
            res.sendStatus(status.UNAUTHORIZED)
        }
        res.send({ token: teacher.tokenGenerator() });
    },

    showStudent: async (req,res)=>{
        const { id } = req.params
        const teacher = await Teacher.find({teacher_ID:id}).exec();
        if (teacher) {
            res.status(201).send(teacher[0].student);
        } else {
            res.sendStatus(status.NOT_FOUND)
        }
    }
};

module.exports = teacherController;