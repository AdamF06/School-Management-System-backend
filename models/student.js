const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    first_name:String,
    last_name:String,
    ID:String,
    email:String,
    contacts:[
        {
            phone_number:Number,
            contacts_type:String,
        }
    ],
    password:String,
})

module.exports = mongoose.model('Studnet',studentSchema)

