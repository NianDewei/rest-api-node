import mongoose from "mongoose"
const { ObjectId } = mongoose.Types

const isValidObjectId = (id) => {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

export { isValidObjectId }