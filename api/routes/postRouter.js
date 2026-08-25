const {
  getPosts,
  postPost,
  deletePost,
  updatePost,
  getPost,
} = require("../controllers/postController");

const postRouter = require("express").Router();

postRouter.get("/", getPosts);
postRouter.get("/:postId", getPost);

postRouter.post("/", postPost); //authenitcate

postRouter.delete("/:postId", deletePost); //authenticate
postRouter.patch("/:postId", updatePost); //authenticate

module.exports = postRouter;
