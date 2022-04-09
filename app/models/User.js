import mongoose from "mongoose";
const {Schema,model} = mongoose

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    avatar: {
        type: String,
        default: "default.jpg"
    },
    role: {
        type: String,
        required: [true, "Role is required"]
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

})

UserSchema.methods.toJSON = function () {
    const {__v,password, ...user} = this.toObject()
    return user
}

export default model("User", UserSchema);