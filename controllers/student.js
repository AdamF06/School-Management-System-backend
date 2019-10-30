const Student = require('../models/student')


const studentController = {
    create: async (req,res)=>{
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.send(newStudent);
    },
    update: async (req,res)=>{
        const {id} = req.params;
        const student = await Student.findByIdAndUpdate(id, req.body, {new:true});
        res.send(student);
    },
    delete: (req,res)=>{
        res.sendStatus(204);
    }
};

module.exports = studentController;