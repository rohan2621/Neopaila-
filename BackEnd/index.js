// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

// Routes
import userRouter from "./routes/user.route.js";
import commentRouter from "./routes/comment.route.js";
import postRouter from "./routes/post.route.js";
import mapRouter from "./routes/map.route.js";
import imageRouter from "./routes/image.route.js";
import contactRoutes from "./routes/contact.routes.js";

// Webhook
import { clerkWebHook } from "./controllers/webhook.controller.js";

// DB
import connectDB from "./lib/connectDB.js";

dotenv.config();

const app = express();

/* --------------------------------
   🌐 CORS CONFIG
-------------------------------- */
app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g. http://localhost:5173
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* --------------------------------
   🚨 CLERK WEBHOOK (RAW BODY)
   ⚠️ MUST BE BEFORE express.json()
-------------------------------- */
app.post(
  "/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkWebHook
);

/* --------------------------------
   BODY PARSER
-------------------------------- */
app.use(express.json());

/* --------------------------------
   CLERK AUTH MIDDLEWARE
-------------------------------- */
app.use(clerkMiddleware());

/* --------------------------------
   ROUTES
-------------------------------- */
app.get("/", (req, res) => {
  res.send("🚀 API is running");
});

app.use("/users", userRouter);
app.use("/comments", commentRouter);
app.use("/posts", postRouter);
app.use("/maps", mapRouter);
app.use("/images", imageRouter);

/* ✅ CONTACT US (PUBLIC) */
app.use("/api/contact", contactRoutes);

/* --------------------------------
   GLOBAL ERROR HANDLER
-------------------------------- */
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
  });
});

/* --------------------------------
   START SERVER
-------------------------------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
