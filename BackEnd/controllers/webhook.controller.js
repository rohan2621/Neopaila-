import dotenv from "dotenv";
import { Webhook } from "svix";
import User from "../models/user.model.js";

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret needed!");
  }

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    return res.status(400).json({ message: "Webhook verification failed" });
  }

  if (evt.type === "user.created") {
    const email = evt.data.email_addresses[0].email_address;
    const username = evt.data.username || email;

    try {
      // ---- CHECK EMAIL ----
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        console.log("Email already exists, skipping user creation.");
        return res.status(200).json({ message: "Email already exists" });
      }

      // ---- CHECK USERNAME ----
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        console.log("Username already exists, generating fallback...");
      }

      // Optional: If username exists, auto-generate one
      let finalUsername = username;
      if (existingUsername) {
        finalUsername = `${username}_${Math.floor(Math.random() * 10000)}`;
      }

      const newUser = new User({
        clerkUserId: evt.data.id,
        username: finalUsername,
        email,
        img: evt.data.image_url,
      });

      await newUser.save();
      console.log("New User Created:", newUser);
    } catch (error) {
      console.error("User creation error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  res.status(200).json({ message: "Webhook received" });
};
