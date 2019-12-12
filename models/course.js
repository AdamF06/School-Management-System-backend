const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_ID: { type: String, unique: true },
    state: String,//on going, complete, on apply...
    name: String,
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
    module:[
        {
            No:Number,
            module_name: String,
            start_date: Date,
            description: String,
            key: String
        }
    ],
    assignment: [
        {
            No:Number,
            assignment_name: String,
            start_date: Date,
            end_date: Date,
            marks: Number,
            description: String,
            key: String
        }
    ],
    project: [
        {
            No:Number,
            project_name: String,
            start_date: Date,
            end_date: Date,
            marks: Number,
            description: String,
            key: String
        }
    ],
    student:[
        {id:String}
    ]
})

module.exports = mongoose.model('Course', courseSchema)