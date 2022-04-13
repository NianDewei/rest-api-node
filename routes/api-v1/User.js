import { Router } from "express"
// my modules
import { index, store, update, updatePatch, destroy }
    from "../../app/controller/UserController.js"
//validations Request
import { StoreUserRequest, UpdateUserRequest, DestroyUserRequest } from "../../app/http/request/index.js"
//------------------------------------------------
const usersRouter = Router()

usersRouter.get("/", index)
usersRouter.post("/", StoreUserRequest, store)
usersRouter.put("/:id", UpdateUserRequest, update)
usersRouter.patch("/", updatePatch)
usersRouter.delete("/:id", DestroyUserRequest, destroy)

export { usersRouter }