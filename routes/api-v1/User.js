import { Router } from "express"
// my modules
import { index, store, update, show, destroy }
    from "../../app/controller/UserController.js"
//validations Request
import { StoreUserRequest, ShowUserRequest, UpdateUserRequest, DestroyUserRequest } from "../../app/http/request/index.js"
//------------------------------------------------
const usersRouter = Router()

usersRouter.get("/", index)
usersRouter.get("/:id", ShowUserRequest, show)
usersRouter.post("/", StoreUserRequest, store)
usersRouter.put("/:id", UpdateUserRequest, update)
usersRouter.delete("/:id", DestroyUserRequest, destroy)

export { usersRouter }