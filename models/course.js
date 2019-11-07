const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_ID = { type: String, unique: true },
    state: String,//on going, complete, on apply...
    name: String,
    course_code: String,
    number_of_students: Number,
    prerequest_knowledge: [
        { knowledge: String }
    ],
    course_length: String,
    teaching_method: String,
    city: String,
    course_objective: String,
    level: String,
    start_apply_date: Date,
    tution: Number, //学费
    complete_date: Date,
    teachers: [
        { teacher_ID: String },
    ],
    address: [
        { address_1: String },
        { address_2: String }
    ],
    thumbnall: Number,

    assignment: [
        { assignment_name: String }
    ],//这个ass没有ID,每个学生的ass通过ass_ID查看
    project: [
        {
            project_name: String,
            start_date: Date,
            end_date: Date,
            marks: Number,
            description: String,
        }
    ]
})

module.exports = mongoose.model('Course', courseSchema)