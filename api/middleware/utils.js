const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator")

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

exports.checkValidation = async (req,res,next) => {
  try{
    const valid = validationResult(req)
    if(!valid.isEmpty())
      throw new Error(valid.array()[0].msg)
    next()
  } catch(e) {
  next(e)
  }
}

exports.errorHandler = (err,req,res,next) => {
    console.log(err)
    res.status(500).json({msg:"Something went wrong."})
}