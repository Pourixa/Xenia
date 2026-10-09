const { createClient } = require('@supabase/supabase-js')
const { randomUUID } = require("node:crypto");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator")
require("dotenv").config()
const supabase = createClient(process.env.PROJECT_URL, process.env.API_KEY)

class responseError extends Error {
  constructor (message , code) 
  {
    super(message)
    this.code = code
  }
}

exports.uploadFile = async (buffer, contentType) => {
  const { data, error } = await supabase.storage
    .from('Images')
    .upload(randomUUID(), buffer, { contentType });
  if (error) {
    throw error;
  } else {
    const urlStruct = supabase.storage.from('Images').getPublicUrl(data.path)
    return urlStruct.data.publicUrl
  }
}

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
      throw new responseError(valid.array()[0].msg,400)
    next()
  } catch(e) {
  next(e)
  }
}

exports.errorHandler = (err,req,res,next) => {
    console.log('err',err)
    if(err.code === 400)
      res.status(400).json({msg:err.message})
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