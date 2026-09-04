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

exports.unavailableUsernames = [
  "signin",
  "login",
  "signup",
  "register",
  "registration",
  "logout",
  "authenticate",
  "authentication",
  "auth",
  "account",
  "accounts",
  "password",
  "reset",
  "forgotpassword",
  "verify",
  "verification",
    "admin",
  "administrator",
  "moderator",
  "mod",
  "support",
  "help",
  "about",
  "contact",
  "settings",
  "setting",
  "preferences",
  "notifications",
  "notification",
  "messages",
  "message",
  "chat",
  "search",
  "home",
  "feed",
  "explore",
  "discover",
  "profile",
  "user",
  "users",
  "post",
  "posts",
  "create",
  "edit",
  "delete",
  "api",
  "www",
  "app",
    "xenia",
  "official",
  "officialxenia",
  "team",
  "staff",
  "developer",
  "developers",
  "system",
  "root",
  "owner",
  "service",
  "services",
  "bot",
  "bots",
    "favicon",
  "robots",
  "sitemap",
  "manifest",
  "static",
  "assets",
  "public",
  "uploads",
  "files",
  "download",
  "downloads",
  "oauth",
  "callback",
  "github",
  "terms",
"privacy",
"security",
"status",
"feedback",
"report",
"reports",
"blocked",
"bookmarks",
"likes",
"following",
"followers",
];