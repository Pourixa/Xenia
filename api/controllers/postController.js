const db = require("../prisma/db").prisma;

const MAX_POSTS = 20;

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await db.post.findMany({
      take: MAX_POSTS,
      include:{
        _count:{
          select:{
            comments:true,
            likes:true
          }
        },
        author:{
          select:{
            avatarUrl:true,
            username:true,
            name:true,
          }
        }
      }
    });
    res.json(posts);
  } catch (e) {
    next(e);
  }
};

exports.postPost = async (req, res, next) => {
  try {
    const post = await db.post.create({
      data: {
        content: req.body.content,
        authorId: req.user.id,
      },
    });
    res.json(post);
  } catch (e) {
    next(e);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await db.post.delete({
      where: {
        id: req.params.postId,
        authorId: req.user.id,
      },
    });
    res.json(post);
  } catch (e) {
    next(e);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await db.post.update({
      where: {
        id: req.params.postId,
        authorId:req.user.id
      },
      data: {
        content: req.body.content,
      },
    });
    res.json(post);
  } catch (e) {
    next(e);
  }
};
