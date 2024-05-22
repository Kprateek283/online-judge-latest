import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
        required: true,
    },
    email: {
        type: String,
        default: null,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        default: null,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

export default User;
