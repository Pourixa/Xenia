const db = require("../prisma/db").prisma;

const MAX_POSTS = 20;

exports.getPostsFollowing = async (req, res, next) => {
  try {
    if(!req.user) 
      throw new Error("NO USER")
    const followings = await db.user.findUnique({
      where: {
        id: Number(req.query.id),
      },
      select: {
        followings: {
          select: {
            followingId: true,
          },
        },
      },
    });
    const ids = followings.followings.map(e => e.followingId);
    const posts = await db.post.findMany({
      take: MAX_POSTS,
      orderBy:{
        createdAt:"desc"
      },
      where: {
        authorId: {
          in: ids,
        },
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        author: {
          select: {
            avatarUrl: true,
            username: true,
            name: true,
          },
        },
      },
    });
    res.json(posts);
  } catch (e) {
    next(e);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await db.post.findMany({
      take: MAX_POSTS,
      orderBy:{
        createdAt:"desc"
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        author: {
          select: {
            avatarUrl: true,
            username: true,
            name: true,
          },
        },
      },
    });
    res.json(posts);
  } catch (e) {
    next(e);
  }
};

exports.getPostsByUsername = async (req, res, next) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username: req.params.username,
      },
    });
    const posts = await db.post.findMany({
      orderBy:{
        createdAt:"desc"
      },
      where: {
        authorId: user.id,
      },
      take: MAX_POSTS,
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        author: {
          select: {
            avatarUrl: true,
            username: true,
            name: true,
          },
        },
      },
    });
    res.json(posts);
  } catch (e) {
    next(e);
  }
};

exports.getCommentsByUsername = async (req, res, next) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username: req.params.username,
      },
    });
    const comments = await db.comment.findMany({
      orderBy:{
        createdAt:"desc"
      },
      where: {
        commenterId: user.id,
      },
      take: MAX_POSTS,
      select: {
        id: true,
        content: true,
        createdAt: true,
        commenter: {
          select: {
            username: true,
            name: true,
          },
        },
        post: {
          select: {
            id: true,
            content: true,
            author: {
              select: {
                username: true,
                name: true,
              },
            },
          },
        },
      },
    });
    res.json(comments);
  } catch (e) {
    next(e);
  }
};

exports.getLikesByUsername = async (req, res, next) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username: req.params.username,
      },
    });
    const likes = await db.like.findMany({
      orderBy:{
        createdAt:"desc"
      },
      where: {
        likerId: user.id,
      },
      take: MAX_POSTS,
      select: {
        id: true,
        createdAt: true,
        liker: {
          select: {
            username: true,
            name: true,
          },
        },
        post: {
          select: {
            id: true,
            content: true,
            author: {
              select: {
                username: true,
                name: true,
              },
            },
          },
        },
      },
    });
    res.json(likes);
  } catch (e) {
    next(e);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id: Number(req.params.postId),
      },
      select: {
        content: true,
        createdAt: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        comments: {
          take: MAX_POSTS,
          select: {
            id: true,
            content: true,
            createdAt: true,
            commenter: {
              select: {
                avatarUrl: true,
                username: true,
                name: true,
              },
            },
          },
        },
        author: {
          select: {
            username: true,
            avatarUrl: true,
            name: true,

            followers: !req.user
              ? false
              : {
                  where: {
                    followerId: req.user.id,
                  },
                },
          },
        },
      },
    });
    res.json(post);
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

exports.commentPost = async (req,res,next) => {
  try{
    return
  } catch(e) {
  next(e)
  }
}
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
        authorId: req.user.id,
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
