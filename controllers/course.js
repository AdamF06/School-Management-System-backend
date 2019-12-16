const Course = require('../models/course')
// const status = require('http-status');
const { errorHandler } = require('../tools/helpers')

const courseController = {
    create: async (req, res) => {
        try {
            const newCourse = new Course(req.body)
            await newCourse.save()
            res.send(newCourse)
        } catch (e) {
            errorHandler(e, res)
        }
    },

    update: async (req, res) => {
        const { id } = req.params
        const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
        res.send(course)
    },
    findByID: async (req, res) => {
        const { id } = req.params
        const course = await Course.find({ course_ID: id }).exec();
        if(course){
            res.status(201).send(course);
        }else{
            res.send('not found');
        }
    }
}

module.exports = courseController