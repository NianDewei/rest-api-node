// import mongoose
import mongoose from 'mongoose'

const { Schema, model } = mongoose

const ProductSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            unique: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        price: {
            type: Number,
            required: [true, "Price is required"]
        },
        status: {
            type: Boolean,
            default: true
        },
        available: {
            type: Boolean,
            default: true
        },
        user: {
            type: Schema.Types.ObjectId,
            required: [true, "User is required"],
            ref: "User"
        },
        category: {
            type: Schema.Types.ObjectId,
            required: [true, "Category is required"],
            ref: "Category"
        }
    },

    {
        timestamps: true
    }

)

ProductSchema.methods.toJSON =  function () {
    const { __v, status, ...product } = this.toObject()
    // user.uid = user._id
    // product.user = user
    // delete product.user._id
    return product
}



export default model("Product", ProductSchema)