const {
  getPosts,
  postPost,
  deletePost,
  updatePost,
  getPost,
  getPostsFollowing,
  getPostsByUsername,
  getCommentsByUsername,
} = require("../controllers/postController");

const postRouter = require("express").Router();

postRouter.get("/", getPosts);
postRouter.get("/user/:username", getPostsByUsername);
postRouter.get("/comments/:username", getCommentsByUsername);

postRouter.get("/following", getPostsFollowing);
postRouter.get("/:postId", getPost);

postRouter.post("/", postPost); //authenitcate

postRouter.delete("/:postId", deletePost); //authenticate
postRouter.patch("/:postId", updatePost); //authenticate

module.exports = postRouter;
