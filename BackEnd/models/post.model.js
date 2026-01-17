import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    content: String,
    img: String,
    category: String,
    slug: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    location: {
      lat: { type: Number },
      lng: { type: Number },
    },

    // ← Add this field
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
