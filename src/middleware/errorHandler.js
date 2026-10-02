export const notFound = (req, res) => {
  res
    .status(404)
    .json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) return next(error);
  const status = error.status || (error.name === "CastError" ? 400 : 500);
  if (status >= 500) console.error(error);
  res
    .status(status)
    .json({ message: error.message || "Internal server error" });
};
