const { getPosts, postPost, deletePost, updatePost } = require("../controllers/postController")

const postRouter = require("express").Router()

postRouter.get("/",getPosts)
postRouter.post("/",postPost) //authenitcate
postRouter.delete("/:postId",deletePost) //authenticate
postRouter.patch("/:postId",updatePost) //authenticate











module.exports = postRouter