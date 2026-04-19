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
import adminRoutes from "./routes/admin.route.js";

// Webhook
import { clerkWebHook } from "./controllers/webhook.controller.js";

// DB
import connectDB from "./lib/connectDB.js";

dotenv.config();

const app = express();

/* ---------------- CORS ---------------- */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ---------------- HEALTH CHECK (IMPORTANT FOR UPTIME PING) ---------------- */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    time: new Date().toISOString(),
  });
});

/* ---------------- WEBHOOK (must be before json parser) ---------------- */
app.post(
  "/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkWebHook
);

/* ---------------- BODY PARSER ---------------- */
app.use(express.json());
app.use(clerkMiddleware());

/* ---------------- ROUTES ---------------- */
app.get("/", (req, res) => {
  res.send("🚀 API is running");
});
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    time: new Date().toISOString(),
  });
});
app.use("/users", userRouter);
app.use("/comments", commentRouter);
app.use("/posts", postRouter);
app.use("/maps", mapRouter);
app.use("/images", imageRouter);

app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

/* ---------------- GLOBAL ERROR HANDLER ---------------- */
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
  });
});

/* ---------------- START SERVER (FIXED ORDER) ---------------- */
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err.message);
    process.exit(1);
  }
};

startServer();
