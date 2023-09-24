const notFoundMiddleware = (req, res) =>
  res.status(404).json({ msg: "This route does not exist" });

export default notFoundMiddleware;
