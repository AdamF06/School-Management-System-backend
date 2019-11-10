const courseController = require('../controllers/course')
const app = require('express')
const courseRouter = app.Router();

courseRouter.post('/', courseController.create)
courseRouter.put('/id', courseController.update)

module.exports = courseRouter
