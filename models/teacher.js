const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const teacherSchema = new Schema({
    identity: String,
    first_name: String,
    last_name: String,
    teacher_ID: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        validate: email => validator.isEmail(email),
        unique: true,
        maxlength: 50,
        minlength: 6,
        required: true,
    },
    city: String,
    mobile_number: Number,
    city: String,
    address_1: String,
    address_2: String,
    title: String,
    introduction: String,
    school: String,

    course: [
        {
            course_ID: String,
            course_name: String
        },
    ],

    password:
    {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 32,
        select: false,
    },
    avatar: String
})

teacherSchema.pre('save', async function (next) {
    const teacher = this;
    if (teacher.isModified('password')) {
        teacher.password = await bcrypt.hash(teacher.password, 8)
    }
    next()
})
teacherSchema.statics.findByEmailPassword = async function (email, password) {
    const teacher = await this.findOne({ email }).select('+password').exec()
    if (!teacher) {
        return;
    }
    if (await bcrypt.compare(password, teacher.password)) {
        return teacher;
    }
}
teacherSchema.methods.tokenGenerator = function () {
    const teacher = this;
    return jwt.sign({
        _id: teacher.id,
        identity: teacher.identity,
        teacher_ID: teacher.teacher_ID,
        email: teacher.email,
        first_name: teacher.first_name
    }, process.env.SERVER_SECRET)

}

module.exports = mongoose.model('Teacher', teacherSchema)

