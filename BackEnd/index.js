import express from 'express'
const app = express()
import userRouter from './routes/user.route.js'
import commentRouter from './routes/comment.route.js'
import postRouter from './routes/post.route.js'
app.get('/', (req, res) => {
  res.send('hello world')
})
app.use("/users", userRouter)
app.use("/comment", commentRouter)
app.use("/posts", postRouter)

app.listen(3000, () => {
    console.log("Server is running 2!");
    
})