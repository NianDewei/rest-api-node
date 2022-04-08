import Role from "../models/Role.js"
import User from "../models/User.js"


const isvalidateRole = async (name) => {
    const roleExits = await Role.findOne({ name })
    if (!roleExits) {
        throw new Error('Role is not valid')
    }
}

const isEmailExists = async (email) => {
    const emailExist = await User.findOne({ email })
    if (emailExist) {
        throw new Error('This email is registered')
    }
}

export { isvalidateRole, isEmailExists }