// librarie
import bcrypt from "bcryptjs"
import { successShowOneResource } from "../http/response/MessageSuccessfull.js"

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

    const query = { status: true }

    const [users, count] = await Promise.all([
        User.find(query)
            .skip(Number(to))
            .limit(Number(limit)),
        User.countDocuments(query)
    ])

    const data = users.map(user => {
        const attributes = user
        return {
            type: "users",
            uid: user._id,
            attributes
        }
    })

    const response = {
        count,
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
            uid: user._id,
            attributes
        },
        "jsonapi": {
            "version": "1.0.0"
        }
    }
    res.status(201).json(response)
}

const show = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    const data = {attributes: user,model:"users"}
    successShowOneResource(data,res)
}

const update = async (req, res) => {
    const { id } = req.params
    const { _id, password, google, email, ...data } = req.body

    // TODO : update password
    if (password) {
        const salt = bcrypt.genSaltSync()
        data.password = bcrypt.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, data, { new: true })

    const collection = {attributes: user,model:"users"}
    successShowOneResource(collection,res)
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
    const user = await User.findByIdAndUpdate(id, { status: false }, { new: true })

    const response = {
        status: 200,
        type: "success",
        message: "User deleted.",
        data: {
            type: "users",
            id: user._id,
            attributes: {
                name: user.name,
                status: user.status
            }
        },
        "jsonapi": {
            "version": "1.0.0"
        }
    }

    res.status(200).json(response)

    //borrar fisicamente el usuario de la base de datos
    // const user = await User.findByIdAndRemove(id)

}


export { index, store, update, show, destroy }
