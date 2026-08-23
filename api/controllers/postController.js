const db = require("../prisma/db")

const MAX_POSTS = 20

exports.getPosts = async (req,res,next) => {
    try
    {const posts = await db.post.findMany({
        take:MAX_POSTS,
    }
)
    res.json()
} catch(e)
    {
        next(e)
    }
}