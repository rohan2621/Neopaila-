import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import { clerkClient, requireAuth, getAuth } from "@clerk/express";
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import commentRouter from "./routes/comment.route.js";
import postRouter from "./routes/post.route.js";
import webhooks from "./routes/webhook.route.js";

dotenv.config();
const app = express();
app.use("/webhooks", webhooks); // raw body
app.use(express.json()); // parse JSON for normal routes
app.use(clerkMiddleware()); // attach auth context

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users", userRouter);
app.use("/comment", commentRouter);
app.use("/posts", postRouter);

// 5️⃣ Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
  });
});
app.get("/protected", requireAuth(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req);

  // Use Clerk's JS Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId);

  return res.json({ user });
});
app.listen(3000, () => {
  connectDB();
  console.log("Server is running 2!");
});
