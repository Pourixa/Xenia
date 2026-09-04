const db = require("../prisma/db").prisma;
const jwt = require("jsonwebtoken");

MAX_POSTS = 20;
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

exports.getCurrentUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ user: null, isSigned: false });

    const data = jwt.decode(token);
    const user = await db.user.findUnique({
      where: {
        id: data.id,
      },
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        name: true,
        _count: {
          select: {
            notifications: true,
          },
        },
      },
    });

    return res.json({ user: user, isSigned: true });
  } catch (e) {
    next(e);
  }
};

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

const MAX_FOLLOW = 20;

exports.getUserInfo = async (req, res, next) => {
  try {
    let bearer = null;
    if (req.cookies.token) bearer = jwt.verify(req.cookies.token,process.env.JWT_SECRET);

    const user = await db.user.findUnique({
      where: {
        username: req.params.username,
      },
      select: {
        username: true,
        name: true,
        about: true,
        avatarUrl: true,
        followers: (!bearer ? false : {
          where:{
            followerId:bearer.id
          }
        }),
        _count: {
          select: {
            followers: true,
            followings: true,
            posts: true,
          },
        },
      },
    });
    res.json(user);
  } catch (e) {
    next(e);
  }
};

exports.getUserFollowers = async (req, res, next) => {
  // followers:{
  //   take:MAX_FOLLOW,
  //   select:{
  //     follower:{
  //       select:{
  //         avatarUrl:true,
  //         name:true,
  //         username:true
  //       }
  //     }
  //   },
  // },
  // followings:{
  //   take:MAX_FOLLOW,
  //   select:{
  //     follower:{
  //       select:{
  //         avatarUrl:true,
  //         name:true,
  //         username:true
  //       }
  //     }
  //   },
  // },
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

const MAX_SEARCH = 20;
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
    res.json(searchResult);
  } catch (e) {
    next(e);
  }
};

exports.followUser = async (req, res, next) => { // auth
  try {
    const following = await db.user.findUniqueOrThrow({
      where: {
        username: req.body.followingUsername,
      },
      select: {
        id: true,
      },
    });
    const data = await db.followship.create({
      data: {
        followerId: req.user.id,
        followingId: following.id,
      },
      select:{
        follower:{
          select:{
        id: true,
        name: true,
        username: true,
        avatarUrl: true,
      }
        }
      }
    });
    res.json("Followed");
  } catch (e) {
    next(e);
  }
};


exports.unfollowUser = async (req, res, next) => { // auth
  try {
    const following = await db.user.findUniqueOrThrow({
      where: {
        username: req.body.followingUsername,
      },
      select: {
        id: true,
      },
    });
    await db.followship.delete({
      where:{
        followerId_followingId:{
          followingId:following.id,
          followerId:req.user.id
        }
      }
    });
    res.json("unFollowed");
  } catch (e) {
    next(e);
  }
};
