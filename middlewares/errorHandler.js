module.exports = function(err, req, res, next) {
    let message = "Internal Server Error!"
  
    switch(err.name) {
      case "SequelizeValidationError":
        statusCode = 400
        message = err.errors[0].message
        break;
      case "SequelizeUniqueConstraintError":
        statusCode = 400
        message = err.errors[0].message
        break;
      case "SequelizeForeignKeyConstraintError":
        statusCode = 400
        message = 'ForeignKey error!' 
        break;
      case "SequelizeDatabaseError":
        statusCode = 400
        message = 'CategoryId cannot be empty'
        break;
      case "BadRequestError":
      case "ProxyAuthenticationRequiredError":
      case "NotFoundError":
      case "UnauthorizedError":
        statusCode = err.statusCode
        message = err.message
        break;
    }
    statusCode === 500 && console.log(err.stack, '🛑')
    res.status(statusCode).json({message})
  }
  