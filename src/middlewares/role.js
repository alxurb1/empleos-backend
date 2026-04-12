export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      const error = new Error("No tienes permisos para acceder a este recurso");
      error.statusCode = 403;
      return next(error);
    }
    next();
  };
};
