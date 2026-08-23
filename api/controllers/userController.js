const db = require("../prisma/db").prisma;
const jwt = require("jsonwebtoken")


exports.deleteUser = async (req,res,next) => {
    try {
        const user = await db.user.delete({
            where:{
                id:req.user.id
            },
        })
        res.json(user)
    } catch (e) {
        next(e)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const user = await db.user.update({
            where: {
                id: req.user.id
            },
            data:{
                username:req.body.username,
            }
        });

        res.json(user);
    } catch (e) {
        next(e);
    }
};

exports.getUser = async (req,res,next) => {
    try {
        const user = await db.user.findUnique({
            where:{
                username:req.params.username
            }
        })
        res.json(user)
    } catch(e) {
        next(e)
    }
}

exports.signupUser = async (req,res,next) => {
    try {

    } catch(e) {
        next(e)
    }
}