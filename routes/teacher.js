const teacherController = require('../controllers/teacher')
const app = require('express')
const teacherRouter = app.Router()
const jwt = require('express-jwt')

teacherRouter.get('/profile/:id',jwt({secret: process.env.SERVER_SECRET}),teacherController.showInfo)
teacherRouter.get('/students/:id',jwt({secret: process.env.SERVER_SECRET}),teacherController.showStudent)
teacherRouter.post('/',teacherController.create)//以后有管理员做成管理员权限
teacherRouter.post('/login',teacherController.login)
teacherRouter.put('/:id',teacherController.update)

module.exports = teacherRouter