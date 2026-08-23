const { getPosts } = require("../controllers/postController")

const postRouter = require("express").Router()

postRouter.use("/",getPosts)












module.exports = postRouter