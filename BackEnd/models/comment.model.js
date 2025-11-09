import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
    post: {
         type: Schema.Types.ObjectId,
        ref: "Post",
        required:true
    },
    decs: {
        type: String,
        required: true,
    },
}, { timestamps: true });
export default mongoose.model("Comment",commentSchema)