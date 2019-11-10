require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const studentRouter = require('./routes/student')
const teacherRouter = require('./routes/teacher')
const assignmentRouter = require('./routes/assignment')
const courseRouter = require('./routes/course')
//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  next();
});

app.use("/students", studentRouter)
app.use('/teachers', teacherRouter)
app.use('/assignments',assignmentRouter)
app.use('/courses',courseRouter)



mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("DB connected")
});

app.listen(process.env.PORT)
console.log("Listening on " + process.env.PORT)
