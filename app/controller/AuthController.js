// librarie
import bcrypt from "bcryptjs"
import { generateJWT } from "../helpers/generateJWT.js"

// model User
import User from "../models/User.js"

// methos Auth Controller

const store = async (req, res) => {

    // capture data from request
    const { email, password } = req.body

    try {

        // find user by email
        const user = await User.findOne({ email })

        // if user not exists
        if (!user) {
            return res.status(400).send(
                {
                    status: 400,
                    error: {
                        title: "Email or password is invalid",
                        detail: "If you have any problem, contact us."
                    }
                }
            )
        }

        //if user has status active
        if (!user.status) {
            return res.status(400).send(
                {
                    status: 400,
                    error: {
                        title: "User is not active",
                        detail: "Please, check your email to active your account, and try again. If you have any problem, contact us."
                    }
                }
            )
        }

        // compare password
        const isMatch = bcrypt.compareSync(password, user.password)
        if (!isMatch) {
            return res.status(400).send(
                {
                    status: 400,
                    error: {
                        title: "Email or password is invalid",
                        detail: "If you have any problem, contact us."
                    }
                }
            )
        }

        // generate token
        const token = await generateJWT(user.id)

        // send response
        // res.send({ user, token })
        const attributes = user.toJSON()

        const response = {
            status: 200,
            message: "Welcome to Login | POST",
            data: {
                attributes,
                token
            },
            jsonapi: {
                "version": "1.0.0"
            }
        }
        res.status(200).json(response)

    } catch (error) {
        console.log(error)
        return res.status(500).send(
            {
                status: 500,
                error: "Sorry, something went wrong"
            }
        )
    }

}

export { store }
