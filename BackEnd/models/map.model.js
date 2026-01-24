import mongoose from "mongoose";

const { Schema } = mongoose;

const PostMapSchema = new Schema(
  {
    /* -------------------------
       BASIC INFO
    -------------------------- */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    /* -------------------------
       IMAGE
       (used by MapCard + Popup)
    -------------------------- */
    img: {
      type: String, // ImageKit / Cloudinary URL
      required: true,
    },

    /* -------------------------
       CATEGORY
    -------------------------- */
    category: {
      type: String,
      default: "location",
    },

    /* -------------------------
       🌍 GEO LOCATION
    -------------------------- */
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },

    /* -------------------------
       OPTIONAL PLACE NAME
    -------------------------- */
    placeName: {
      type: String,
      trim: true,
    },

    /* -------------------------
       USER
    -------------------------- */
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /* -------------------------
       FEATURED MAP
    -------------------------- */
    isFeatured: {
      type: Boolean,
      default: false,
    },

    /* -------------------------
       STATUS
    -------------------------- */
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

export default mongoose.model("PostMap", PostMapSchema);
