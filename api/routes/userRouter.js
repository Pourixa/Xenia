const { updateUser, deleteUser, searchUser, getCurrentUser, getUserInfo, followUser, unfollowUser } = require("../controllers/userController")
const { githubAuth, githubAuthCallback } = require("../middleware/githubAuth")
const {authenticate} = require("../middleware/utils")
const userRouter = require("express").Router()

userRouter.patch("/",updateUser)  //authenticate update user
userRouter.delete("/",deleteUser)  //authenticate delete user


// userRouter.post("/auth/signin",signinUser) // sign in  
// userRouter.post("/auth/signup",signupUser) // signup user
userRouter.post("/search",searchUser) // search user by query username
userRouter.post("/:username/follow",authenticate,followUser) // search user by query username
userRouter.post("/:username/unfollow",authenticate,unfollowUser) // search user by query username

userRouter.get("/",getCurrentUser)
userRouter.get("/auth/github",authenticate,githubAuth)
userRouter.get("/auth/github/callback",authenticate,githubAuthCallback)
userRouter.get("/:username",getUserInfo)  // get user by username









module.exports = userRouter