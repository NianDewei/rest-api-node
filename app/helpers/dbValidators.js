import Role from "../models/Role.js"
import User from "../models/User.js"

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

    const message = 'User is not exists'

    try {
        const userExist = await User.findById(id)
        const isActive = isUserActive(userExist)

        if (!userExist) {
            throw new Error(message)
        }

        if (!isActive) {
            throw new Error(message)
        }

    } catch (error) {
        throw new Error(message)
    }

}

const isUserActive = user => {
    return user.status
}

export { isValidateRole, isEmailExists, isUserExists }