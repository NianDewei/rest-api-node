
import { Router } from "express"
import { check } from "express-validator"

// my modules
import { index, store, update, updatePatch, destroy }
    from "../../app/controller/UserController.js"
//validations   
import { isEmailExists, isvalidateRole } from "../../app/helpers/dbValidators.js"
import StoreUserRequest from "../../app/http/request/StoreUserRequest.js"

//------------------------------------------------

const usersRouter = Router()

usersRouter.get("/", index)

usersRouter.post("/", [
    check('name', 'Name is required').not().isEmpty(),

    check('email').not().isEmpty()
        .withMessage('Email is required').
        isEmail().withMessage('Email is not valid')
        .custom(isEmailExists),

    check('password').not().isEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),

    check('role').not().isEmpty().withMessage('Role is required')
        .custom(isvalidateRole),

    StoreUserRequest

], store)

usersRouter.put("/:id", update)

usersRouter.patch("/", updatePatch)

usersRouter.delete("/", destroy)

export { usersRouter }