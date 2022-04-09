// librarie
import bcrypt from "bcryptjs"

// model User
import User from "../models/User.js"

// methos User Controller
const index = async (req, res) => {
    // const { q, name = "No Name", apikey, page = "1", limit } = req.query
    const { limit = 5, to = 0 } = req.query
    // const users = await User.find()
    //     .skip(Number(to))
    //     .limit(Number(limit))

    // const totalUsers = await User.countDocuments()

    const query = {status: true}

    const [users,total] = await Promise.all([
        User.find(query)
            .skip(Number(to))
            .limit(Number(limit)),
        User.countDocuments(query)
    ])

    const data = users.map(user => {
        const attributes = new User(user)
        return {
            type: "users",
            id: user._id,
            attributes
        }
    })

    const response = {
        status: 200,
        message: "Welcome to my API | POST | Store",
        total,
        data,
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
            type: "users",
            id: user._id,
            attributes
        },
        "jsonapi": {
            "version": "1.0.0"
        }
    }
    res.status(201).json(response)
}

const update = async (req, res) => {
    const { id } = req.params
    const { _id, password, google, email, ...data } = req.body

    // TODO : update password
    if (password) {
        const salt = bcrypt.genSaltSync()
        data.password = bcrypt.hashSync(password, salt)
    }

    const attributes = await User.findByIdAndUpdate(id, data, { new: true })

    const response = {
        status: 200,
        message: "Welcome to my API | PUT | Update",
        data: {
            type: "users",
            id: attributes._id,
            attributes
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

const destroy = async (req, res) => {
    const {id} = req.params
    //borrar fisicamente el usuario de la base de datos
    const user = await User.findByIdAndRemove(id)

    const response = {
        status: 200,
        message: "Welcome to my API | PUT | Update",
        data: {
            type: "users",
            id: user._id,
            attributes:{
                name: user.name,
            }
        },
        "jsonapi": {
            "version": "1.0"
        }
    }

    res.status(200).json(response)
}

export { index, store, update, updatePatch, destroy }
