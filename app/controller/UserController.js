// librarie
import bcrypt from "bcryptjs"

// model User
import User from "../models/User.js"

// methos User Controller
const index = (req, res) => {
    const { q, name = "No Name", apikey, page = "1", limit } = req.query

    const response = {
        status: 200,
        message: "Welcome to my API | POST | Store",
        query: {
            q, name, apikey, page, limit
        },
        "jsonapi": {
            "version": "1.0.0"
        }
    }
    res.status(200).json(response)
}

const store = async (req, res) => {

    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role })
    // salt 10
    const salt = bcrypt.genSaltSync()
    // hash password
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    const attributes = user

    const response = {
        status: 201,
        message: "Welcome to my API | POST | Store",
        data: {
            type: "Users",
            id: user._id,
            attributes
        },
        "jsonapi": {
            "version": "1.0.0"
        }
    }
    res.status(201).json(response)
}

const update = (req, res) => {
    const { id } = req.params
    const { name, lastName, years } = req.body
    const response = {
        status: 200,
        message: "Welcome to my API | PUT | Update",
        data: {
            type: "Users",
            id,
            attributes: {
                name: name,
                lastName: "Ordoñez Cango",
                years: "28"
            }
        },
        "jsonapi": {
            "version": "1.0"
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

const destroy = (req, res) => {
    const response = {
        message: "Welcome to my API | DELETE | Destroy"
    }
    res.json(response)
}

export { index, store, update, updatePatch, destroy }
