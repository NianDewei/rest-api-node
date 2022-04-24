// methods the controller for Product || index , show , create , update , delete

import { successShowAllResource, successShowOneResource } from "../http/response/MessageSuccessfull.js"
import Product from "../models/Product.js"

// list all products with pagination
const index = async (req, res) => {
    const { limit = 5, to = 0 } = req.query

    const query = { status: true }
    const [products, total] = await Promise.all([
        Product.find(query)
            .populate("user", "name")
            .populate("category", "name")
            .skip(Number(to))
            .limit(Number(limit)),
        Product.countDocuments(query)
    ])

    const data = {attributes:products,model:"products"}
    successShowAllResource(data,res)
}

// show a product
const show = async (req, res) => {
    const { id } = req.params

    const product = await Product.findById(id)
    const data = {attributes:product,model:"products"}
    successShowOneResource(data,res)

}
// store a product
const store = async (req, res) => {

    const user = req.userAuth._id
    const { name, description, price, category } = req.body
    // const data = 


    const product = new Product({ name, description, price, category, user })
    await product.save()

    const response = {
        status: 201,
        message: "Welcome to my API | POST | Store",
        data: {
            type: "products",
            id: product.id,
            attributes: product,
            links: { self: `/api/v1/products/${product.id}` },
        },
        jsonapi: {
            version: "1.0.0"
        }
    }
    res.status(201).json(response)
}

// update a product
const update = async (req, res) => {
    const { id } = req.params

    const user = req.userAuth._id
    const { name, description, price, category } = req.body
    const data = { name, description, price, category, user }

    const product = await Product.findByIdAndUpdate(id, data, { new: true })
    data = {attributes:product,model:"products"}
    successShowOneResource(data,res)
}

// delete a product
const destroy = async (req, res) => { 
    const { id } = req.params

    const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true })

    const response = {
        status: 200,
        message: "Product deleted",
        data: {
            type: "products",
            id: product.id,
            attributes: {
                name: product.name,
            }
        },
        jsonapi: {
            version: "1.0.0"
        }
    }
    res.status(200).json(response)
}

export { index, show, store, update, destroy }

