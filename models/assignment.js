const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    assignment_ID:String,
    assignment_name:String,
    description:String,
    weight:Number, //权重
    student_ID:String,
    mark:Number,
    state:String,
    start_date:Date,
    close_date:Date,
    further_url:String,//redirect用
})

module.exports = mongoose.model('assignment',assignmentSchema)