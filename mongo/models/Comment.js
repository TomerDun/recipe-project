import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    recipeId: {type: String, required: true},
    userId: {type: String, required: true},
    username: {type: String, required: true},
    content: String,
    rating: {type: Number, min: [1, 'Rating must be between 1-5'], max: [5, 'Rating must be between 1-5']},
    likes: [String],
    isEdited: Boolean,
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date,
})

const Comment = mongoose.model("comment", commentSchema);
export default Comment;
