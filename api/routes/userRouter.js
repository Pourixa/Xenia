const { updateUser, deleteUser, searchUser, getCurrentUser, getUserInfo, followUser, unfollowUser, getNotifications, readNotifs, editprofile } = require("../controllers/userController")
const { githubAuth, githubAuthCallback } = require("../middleware/githubAuth")
const { profileValidations } = require("../middleware/profileValidations")
const {authenticate, checkValidation} = require("../middleware/utils")
const userRouter = require("express").Router()

userRouter.patch("/",updateUser)  //authenticate update user
userRouter.delete("/",deleteUser)  //authenticate delete user


// userRouter.post("/auth/signin",signinUser) // sign in  
// userRouter.post("/auth/signup",signupUser) // signup user
userRouter.post("/search",searchUser) // search user by query username
userRouter.post("/:username/follow",authenticate,followUser) // search user by query username
userRouter.post("/:username/unfollow",authenticate,unfollowUser) // search user by query username

userRouter.get("/",authenticate,getCurrentUser)
userRouter.get("/notifications",authenticate,getNotifications)
userRouter.get("/auth/github",authenticate,githubAuth)
userRouter.get("/auth/github/callback",authenticate,githubAuthCallback)
userRouter.get("/:username",getUserInfo)  // get user by username

userRouter.patch("/readNotifications",authenticate,readNotifs)
userRouter.patch("/editprofile",...profileValidations,checkValidation,authenticate,editprofile)








module.exports = userRouter