const userRouter = require("express").Router()

userRouter.post("/signin",signinUser) // sign in  
userRouter.post("/signup",signupUser) // signup user
userRouter.get("/:username",getUser)  // get user by username
userRouter.patch("/:username",updateUser)  // get user by username








module.exports = userRouter