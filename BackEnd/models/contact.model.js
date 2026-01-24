import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    message: {
      type: String,
      required: true,
    },

    replied: {
      type: Boolean,
      default: false,
    },

    replyMessage: {
      type: String,
    },

    repliedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
