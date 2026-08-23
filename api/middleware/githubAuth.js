exports.githubAuth = (req,res,next) => {
    try {const githubUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_CALLBACK_URL}&scope=user:email`

    res.redirect(githubUrl)} catch(e) {next(e)}
}

exports.githubAuthCallback = async (req,res,next) => {
try
    {    const { code } = req.query
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
        console.log(githubUser)
    } catch(e) {
        next(e)
    }
}
