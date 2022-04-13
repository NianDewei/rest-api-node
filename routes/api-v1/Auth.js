
import { Router } from "express"
// my modules
import { store } from "../../app/controller/AuthController.js"
// validate Request
import {AuthRequest} from "../../app/http/request/AuthRequest.js"
//------------------------------------------------

const authRouter = Router()

authRouter.post("/login",AuthRequest,store)

export { authRouter }