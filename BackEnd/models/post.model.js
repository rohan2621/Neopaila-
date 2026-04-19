import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    content: String,
    img: String, // stored in DB
    category: String,
    slug: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    location: {
      lat: { type: Number },
      lng: { type: Number },
    },

    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

/* -------------------------
   VIRTUAL FIELD FIX
   ------------------------- */
// frontend will use "image", backend stores "img"
PostSchema.virtual("image").get(function () {
  return this.img;
});

/* -------------------------
   ENABLE VIRTUALS IN JSON
   ------------------------- */
PostSchema.set("toJSON", { virtuals: true });
PostSchema.set("toObject", { virtuals: true });

export default mongoose.model("Post", PostSchema);
