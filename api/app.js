const express = require("express")
const postRouter = require("./routes/postRouter")
const { errorHandler } = require("./middleware/utils")
const userRouter = require("./routes/userRouter")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
    methods:["PATCH","POST","GET"]
}))

app.use("/post",postRouter)
app.use("/user",userRouter)


app.use(errorHandler)

app.listen(8585,(err) => {
    if(err)
        throw err
    console.log("Server running on 8585")
})

