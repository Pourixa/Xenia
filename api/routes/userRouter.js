const userRouter = require("express").Router()

userRouter.patch("/",updateUser)  //authenticate update user
userRouter.delete("/",deleteUser)  //authenticate delete user

userRouter.get("/:username",getUser)  // get user by username

userRouter.post("/auth/signin",signinUser) // sign in  
userRouter.post("/auth/signup",signupUser) // signup user
userRouter.post("/search/username",searchUser) // search user by query username








module.exports = userRouter