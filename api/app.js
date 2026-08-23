const express = require("express")
const postRouter = require("./routes/postRouter")
const { errorHandler } = require("./middleware/errorHandeler")
const userRouter = require("./routes/userRouter")

const app = express()
app.use(express.json())

app.use("/post",postRouter)
app.use("/user",userRouter)


app.use(errorHandler)

app.listen(8585,(err) => {
    if(err)
        throw err
    console.log("Server running on 8585")
})

