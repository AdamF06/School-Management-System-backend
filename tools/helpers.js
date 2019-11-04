const status = require('http-status')

const  errorHandler = (e,res) => {
    if(e.name === "ValidationError"){
        res.status(status.UNPROCESSABLE_ENTITY).send(e.errors)
        return
    }
    res.send(status.INTERNAL_SERVER_ERROR);
}

module.exports={
    errorHandler,
}