const db = require("../prisma/db").prisma;

const MAX_POSTS = 20;

exports.getPostsFollowing = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("NO USER");
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
    const ids = followings.followings.map((e) => e.followingId);
    const posts = await db.post.findMany({
      take: MAX_POSTS,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        authorId: {
          in: ids,
        },
      },
      select: {
        content: true,
        createdAt: true,
        id: true,
        likes: !req.user
          ? false
          : {
              where: {
                likerId: req.user.id,
              },
            },
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
      orderBy: {
        createdAt: "desc",
      },
      select: {
        content: true,
        createdAt: true,
        id: true,
        likes: !req.user
          ? false
          : {
              where: {
                likerId: req.user.id,
              },
            },
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
      select:{
        id:true
      }
    });
    const posts = await db.post.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: MAX_POSTS,
      select: {
        content: true,
        createdAt: true,
        id: true,
        likes: !req.user
          ? false
          : {
              where: {
                likerId: req.user.id,
              },
            },
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
      orderBy: {
        createdAt: "desc",
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
      orderBy: {
        createdAt: "desc",
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
        id: true,
        content: true,
        createdAt: true,
        likes: !req.user
          ? false
          : {
              where: {
                likerId: req.user.id,
              },
            },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        comments: {
          take: MAX_POSTS,
          orderBy: {
            createdAt: "desc",
          },
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
            id:true,

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

exports.commentPost = async (req, res, next) => {
  try {
    const comment = await db.comment.create({
      data: {
        content: req.body.content,
        postId: Number(req.params.postId),
        commenterId: req.user.id,
      },
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
        post:{
          select:{
            id:true,
            author:{
              select:{
                id:true,
                username:true,
              }
            }
          }
        }
      },
    });
    if(req.user.id === comment.post.author.id)
      return res.json(comment);
    await db.notification.create({
      data:{
        data:{
          ...comment
        },
        eventType:"COMMENT",
        receiverId:comment.post.author.id
      }
    })
    res.json(comment);
  } catch (e) {
    next(e);
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const data = await db.like.create({
      data: {
        postId: Number(req.params.postId),
        likerId: req.user.id,
      },
      select:{
        liker:{
          select:{
        id: true,
        name: true,
        username: true,
        avatarUrl: true,
      }
        },
        post:{
          select:{
            id:true,
            author:{
              select:{
                username:true,
                id:true
              }
            }
          }
        }
      }
    });
    if(req.user.id === data.post.author.id)
      return res.json("Post Liked");
    await db.notification.create({
      data:{
        data:{
          ...data
        },
        eventType:"LIKE",
        receiverId:data.post.author.id
      }
    })
    res.json("Post Liked");
  } catch (e) {
    next(e);
  }
};

exports.unlikePost = async (req, res, next) => {
  try {
    await db.like.delete({
      where: {
        likerId_postId: {
          likerId: req.user.id,
          postId: Number(req.params.postId),
        },
      },
    });
    res.json("Post Unliked");
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
