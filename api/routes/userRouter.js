const { updateUser, deleteUser, getUser, searchUser, getCurrentUser } = require("../controllers/userController")
const { githubAuth, githubAuthCallback } = require("../middleware/githubAuth")

const userRouter = require("express").Router()

userRouter.patch("/",updateUser)  //authenticate update user
userRouter.delete("/",deleteUser)  //authenticate delete user


// userRouter.post("/auth/signin",signinUser) // sign in  
// userRouter.post("/auth/signup",signupUser) // signup user
userRouter.post("/search",searchUser) // search user by query username

userRouter.get("/",getCurrentUser)
userRouter.get("/auth/github",githubAuth)
userRouter.get("/auth/github/callback",githubAuthCallback)
userRouter.get("/:username",getUser)  // get user by username









module.exports = userRouter