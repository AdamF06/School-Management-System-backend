const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const studentSchema = new Schema({
    identity:String,
    first_name: String,
    last_name: String,
    student_ID: {
        type: String,
        unique: true,
        required:true,
     },
    email: {
        type: String,
        validate: email => validator.isEmail(email),
        unique: true,
        maxlength: 50,
        minlength: 6,
        required: true,
    },
    mobile_number:Number,
    city: String,
    address_1: String,
    address_2: String,
    title: String,
    introduction: String,
    school: String,

    course: [
        {
            course_ID: String,
            course_name:String,
            season:String,
            paied: Number,
        },
    ],
    assignment: [
        {
            name: String,
            key: String,
        }
    ],
    project: [
        {
            name: String,
            key: String,
        }
    ],
    password:
    {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 32,
        select: false,
    },
    avatar:String
})

//save是事件名
studentSchema.pre('save', async function (next) {
    const student = this;
    if (student.isModified('password')) {
        student.password = await bcrypt.hash(student.password, 8)
    }
    next()
})

studentSchema.statics.findByEmailPassword = async function (email, password) {
    const student = await this.findOne({ email }).select('+password').exec()
    if (!student) {
        return;
    }
    if (await bcrypt.compare(password, student.password)) {
        return student;
    }
}

studentSchema.methods.tokenGenerator = function () {
    const student = this;
    return jwt.sign({
        _id: student.id,
        student_ID:student.student_ID,
        email: student.email,
        identity:student.identity,
        first_name: student.first_name,
        last_name:student.last_name
    }, process.env.SERVER_SECRET)
}
module.exports = mongoose.model('Student', studentSchema)
