const {
  getPosts,
  postPost,
  deletePost,
  updatePost,
  getPost,
  getPostsFollowing,
  commentPost,
  likePost,
  unlikePost,
  getPostsById,
  getCommentsById,
  getLikesById,
} = require("../controllers/postController");

const multer  = require('multer')
const storage = multer.memoryStorage()

const upload = multer({storage:storage})
const {authenticate, checkValidation} = require("../middleware/utils")
const {commentValidations, postValidations} = require("../middleware/postValidations")

const postRouter = require("express").Router();

postRouter.get("/",authenticate, getPosts);
postRouter.get("/user/:id",authenticate, getPostsById);
postRouter.get("/comments/:id", getCommentsById);
postRouter.get("/likes/:id", getLikesById);
postRouter.get("/following",authenticate, getPostsFollowing);
postRouter.get("/:postId",authenticate, getPost);

postRouter.post("/",authenticate,upload.array("images",4),...postValidations,checkValidation, postPost); //authenitcate
postRouter.post("/:postId/comment",...commentValidations,checkValidation,authenticate, commentPost); //authenitcate
postRouter.post("/:postId/like",authenticate, likePost); //authenitcate
postRouter.post("/:postId/unlike",authenticate, unlikePost); //authenitcate

postRouter.delete("/:postId", deletePost); //authenticate
postRouter.patch("/:postId", updatePost); //authenticate

module.exports = postRouter;
