const {
  getPosts,
  postPost,
  deletePost,
  updatePost,
  getPost,
  getPostsFollowing,
  getPostsByUsername,
  getCommentsByUsername,
  getLikesByUsername,
  commentPost,
} = require("../controllers/postController");

const {authenticate} = require("../middleware/authenticate")

const postRouter = require("express").Router();

postRouter.get("/", getPosts);
postRouter.get("/user/:username", getPostsByUsername);
postRouter.get("/comments/:username", getCommentsByUsername);
postRouter.get("/likes/:username", getLikesByUsername);
postRouter.get("/following",authenticate, getPostsFollowing);
postRouter.get("/:postId",authenticate, getPost);


postRouter.post("/",authenticate, postPost); //authenitcate
postRouter.post("/comment", commentPost); //authenitcate

postRouter.delete("/:postId", deletePost); //authenticate
postRouter.patch("/:postId", updatePost); //authenticate

module.exports = postRouter;
