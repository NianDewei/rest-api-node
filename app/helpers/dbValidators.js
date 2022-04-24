import Role from "../models/Role.js"
import User from "../models/User.js"
import Category from "../models/Category.js"
import Product from "../models/Product.js"

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

const existsCategory = async id => {
    const message = 'Category is not exists'

    try {
        const categoryExist = await Category.findById(id)

        if (!categoryExist) {
            throw new Error(message)
        }

        if (!categoryExist.status) {
            throw new Error(message)
        }

    } catch (error) {
        throw new Error(message)
    }
}

const existsNameCategory = async name => {
    const message = 'This name categiry is registered'
    const categoryExist = await Category.findOne({ name })

    if (categoryExist) {
        throw new Error(message)
    }

}



const existsProduct = async id => {
    const message = 'Product is not exists'

    try {
        const categoryExist = await Product.findById(id)

        if (!categoryExist) {
            throw new Error(message)
        }

        if (!categoryExist.status) {
            throw new Error(message)
        }

    } catch (error) {
        throw new Error(message)
    }
}



const existsNameProduct = async name => {
    const message = 'This name product is registered'
    const categoryExist = await Product.findOne({ name })

    if (categoryExist) {
        throw new Error(message)
    }

}

// Validate collections allowed
const allowedCollections = (collections = '', allowed = []) => {
    const include = allowed.includes(collections)
    if (!include) {
        throw new Error('Collections is not allowed | collections: ' + allowed)
    }

    return true
}

const validateFiles = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
        return res.status(422).json({
            error: {
                title: "File not found",
                detail: 'No files were uploaded, verify if the file is not empty.',
                params:'archive',
                location: '/uploads'
            },
            jsonapi: {
                version: "1.0.0"
            }
        })
    }

    // pass validation
    next()
}



export {
    isValidateRole,
    isEmailExists,
    isUserExists,
    existsCategory,
    existsProduct,
    existsNameCategory,
    existsNameProduct,
    allowedCollections,
    validateFiles
}