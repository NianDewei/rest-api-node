// Create an controller for Search in all Models , User , Category , Product

import { MessageErrorClient } from "../http/response/MessageErrorClient.js"
import { MessageErrorServer } from "../http/response/MessageErrorServer.js"

// Models
import User from "../models/User.js"
import Product from "../models/Product.js"
import Category from "../models/Category.js"

import { successShowOneResource, successShowAllResource } from "../http/response/MessageSuccessfull.js"
import { isValidObjectId } from "../helpers/isValidObjectId.js"

const allowedCollections = ["users", "categorys", "products", "roles"]

const regex = value => {
    const regex = new RegExp(value, 'i')
    return regex
}

const searchUsers = async (value = '', res) => {

    const isMongoId = isValidObjectId(value)

    if (!isMongoId) {
        // search by name or email

        const users = await User.find({ $or: [{ name: regex(value) }, { email: regex(value) }], $and: [{ status: true }] })
        const data = { attributes: users, model: "users" }

        return successShowAllResource(data, res)
    }

    // search by id
    const Users = await User.findById(value)
    const data = { attributes: Users, model: "users" }

    successShowOneResource(data, res)

}

const searchProducts = async (value = '', res) => {
    const isMongoId = isValidObjectId(value)

    if (!isMongoId) {
        // search by name or description
        const products = await Product.find({
            $or: [{ name: regex(value) },
            { description: regex(value) }],
            $and: [{ status: true }]
        }).populate('category', 'name')
            .populate('user', 'name')

        const data = { attributes: products, model: "products" }
        return successShowAllResource(data, res)
    }

    // search by id
    const Products = await Product.findById(value)
        .populate('category', 'name')
        .populate('user', 'name')

    const data = { attributes: Products, model: "products" }
    successShowOneResource(data, res)
}

const searchCategorys = async (value = '', res) => {
    const isMongoId = isValidObjectId(value)

    if (!isMongoId) {
        // search by name

        const categorys = await Category.find({ name: regex(value), status: true })
        const data = { attributes: categorys, model: "categorys" }

        return successShowAllResource(data, res)
    }

    // search by id
    const Categorys = await Category.findById(value)
    const data = { attributes: Categorys, model: "categorys" }

    successShowOneResource(data, res)
}

const index = (req, res) => {

    const { collections, value } = req.params

    if (!allowedCollections.includes(collections)) {
        const params = {
            status: 422,
            title: "Collection not allowed",
            detail: `${collections} collection is not allowed | ${allowedCollections} are allowed`,
            location: "params"
        }
        return MessageErrorClient(params, res)
    }

    switch (collections) {
        case 'users':
            searchUsers(value, res)
            break
        case 'categorys':
            searchCategorys(value, res)
            break
        case 'products':
            searchProducts(value, res)
            break
        default:
            const params = { detail: "The search in this collection is not yet implemented." }
            MessageErrorServer(params, res)
            break
    }

}

export { index }