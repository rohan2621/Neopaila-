import express from "express";
import userRouter from "./routes/user.route.js";
import commentRouter from "./routes/comment.route.js";
import postRouter from "./routes/post.route.js";
import connectDB from "./lib/connectDB.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users", userRouter);
app.use("/comment", commentRouter);
app.use("/posts", postRouter);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running 2!");
  // console.log(process.env.MONGODB_URL);
});
