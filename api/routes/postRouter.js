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

const {authenticate, checkValidation} = require("../middleware/utils")
const {commentValidations} = require("../middleware/postValidations")

const postRouter = require("express").Router();

postRouter.get("/", getPosts);
postRouter.get("/user/:username", getPostsByUsername);
postRouter.get("/comments/:username", getCommentsByUsername);
postRouter.get("/likes/:username", getLikesByUsername);
postRouter.get("/following",authenticate, getPostsFollowing);
postRouter.get("/:postId",authenticate, getPost);

postRouter.post("/",authenticate, postPost); //authenitcate
postRouter.post("/:postId/comment",...commentValidations,checkValidation,authenticate, commentPost); //authenitcate

postRouter.delete("/:postId", deletePost); //authenticate
postRouter.patch("/:postId", updatePost); //authenticate

module.exports = postRouter;
