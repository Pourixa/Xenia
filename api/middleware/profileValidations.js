const { body } = require("express-validator");
const { unavailableUsernames } = require("./utils");

exports.profileValidations = [
    body("username").trim().toLowerCase()
    .not().isIn(unavailableUsernames)
    .notEmpty().withMessage("Username can't be empty")
    .isLength({min:1,max:39}).withMessage("Username must be between 1 to 39 characters")
    .isAlphanumeric().withMessage("Username must be alphanumeric."),
    body("name").trim()
    .notEmpty().withMessage("Name can't be empty")
    .isLength({min:1,max:39}).withMessage("Name must be between 1 to 39 characters"),
    body("bio").isLength({min:0,max:160}).withMessage("Bio must be between 0 to 160 characters")
]