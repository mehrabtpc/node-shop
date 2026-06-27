export const protect = (req, res, next) => {
  next();
};

export const adminOnly = (req, res, next) => {
  next();
};
