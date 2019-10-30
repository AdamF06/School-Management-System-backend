const express = require('express')
const app = express()
const mongoose = require('mongoose'); 
const studentRouter = require('./routes/student');

const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv').config();
app.use("/students",studentRouter);

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
//   console.log("connected")
});
app.listen(process.env.PORT)

console.log("Listening on "+process.env.PORT)
