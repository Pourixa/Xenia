const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  try {
    let bearer = null;
    if (req.cookies.token)
      bearer = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = bearer;
    next();
  } catch (e) {
    next(e);
  }
};
