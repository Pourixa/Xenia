const db = require("../prisma/db").prisma;

const MAX_POSTS = 20;


exports.getPostsFollowing = async (req, res, next) => {
  try {
    const followings = await db.user.findUnique({
      where:{
        id:Number(req.query.id)
      },
      select:{
        followings:{
          select:{
            followingId:true,
          }
        }
      }
    })
    const ids = Array.from(followings.followings.values()) 
    const posts = await db.post.findMany({
      take: MAX_POSTS,
      where:{
        authorId:{
          in:ids    
        }
      },
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

exports.getPostsByUsername = async (req,res,next) => {
  try {
    const author = await db.user.findUnique({
      where:{
        username:req.params.username
      }
    })
    const posts = await db.post.findMany({
      where:{
        authorId : author.id
      },
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
}

exports.getCommentsByUsername = async (req,res,next) => {
  try {
    const author = await db.user.findUnique({
      where:{
        username:req.params.username
      }
    })
    const posts = await db.comment.findMany({
      where:{
        commenterId : author.id
      },
      take: MAX_POSTS,
      select:{
        content:true,
        createdAt:true,
        commenter:{
          select:{
            avatarUrl:true,
            username:true,
            name:true,
          }
          }
      }
      // include:{
      //   _count:{
      //     select:{
      //       comments:true,
      //       likes:true
      //     }
      //   },
      //   author:{
      //     select:{
      //       avatarUrl:true,
      //       username:true,
      //       name:true,
      //     }
      //   }
      // }
    });
    res.json(posts);
  } catch (e) {
    next(e);
  }
}

exports.getPost = async (req,res,next) => {
  try {
    const post = await db.post.findUnique({
  where: {
    id: Number(req.params.postId)
  },
  select: {
    content: true,
    createdAt:true,
    _count:{
      select:{
        likes:true,
        comments:true
      }
    },
    comments:{
      take:MAX_POSTS,
      select:{
        id:true,
        content:true,
        createdAt:true,
        commenter:{
          select:{
            avatarUrl:true,
            username:true,
            name:true,
          }
        }
      },
    },
    author: {
      select: {
        username: true,
        avatarUrl: true,
        name: true,

        followers: req.user
          ? {
              where: {
                followerId: req.user.id
              }
            }
          : false
      }
    }
  }
})
res.json(post)
  } catch(e) {
    next(e)
  }
}

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
