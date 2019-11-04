require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const studentRouter = require('./routes/student')
app.use("/students", studentRouter)

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useCreateIndexes: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("DB connected")
});

app.listen(process.env.PORT)
console.log("Listening on " + process.env.PORT)
