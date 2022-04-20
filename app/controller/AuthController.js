// librarie
import bcrypt from "bcryptjs"
import { generateJWT } from "../helpers/generateJWT.js"
import { googleVerify } from "../helpers/google-verify.js"
import { MessageErrorClient, responseUserBlocked } from "../http/response/MessageErrorClient.js"
import { MessageErrorServer } from "../http/response/MessageErrorServer.js"
import { successUserCreatedOrAuth } from "../http/response/MessageSuccessfull.js"

// model User
import User from "../models/User.js"

// methos Auth Controller

const login = async (req, res) => {

    // capture data from request
    const { email, password } = req.body

    try {

        // find user by email
        const user = await User.findOne({ email })

        // if user not exists
        if (!user) {
            return res.status(404).json(
                {
                    status: 404,
                    error: {
                        title: "Attention",
                        detail: "Email or password is invalid"
                    }
                }
            )
        }

        //if user has status active
        if (!user.status) {
            return res.status(403).json(
                {
                    status: 403,
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
            return res.status(400).json(
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

        // json response
        // res.json({ user, token })
        const attributes = user.toJSON()
        const data = { code:200,message: "Welcome to our app",attributes, token}
        // response all data to client
        return successUserCreatedOrAuth(data, res)

    } catch (error) {
        console.log(error)
        MessageErrorServer(params,res)
    }

}

// Google Sing - In  || Controller
const googleSingIn = async (req, res) => {
    const { token_id } = req.body
    try {

        // verify token
        const { name, email, avatar } = await googleVerify(token_id)

        // find user by email
        let user = await User.findOne({ email })
        // if user not exists
        if (!user) {

            const data = {
                name,
                email,
                avatar,
                role: "USER",
                password: "google",
                google: true
            }
            // create new user
            user = new User(data)
            // save new user
            await user.save()
            const attributes = user.toJSON()
            // generate token
            const token = await generateJWT(user.id)
            const newUserData = { attributes, token, message: "Welcome to our app" }
            // response all data to client
            return successUserCreatedOrAuth(newUserData, res)
        }

        // if user has status false
        if (!user.status) return MessageErrorClient(responseUserBlocked(user.name), res)
        // if all ok, send response with token
        // json response
        const attributes = user.toJSON()
        // generate token
        const token = await generateJWT(user.id)
        const data = { attributes, token, status: 200, message: "Welcome to our app" }
        // response all data to client
        return successUserCreatedOrAuth(data, res)

    } catch (error) {
        console.log(error.message, "Error in google sing in")
        const response = {title: "Error in google sing in"}
        return MessageErrorServer(response, res)
    }

}

export { login, googleSingIn }
