import Role from "../models/Role.js"
import User from "../models/User.js"
import mongoose from "mongoose"
const { isValidObjectId } = mongoose

/** 
 * @param {String} role
*/
const isValidateRole = async name => {
    const roleExits = await Role.findOne({ name })
    if (!roleExits) {
        throw new Error('Role is not valid')
    }
}

/**.
 * @param {String} email
*/
const isEmailExists = async email => {
    const emailExist = await User.findOne({ email })
    if (emailExist) {
        throw new Error('This email is registered')
    }
}

/**.
 * @param {type ObjectId} id
*/
const isUserExists = async id => {

    try {
        const userExist = await User.findById(id)
        if (!userExist) {
            throw new Error('User is not Exists')
        }
    } catch (error) {
        throw new Error('User is not Exists')
    }

}

export { isValidateRole, isEmailExists, isUserExists }