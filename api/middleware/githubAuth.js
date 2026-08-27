const db = require("../prisma/db").prisma;
const jwt = require("jsonwebtoken");

exports.githubAuth = (req, res, next) => {
  try {
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}&scope=read:user user:email`;

    res.redirect(githubUrl);
  } catch (e) {
    next(e);
  }
};

exports.githubAuthCallback = async (req, res, next) => {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).json({ error: "No code provided" });
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      },
    );
    const data = await response.json();
    if (!data.access_token) {
      return res.status(400).json({ error: "Invalid GitHub token response" });
    }
    const githubResponse = await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${data.access_token}`,
      },
    });
    if (!githubResponse.ok) {
      return next(new Error("Failed to fetch GitHub user"));
    }

    const githubUser = await githubResponse.json();
    const user = await db.user.findUnique({
      where: {
        githubAccountID: githubUser.id,
      },
    });
    if (user) {
      res.cookie(
        "token",
        jwt.sign(
          { username: user.username, id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: "7d" },
        ),
        {
          secure:false,
          httpOnly: true,
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        },
      );
      res.redirect(process.env.CLIENT_URL);
    } else {
      const baseUsername = githubUser.login;
      let username = baseUsername;
      let count = 1;
      while (await db.user.findUnique({ where: { username } })) {
        username = `${baseUsername}${count++}`;
      }
      const newUser = await db.user.create({
        data: {
          username: username.toLowerCase(),
          githubAccountID: githubUser.id,
          avatarUrl: githubUser.avatar_url,
          name: githubUser.name,
        },
      });
      res.cookie(
        "token",
        jwt.sign(
          { username: newUser.username, id: newUser.id },
          process.env.JWT_SECRET,
          { expiresIn: "7d" },
        ),
        {
          httpOnly: true,
          secure:false,
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        },
      );
      res.redirect(process.env.CLIENT_URL);
    }
  } catch (e) {
    next(e);
  }
};
