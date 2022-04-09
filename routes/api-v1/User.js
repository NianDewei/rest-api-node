
import { Router } from "express"

// my modules
import { index, store, update, updatePatch, destroy }
    from "../../app/controller/UserController.js"

import DestroyUserRequest from "../../app/http/request/DestroyUserRequest.js"
import StoreUserRequest from "../../app/http/request/StoreUserRequest.js"
import UpdateUserRequest from "../../app/http/request/UpdateUserRequest.js"
//validations   


//------------------------------------------------

const usersRouter = Router()

usersRouter.get("/", index)

usersRouter.post("/",StoreUserRequest,store)

usersRouter.put("/:id",UpdateUserRequest ,update)

usersRouter.patch("/", updatePatch)

usersRouter.delete("/:id",DestroyUserRequest, destroy)

export { usersRouter }