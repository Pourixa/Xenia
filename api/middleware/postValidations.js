const {body} = require("express-validator")


exports.commentValidations = [
    body("content").trim()
    .notEmpty().withMessage("Comment can't be empty")
    .isLength({min:1,max:280}).withMessage("Comment must be between 1 and 280 characters.")
]

exports.postValidations = [
        body("content").trim()
    .notEmpty().withMessage("Post can't be empty")
    .isLength({min:1,max:280}).withMessage("Comment must be between 1 and 280 characters.")
]