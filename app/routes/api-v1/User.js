const {Router} = require('express')
const {index,store,update,updatePatch,destroy} = require('../../controller/UserController')

const UsersRouter = Router()

UsersRouter.get("/", index)

UsersRouter.post("/", store)

UsersRouter.put("/:id", update)

UsersRouter.patch("/", updatePatch)

UsersRouter.delete("/", destroy)

module.exports = UsersRouter