
import { Router } from "express"
// my modules
import { login, googleSingIn  } from "../../app/controller/AuthController.js"
// validate Request
import {AuthRequest,AuthGoogle} from "../../app/http/request/AuthRequest.js"
//------------------------------------------------

const authRouter = Router()

authRouter.post("/login",AuthRequest,login)
authRouter.post("/google",AuthGoogle,googleSingIn)

export { authRouter }