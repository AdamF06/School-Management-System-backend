const studentController = require('../controllers/student');
const app = require('express');
const studentRouter = app.Router();
const jwt = require('express-jwt');

studentRouter.get("/:id",jwt({secret: process.env.SERVER_SECRET}),studentController.showInfo);
studentRouter.get("/ID/:id",studentController.findByID)
studentRouter.post('/', studentController.create);
studentRouter.post('/login', studentController.login);
studentRouter.put('/:id',studentController.update);
studentRouter.delete('/:id', studentController.delete);
studentRouter.get("/fetchCourse/:id",jwt({secret: process.env.SERVER_SECRET}),studentController.fetchCourse);

module.exports = studentRouter;
