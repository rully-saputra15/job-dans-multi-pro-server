const errorHandler = (err, _req, res, _next) => {
  console.log(err);
  let statusCode = 0;
  let message = "";
  switch (err.name) {
    case "SequelizeValidationError":
      statusCode = 400;
      message = err.errors[0].message;
      break;
    case "InvalidToken":
      statusCode = 401;
      message = "Invalid token";
      break;
    case "TitleIsRequired":
      statusCode = 400;
      message = "Username is required";
      break;
    case "PasswordIsRequired":
      statusCode = 400;
      message = "Password is Required";
      break;
    case "Unauthenticated":
      statusCode = 401;
      message = "Not authenticated";
      break;
    case "JsonWebToken":
      statusCode = 401;
      message = "Invalid Token";
      break;
    default:
      statusCode = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(statusCode).json({
    statusCode: statusCode,
    message: message,
  });
};

module.exports = errorHandler;
