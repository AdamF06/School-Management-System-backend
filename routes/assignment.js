const assignmentController = require('../controllers/assignment')
const app = require('express');
const assignmentRouter = app.Router()


assignmentRouter.post('/',assignmentController.create)
assignmentRouter.put('/id',assignmentController.update)

module.exports = assignmentRouter