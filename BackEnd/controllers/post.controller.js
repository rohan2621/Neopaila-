import express from "express";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { getAuth } from "@clerk/express";

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single post by slug
export const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json("Post not found");
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { userId } = getAuth(req); // ✅ get userId from Clerk

    if (!userId) return res.status(401).json("Not authorized");

    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.status(404).json("User not found");

    const newPost = new Post({
      user: user._id,
      ...req.body,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { userId } = getAuth(req); // ✅ get userId from Clerk

    if (!userId) return res.status(401).json("Not authorized");

    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.status(404).json("User not found");

    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!deletedPost)
      return res.status(404).json("Post not found or unauthorized");

    res.status(200).json("Post has been deleted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
