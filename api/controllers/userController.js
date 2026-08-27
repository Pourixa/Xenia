const db = require("../prisma/db").prisma;
const jwt = require("jsonwebtoken");

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await db.user.delete({
      where: {
        id: req.user.id,
      },
    });
    res.json(user);
  } catch (e) {
    next(e);
  }
};

exports.getCurrentUser = async (req,res,next) => {
  try {
    const token = req.cookies.token
    if(!token) 
      return res.json({user:null , isSigned:false})

    const data = jwt.decode(token)
    const user = await db.user.findUnique({
      where:{
        id:data.id
      },
      select:{
        id:true,
        username:true,
        avatarUrl:true,
        name:true
      }
    })

    return res.json({user:user,isSigned:true})

  } catch(e) {
    next(e)
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const user = await db.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        username: req.body.username,
      },
    });

    res.json(user);
  } catch (e) {
    next(e);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username: req.params.username,
      },
    });
    res.json(user);
  } catch (e) {
    next(e);
  }
};

exports.signupUser = async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
};

exports.signinUser = async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
};

const MAX_SEARCH = 10;
exports.searchUser = async (req, res, next) => {
  try {
    if (req.query.q && req.query.q.length <= 0) return res.json({ users: [] });
    const searchResult = await db.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: req.body.q,
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: req.body.q,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        username: true,
        name: true,
        avatarUrl: true,
      },
      take: MAX_SEARCH,
    });
    res.json({ users: searchResult });
  } catch (e) {
    next(e);
  }
};
