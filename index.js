require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

const s3 = new aws.S3({
  region: 'ap-southeast-2',
  accessKeyId: 'AKIAJ4544NPQF7W4TH6Q',
  secretAccessKey: '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'
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'teaching-management-system',
    key: function (req, file, cb) {
      const {path} = req.body
      console.log(path)
      cb(null, path+'/'+Date.now().toString())
    }
  })
})

app.use(bodyParser.json())

const studentRouter = require('./routes/student')
const teacherRouter = require('./routes/teacher')
const courseRouter = require('./routes/course')
//CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  next();
});

// app.use("/login", authRouter)
app.use("/students", studentRouter)
app.use('/teachers', teacherRouter)
app.use('/courses', courseRouter)

//'avatar 是前端传过来的key'
app.post('/upload',upload.single('avatar'), (req, res) => {
  res.send(req.file)
})
//give user download promission 
app.get('/download/:key',(req,res)=>{
  const {key} = req.params
  const {path} =req.query
  console.log(path)
  const url = s3.getSignedUrl('getObject', {
    Bucket: 'teaching-management-system'+''+path,
    Key: key,
    Expires: 300
})
//res.redirect(301,url)
  res.send({url})
})

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("DB connected")
});

app.listen(process.env.PORT)
console.log("Listening on " + process.env.PORT)
