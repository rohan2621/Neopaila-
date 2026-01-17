// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import imageRouter from "./routes/image.route.js";

// Routes
import userRouter from "./routes/user.route.js";
import commentRouter from "./routes/comment.route.js";
import postRouter from "./routes/post.route.js";

// Webhook controller
import { clerkWebHook } from "./controllers/webhook.controller.js";

// DB
import connectDB from "./lib/connectDB.js";

dotenv.config();

const app = express();

/* -------------------------------
   🌐 CORS
-------------------------------- */
app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g. http://localhost:5173
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* -------------------------------
   🚨 CLERK WEBHOOK (RAW BODY)
-------------------------------- */
app.post(
  "/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkWebHook
);

/* -------------------------------
   Body parser & Clerk middleware
-------------------------------- */
app.use(express.json());
app.use(clerkMiddleware());

/* -------------------------------
   Routes
-------------------------------- */
app.get("/", (req, res) => res.send("Hello World"));

app.use("/users", userRouter);
app.use("/comments", commentRouter);
app.use("/posts", postRouter);

app.use("/images", imageRouter);

/* -------------------------------
   Error handler
-------------------------------- */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
  });
});

/* -------------------------------
   Start Server (DB handled in connectDB)
-------------------------------- */
const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  connectDB();
  console.log("Server running on 3000");
});
