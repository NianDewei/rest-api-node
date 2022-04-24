// model User
import { successShowAllResource, successShowOneResource } from "../http/response/MessageSuccessfull.js"
import Category from "../models/Category.js"

// methods User Controller
const index = async (req, res) => {

    const { limit = 5, to = 0 } = req.query

    const query = { status: true }
    const [categorys, total] = await Promise.all([
        Category.find(query)
            .populate("user", "name")
            .skip(Number(to))
            .limit(Number(limit)),
        Category.countDocuments(query)
    ])

   const data = {attributes:categorys,model:"categorys"}
   successShowAllResource(data,res)
}

const store = async (req, res) => {

    const { name } = req.body
    // capture id, of user authenticated
    const { _id } = req.userAuth
    const data = { name, user: _id }

    const category = new Category(data)

    await category.save()

    const response = {
        status: 201,
        message: "Welcome to my API | POST | Store",
        data: {
            type: "categorys",
            id: category._id,
            attributes: category
        },
        "jsonapi": {
            "version": "1.0.0"
        }
    }
    res.status(201).json(response)
}

const show = async (req, res) => {
    const { id } = req.params
    const category = await Category.findById(id)
                                    .populate("user", "name")
    const data = {attributes: category,model: "categorys"}
    // TODO: send data and response
    successShowOneResource(data,res)
}

const update = async (req, res) => {

    const { id } = req.params
    const { name } = req.body

    const user = req.userAuth._id
    const data = { name,user }

    const attributes = await Category.findByIdAndUpdate(id,data, { new: true })

    const response = {
        status: 200,
        message: "Welcome to my API | PUT | Update",
        data: {
            type: "categorys",
            id: attributes.id,
            attributes,
            links:{self: `${process.env.HOST_NAME}/api/v1/categorys/${attributes.id}`},
        },
        "jsonapi": {
            "version": "1.0.0"
        }
    }

    res.status(200).json(response)
}

const updatePatch = (req, res) => {
    const response = {
        message: "Welcome to my API | PATCH | Update-Patch"
    }
    res.json(response)
}

const destroy = async (req, res) => {

    const { id } = req.params
    // chnage status to false in the database 
    const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true })

    const response = {
        status: 200,
        type: "success",
        message: "Category deleted.",
        data: {
            type: "categorys",
            id: category._id,
            attributes: {
                name: category.name,
            }
        },
        "jsonapi": {
            "version": "1.0.0"
        }
    }

    res.status(200).json(response)

}


export { index, store, show, update, updatePatch, destroy }
