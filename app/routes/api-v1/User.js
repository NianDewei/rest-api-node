
import { Router } from "express"
import { index, store, update, updatePatch, destroy }
from "../../controller/UserController.js"

const usersRouter = Router()

usersRouter.get("/", index)

usersRouter.post("/", store)

usersRouter.put("/:id", update)

usersRouter.patch("/", updatePatch)

usersRouter.delete("/", destroy)

export { usersRouter }