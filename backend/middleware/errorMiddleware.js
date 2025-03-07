const colors = require('colors');

const errorHandler = (err, req, res, next) => {
  // Use colors to format the error message
  console.error(`Error: ${err.message}`.red.underline);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
