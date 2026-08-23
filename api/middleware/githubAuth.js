const db = require("../prisma/db").prisma;
const jwt = require("jsonwebtoken")

exports.githubAuth = (req,res,next) => {
    try {const githubUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_CALLBACK_URL}&scope=user:email`

    res.redirect(githubUrl)} catch(e) {next(e)}
}

exports.githubAuthCallback = async (req,res,next) => {
try
    {    const { code } = req.query
    if (!code) return res.status(400).json({ error: "No code provided" });
    const response = await fetch(
            "https://github.com/login/oauth/access_token",
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code
                })
            }
        );
        const data = await response.json();

        const githubResponse = await fetch(
            "https://api.github.com/user",
            {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${data.access_token}`,
                },
            }
        );
        const githubUser = await githubResponse.json();
        const user = await db.user.findUnique({
            where:{
                githubAccountID:githubUser.id
            }
        })
        if(user) {
            res.redirect("/?token="+jwt.sign({username:user.username,id:user.id},process.env.JWT_SECRET,{expiresIn:"7d"}))
       } else {
            const signupToken = jwt.sign({accountId:githubUser.id,name:githubUser.name,avatar:githubUser.avatar_url},process.env.JWT_SECRET,{expiresIn:"10m"})
            res.redirect("/finishSignup?token="+signupToken)
        }
    } catch(e) {
        next(e)
    }
}
