// import mongoose
import mongoose from 'mongoose'

const { Schema, model } = mongoose

const CategorySchema = Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, "Name is required"]
        },
        status: {
            type: Boolean,
            default: true
        },
        user: {
            type: Schema.Types.ObjectId,
            required: [true, "User is required"],
            ref: "User"
        }
    },

    {
        timestamps: true
    }

)

CategorySchema.methods.toJSON = function () {
    const { __v,status,...category } = this.toObject()
    // category.id = _id
    category.user.uid = category.user._id
    delete  category.user._id
    return category
}

export default model("Category", CategorySchema);
