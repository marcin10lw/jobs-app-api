const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.message);

  res
    .status(500)
    .json({ msg: "Something  went wrong, please try again later" });
};

export default errorHandlerMiddleware;
