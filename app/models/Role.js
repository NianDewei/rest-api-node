import mongoose from "mongoose"
const {Schema,model} = mongoose

const RoleSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    }
})

export default model("Role", RoleSchema);